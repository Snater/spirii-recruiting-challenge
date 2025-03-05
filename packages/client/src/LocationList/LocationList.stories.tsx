import type {Meta, StoryObj} from '@storybook/react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {useCallback, useEffect, useState} from 'react';
import LocationList from './LocationList.tsx';
import {WebSocketContextProvider} from '../WebSocketContext';
import {scrolledToBottom} from '../util';

const queryClient = new QueryClient();

function Decorator() {
	const [isScrolledToBottom, setIsScrolledToBottom] = useState(true);

	const handleScroll = useCallback(() => {
		setIsScrolledToBottom(scrolledToBottom());
	}, []);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [handleScroll]);

	return (
		<QueryClientProvider client={queryClient}>
			<WebSocketContextProvider>
				<LocationList isScrolledToBottom={isScrolledToBottom}/>
			</WebSocketContextProvider>
		</QueryClientProvider>
	)
}

const meta = {
	component: LocationList,
} satisfies Meta<typeof LocationList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Decorator/>
	),
};
