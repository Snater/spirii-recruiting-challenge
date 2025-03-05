import WebSocketContext, {type WebSocketContextType} from './WebSocketContext';
import {useContext} from 'react';

export default function useWebSocketContext(): WebSocketContextType {
	const context = useContext(WebSocketContext);

	if (!context) {
		throw new Error('useWebSocketContext must be used within a WebSocketContextProvider');
	}

	return context;
}
