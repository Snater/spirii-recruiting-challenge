import '@testing-library/jest-dom';
import {vi} from 'vitest';

const intersectionObserverMock = () => ({
	disconnect: () => null,
	observe: () => null,
	unobserve: () => null,
})
window.IntersectionObserver = vi.fn().mockImplementation(intersectionObserverMock);