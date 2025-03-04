import 'dotenv/config';
import * as fs from 'node:fs';
import {LocationIds, LocationStatuses} from '../lib/schemas';
import {WebSocketServer} from 'ws';
import {z} from 'zod';

const wss = new WebSocketServer({
	host: process.env.SERVER_HOST ?? '127.0.0.1',
	path: process.env.SERVER_PATH ?? '/',
	port: process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT) : 8080,
}, () => {
	console.log(`Started WebSocket server`);
});

wss.on('connection', ws => {
	console.debug('Connection established');

	const subscribedLocations = new Set<number>();

	fs.watchFile('./statuses.json', {}, () => {
		const content = fs.readFileSync('./statuses.json', {encoding: 'utf8'});

		let locationStatuses: z.infer<typeof LocationStatuses>;

		try {
			locationStatuses = LocationStatuses.parse(JSON.parse(content));
		} catch {
			// Ignoring invalid schema for simplicity.
			console.error('Invalid schema');
			return;
		}

		const filteredLocationStatuses = locationStatuses.filter(
			locationStatus => subscribedLocations.has(locationStatus.locationId)
		);

		if (filteredLocationStatuses.length === 0) {
			return;
		}

		console.debug('Sending update');
		ws.send(JSON.stringify(filteredLocationStatuses));
	});

	ws.on('error', console.error);

	ws.on('message', data => {
		const locationIds = LocationIds.parse(JSON.parse(data.toString()));

		subscribedLocations.clear();
		locationIds.current.forEach(locationId => subscribedLocations.add(locationId));

		console.debug('Subscribed to:', subscribedLocations);
	});
});
