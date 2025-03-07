import {type MutableRefObject, createContext} from 'react';
import {LocationStatuses} from 'schemas';
import {ReadyState} from 'react-use-websocket';
import type {SendMessageFn} from '../types.ts';
import {z} from 'zod';

export interface WebSocketContextType {
	locationStatusUpdates?: z.infer<typeof LocationStatuses>
	locationsInView: MutableRefObject<z.infer<typeof LocationStatuses>>
	sendMessage: SendMessageFn
	readyState: ReadyState
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export default WebSocketContext;
