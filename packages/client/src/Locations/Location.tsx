import type {Location, Status} from '../types.ts';
import EvStationIcon from '@mui/icons-material/EvStation';
import Grid2 from '@mui/material/Grid2';
import ListItem from '@mui/material/ListItem';
import LocationIcon from './LocationIcon.tsx';
import PlaceIcon from '@mui/icons-material/Place';
import Typography from '@mui/material/Typography';
import {useInView} from 'react-intersection-observer';
import useWebSocketContext from '../WebSocketContext';

function locationIdsMatching(locationIdsA: number[], locationIdsB: number[]) {
	if (locationIdsA.length !== locationIdsB.length) {
		return false;
	}

	return locationIdsA.every(locationId => locationIdsB.includes(locationId));
}

type Props = {
	currentStatus?: Status
	location: Location
}

export default function Location({currentStatus, location}: Props) {
	const status = currentStatus ?? location.status;

	const {locationsInView, sendMessage} = useWebSocketContext();

	const {ref} = useInView({
		onChange: (inView) => {
			const previousLocationIdsInView = locationsInView.current.map(
				locationInView => locationInView.locationId
			);

			locationsInView.current = inView
				? locationsInView.current.concat([{locationId: location.locationId, status}])
				: locationsInView.current.filter(
					locationInView => locationInView.locationId !== location.locationId
				);

			const locationIdsInView = locationsInView.current.map(
				locationInView => locationInView.locationId
			);

			if (!locationIdsMatching(locationIdsInView, previousLocationIdsInView)) {
				console.debug('Location ids in view', locationsInView.current);
				sendMessage(JSON.stringify(locationsInView.current));
			}
		},
	});

	return (
		<ListItem ref={ref}>
			<Grid2 container spacing={1}>
				<Grid2
					alignContent="center"
					bgcolor={
						status === 'Available'
							? 'success.main'
							: status === 'In use'
								? 'warning.main'
								: status === 'Suspended'
									? 'error.main'
									: 'grey.700'
					}
					color="common.white"
					p={1}
					size="auto"
				>
					<LocationIcon status={status}/>
				</Grid2>
				<Grid2 container direction="column" size="grow">
					<Grid2><Typography variant="h4">{location.address.name}</Typography></Grid2>
					<Grid2 container>
						<Grid2>
							<PlaceIcon/>
						</Grid2>
						<Grid2>{location.address.street}, {location.address.zipCode} {location.address.city}, {location.address.countryISO}</Grid2>
					</Grid2>
					<Grid2 container>
						<Grid2>
							<EvStationIcon/>
						</Grid2>
						<Grid2>{location.maxPower}, {location.type}, {location.connectorType}</Grid2>
					</Grid2>
				</Grid2>
			</Grid2>
		</ListItem>
	);
}
