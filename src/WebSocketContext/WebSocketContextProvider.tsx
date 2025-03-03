import {PropsWithChildren, useRef} from 'react';
import useWebSocket, {ReadyState} from 'react-use-websocket';
import WebSocketContext from './WebSocketContext';

type Props = PropsWithChildren<{
	defaultLocationIdsInView?: number[]
}>

export default function WebSocketContextProvider({
	children,
	defaultLocationIdsInView = [],
}: Props) {
	const locationIdsInView = useRef<number[]>(defaultLocationIdsInView);

	const {sendMessage, lastJsonMessage, readyState} = import.meta.env.VITE_SOCKET_URL
		// eslint-disable-next-line react-hooks/rules-of-hooks
		? useWebSocket(import.meta.env.VITE_SOCKET_URL)
		: {sendMessage: () => null, lastJsonMessage: '', readyState: ReadyState.CLOSED};

	return (
		<WebSocketContext.Provider
			value={{lastJsonMessage, locationIdsInView, readyState, sendMessage}}
		>
			{children}
		</WebSocketContext.Provider>
	);
}
