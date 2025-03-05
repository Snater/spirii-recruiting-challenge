import '@testing-library/jest-dom';
import {vi} from 'vitest';

vi.mock('react-use-websocket', async () => ({
	default: () => ({
		sendMessage: () => null,
		readyState: WebSocket.CLOSED,
	}),
}));

const intersectionObserverMock = () => ({
	disconnect: () => null,
	observe: () => null,
	unobserve: () => null,
})
window.IntersectionObserver = vi.fn().mockImplementation(intersectionObserverMock);
