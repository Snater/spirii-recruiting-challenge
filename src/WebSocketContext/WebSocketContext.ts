import {type MutableRefObject, createContext} from 'react';
import {LocationStatuses} from '../../lib/schemas';
import {ReadyState} from 'react-use-websocket';
import type {SendMessageFn} from '../types.ts';
import {z} from 'zod';

export interface WebSocketContextType {
	lastJsonMessage?: z.infer<typeof LocationStatuses>
	locationIdsInView: MutableRefObject<number[]>
	sendMessage: SendMessageFn
	readyState: ReadyState
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export default WebSocketContext;
