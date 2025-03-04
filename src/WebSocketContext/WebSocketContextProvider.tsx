import {PropsWithChildren, useRef} from 'react';
import {LocationStatuses} from '../../lib/schemas';
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

	const {sendMessage, lastJsonMessage, readyState}
		= useWebSocket<z.infer<typeof LocationStatuses> | undefined>(import.meta.env.VITE_SOCKET_URL);

	return (
		<WebSocketContext.Provider
			value={{lastJsonMessage, locationIdsInView, readyState, sendMessage}}
		>
			{children}
		</WebSocketContext.Provider>
	);
}
