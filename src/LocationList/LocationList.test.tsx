import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {expect, test, vi} from 'vitest';
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react';
import type {Location} from '../types';
import LocationList from './';
import MockApi from '../MockApi';
import locations from '../MockApi/locations.json';

vi
	.spyOn(MockApi, 'fetchLocations')
	.mockImplementation((_query, _status?, cursor = 0) => {
		return new Promise(resolve => {
			resolve({locations: (locations as Location[]).slice(cursor, cursor + 5), nextCursor: cursor + 5})
		})
	});

test('Default rendering', async () => {
	const queryClient = new QueryClient();
	render(<QueryClientProvider client={queryClient}><LocationList/></QueryClientProvider>);

	await waitForElementToBeRemoved(screen.getByLabelText('Loading…'));

	expect(screen.getByText('Kikhanebakken - LB')).toBeInTheDocument();
	expect(screen.queryByText('Struensee - FDM')).toBeNull();
});

test('Scrolled to bottom', async () => {
	const queryClient = new QueryClient();
	render(<QueryClientProvider client={queryClient}><LocationList isScrolledToBottom/></QueryClientProvider>);

	await waitForElementToBeRemoved(screen.getByLabelText('Loading…'));

	expect(screen.getByText('Kikhanebakken - LB')).toBeInTheDocument();
	expect(screen.getByText('Struensee - FDM')).toBeInTheDocument();
});