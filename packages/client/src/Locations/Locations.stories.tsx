import type {Meta, StoryObj} from '@storybook/react';
import {ComponentProps} from 'react';
import type {Location} from '../types.ts';
import Locations from './Locations.tsx';
import {WebSocketContextProvider} from '../WebSocketContext';
import locations from '../MockApi/locations.json';

type CustomArgs = ComponentProps<typeof Locations> & {currentStatuses?: 'no current statuses'}

const meta = {
	component: Locations,
	decorators: [Story => (
		<WebSocketContextProvider
			defaultLocationIdsInView={
				(locations as Location[]).slice(0, 2).map(location => location.locationId)
			}
		>
			<Story/>
		</WebSocketContextProvider>
	)],
	args: {
		currentStatuses: 'no status' as Extract<CustomArgs, 'currentStatuses'>,
		locations: (locations as Location[]).slice(0, 5),
	},
	argTypes: {
		currentStatuses: {
			control: 'radio',
			mapping: {
				'no current statuses': {},
				'Kikhanebakken in use': {
					4026: 'In use',
				},
				// Switching between "Kikhanebakken in use" and "Kikhanebakken and other in use" will not
				// re-render the component due to memoization.
				'Kikhanebakken and other in use': {
					4026: 'In use',
					9999: 'Available',
				},
			},
			options: ['no status', 'Kikhanebakken in use', 'Kikhanebakken and other in use'],
		},
	},
} satisfies Meta<CustomArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
