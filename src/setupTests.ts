import '@testing-library/jest-dom';

const intersectionObserverMock = () => ({
	disconnect: () => null,
	observe: () => null,
	unobserve: () => null,
})
window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock);