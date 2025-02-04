import type {LocationStatuses, SearchQuery} from '../types';
import {useEffect, useState} from 'react';
import useWebSocket, {ReadyState} from 'react-use-websocket';
import Alert from '@mui/material/Alert';
import Locations from '../Locations';
import CircularProgress from '@mui/material/CircularProgress';
import Filter from '../Filter/Filter.tsx';
import Grid2 from '@mui/material/Grid2';
import List from '@mui/material/List';
import MockApi from '../MockApi';
import Typography from '@mui/material/Typography';
import {useInfiniteQuery} from '@tanstack/react-query';

type Props = {
	isScrolledToBottom?: boolean
}

export default function LocationList({isScrolledToBottom = false}: Props) {
	const [searchQuery, setSearchQuery] = useState<SearchQuery>({text: '', status: undefined});
	const [locationIdsInView, setLocationIdsInView] = useState<number[]>([]);

	const {sendMessage, lastJsonMessage, readyState} = import.meta.env.VITE_SOCKET_URL
		// eslint-disable-next-line react-hooks/rules-of-hooks
		? useWebSocket(import.meta.env.VITE_SOCKET_URL)
		: {sendMessage: () => null, lastJsonMessage: '', readyState: ReadyState.CLOSED};
	const [currentStatuses, setCurrentStatuses] = useState<LocationStatuses>({});

	const {data, fetchNextPage, hasNextPage, isFetchingNextPage, status} = useInfiniteQuery({
		queryKey: ['locations', searchQuery.text, searchQuery.status],
		queryFn: ({pageParam, signal}) => {
			return MockApi.fetchLocations(searchQuery.text, searchQuery.status, pageParam, signal);
		},
		initialPageParam: 0,
		getNextPageParam: lastPage => lastPage.nextCursor,
	});

	useEffect(() => {
		if (isScrolledToBottom && !isFetchingNextPage && hasNextPage) {
			fetchNextPage();
		}
	}, [fetchNextPage, hasNextPage, isFetchingNextPage, isScrolledToBottom]);

	useEffect(() => {
		sendMessage(JSON.stringify(locationIdsInView));
	}, [locationIdsInView, sendMessage]);

	useEffect(() => {
		if (lastJsonMessage) {
			setCurrentStatuses(statuses => Object.assign({}, statuses, lastJsonMessage));
		}
	}, [lastJsonMessage]);

	const hasResults = (data?.pages?.[0].locations.length ?? 0) > 0;

	if (import.meta.env.SOCKET_URL && readyState !== ReadyState.OPEN) {
		return (
			<>
				Waiting for WebSocket connection
				<CircularProgress aria-label="Loading more…" size="1em" sx={{ml: 1}}/>
			</>
		);
	}

	return (
		<Grid2 container direction="column">
			<Grid2 justifyItems="center" pb={4}>
				<Typography component="h1" variant="h2">Charge Point Locations</Typography>
			</Grid2>
			<Grid2 alignItems="center" container justifyContent="center" size={{xs: 12}} spacing={1}>
				<Filter searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
			</Grid2>
			{
				status === 'pending' && (
					<Grid2 justifyItems="center" mt={2}>
						<CircularProgress
							aria-label="Loading…"
							size="2em"
							sx={{display: 'flex'}}
						/>
					</Grid2>
				)
			}
			{
				status !== 'pending' && !hasResults && (
					<Grid2 pt={2}>
						<Alert severity="info">
							Could not find any locations according to the criteria provided.
						</Alert>
					</Grid2>
				)
			}
			{
				status !== 'pending' && data?.pages?.[0].locations.length ? (
					<Grid2>
						<List>
							{
								data.pages.map((page, i) => (
									<Locations
										currentStatuses={currentStatuses}
										key={i}
										locations={page.locations}
										setLocationIdsInView={setLocationIdsInView}
									/>
								))
							}
						</List>
					</Grid2>
				) : null
			}
			{
				isFetchingNextPage && (
					<Grid2 container justifyContent="center" pt={2}>
						<CircularProgress aria-label="Loading more…" size="2em"/>
					</Grid2>
				)
			}
			{
				status !== 'pending' && hasResults && !hasNextPage && (
					<Grid2>
						<Alert severity="info">No more locations matching the filter criteria.</Alert>
					</Grid2>
				)
			}
		</Grid2>
	)
}
