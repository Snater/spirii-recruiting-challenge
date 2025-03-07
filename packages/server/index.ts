import * as dotenv from 'dotenv';
import * as fs from 'node:fs';
import {LocationStatuses as LocationStatusesSchema} from 'schemas';
import {WebSocketServer} from 'ws';
import {z} from 'zod';

dotenv.config({path: '../../.env'});

const wss = new WebSocketServer({
	host: process.env.VITE_SERVER_HOST ?? '127.0.0.1',
	path: process.env.VITE_SERVER_PATH ?? '/',
	port: process.env.VITE_SERVER_PORT ? parseInt(process.env.VITE_SERVER_PORT) : 8080,
}, () => {
	console.log(`Started WebSocket server`);
});

type LocationStatuses = z.infer<typeof LocationStatusesSchema>

function readLocationStatuses(subscribedLocations: LocationStatuses) {
	const content = fs.readFileSync('./STATUSES.json', {encoding: 'utf8'});

	let locationStatuses: LocationStatuses;

	try {
		locationStatuses = LocationStatusesSchema.parse(JSON.parse(content));
	} catch {
		// Ignoring invalid schema for simplicity.
		console.error('Invalid schema');
		return [];
	}

	// Return only locations that updates are subscribed to, and that have an updated status compared
	// to what the frontend is already aware of.
	return locationStatuses.filter(
		locationStatus => {
			return subscribedLocations.find(
				subscribedLocation => {
					return (
						subscribedLocation.locationId === locationStatus.locationId
						&& subscribedLocation.status !== locationStatus.status
					);
				}
			)
		}
	);
}

function updateSubscribedLocations(subscribedLocations: LocationStatuses, filteredLocations: LocationStatuses) {
	const updatedSubscribedLocations: LocationStatuses = [];

	for (let i = 0; i < subscribedLocations.length; i++) {
		const updatedLocation = filteredLocations.find(
			location => location.locationId === subscribedLocations[i].locationId
		);

		updatedSubscribedLocations.push(updatedLocation ?? subscribedLocations[i]);
	}

	return updatedSubscribedLocations;
}

wss.on('connection', ws => {
	let subscribedLocations: LocationStatuses = [];

	fs.watchFile('./STATUSES.json', {}, () => {
		const filteredLocations = readLocationStatuses(subscribedLocations);

		if (filteredLocations.length === 0) {
			// No need to send an update as there are no statuses for the locations subscribed to and/or
			// the status(es) of the location(s) subscribed to are not different to the ones the frontend
			// is already aware of.
			return;
		}

		// Update the subscribed locations to be aware of any updated status sent to the frontend.
		subscribedLocations = updateSubscribedLocations(subscribedLocations, filteredLocations);
		ws.send(JSON.stringify(filteredLocations));
	});

	ws.on('error', console.error);

	ws.on('message', data => {
		subscribedLocations = LocationStatusesSchema.parse(JSON.parse(data.toString()));

		const filteredLocations = readLocationStatuses(subscribedLocations);

		if (filteredLocations.length > 0) {
			subscribedLocations = updateSubscribedLocations(subscribedLocations, filteredLocations);
			ws.send(JSON.stringify(filteredLocations));
		}
	});
});
