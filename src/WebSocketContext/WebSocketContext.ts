import {type MutableRefObject, createContext} from 'react';
import {ReadyState} from 'react-use-websocket';
import type {SendMessageFn} from '../types.ts';

export interface WebSocketContextType {
	lastJsonMessage: unknown
	locationIdsInView: MutableRefObject<number[]>
	sendMessage: SendMessageFn
	readyState: ReadyState
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export default WebSocketContext;
