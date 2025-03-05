import {expect, test} from 'vitest';
import {render, screen} from '@testing-library/react';
import Locations from './';
import {WebSocketContextProvider} from '../WebSocketContext';

test('Render table', async () => {
	render(
		<WebSocketContextProvider>
			<Locations
				currentStatuses={[]}
				locations={[{
					locationId: 4026,
					address: {
						name: 'Kikhanebakken - LB',
						street: 'Kikhanebakken 35',
						zipCode: '2852',
						city: 'Nærum',
						countryISO: 'DK',
					},
					coordinates: {
						lat: 55.9121551,
						lon: 12.4431991,
					},
					connectorType: 'sType2',
					status: 'Available',
					maxPower: 22,
					public: false,
					type: 'spirii',
				}]}
			/>
		</WebSocketContextProvider>
	);

	expect(screen.getByText('Kikhanebakken - LB')).toBeInTheDocument();
});
