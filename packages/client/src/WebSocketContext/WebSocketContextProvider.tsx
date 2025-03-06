import {PropsWithChildren, useRef} from 'react';
import {LocationStatuses} from 'schemas';
import WebSocketContext from './WebSocketContext';
import useWebSocket from 'react-use-websocket';
import {z} from 'zod';

type Props = PropsWithChildren<{
	defaultLocationIdsInView?: number[]
}>

export default function WebSocketContextProvider({
	children,
	defaultLocationIdsInView = [],
}: Props) {
	const locationIdsInView = useRef<number[]>(defaultLocationIdsInView);

	const host = import.meta.env.VITE_SERVER_HOST ?? '127.0.0.1';
	const path = import.meta.env.VITE_SERVER_PATH ?? '/';
	const port = !isNaN(parseInt(import.meta.env.VITE_SERVER_PORT))
		? import.meta.env.VITE_SERVER_PORT
		: '8080';

	const webSocketUrl = `ws://${host}:${port}${path}`;

	const {sendMessage, lastJsonMessage, readyState}
		= useWebSocket<z.infer<typeof LocationStatuses> | undefined>(webSocketUrl);

	return (
		<WebSocketContext.Provider
			value={{lastJsonMessage, locationIdsInView, readyState, sendMessage}}
		>
			{children}
		</WebSocketContext.Provider>
	);
}
