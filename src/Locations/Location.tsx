import type {Location, SendMessageFn, Status} from '../types.ts';
import EvStationIcon from '@mui/icons-material/EvStation';
import Grid2 from '@mui/material/Grid2';
import ListItem from '@mui/material/ListItem';
import LocationIcon from './LocationIcon.tsx';
import {MutableRefObject} from 'react';
import PlaceIcon from '@mui/icons-material/Place';
import Typography from '@mui/material/Typography';
import {useInView} from 'react-intersection-observer';

type Props = {
	currentStatus?: Status
	location: Location
	locationIdsInView: MutableRefObject<number[]>
	sendMessage: SendMessageFn
}

export default function Location({
	currentStatus,
	location,
	locationIdsInView,
	sendMessage,
}: Props) {
	const status = currentStatus ?? location.status;

	const {ref} = useInView({
		onChange: (inView) => {
			locationIdsInView.current = inView
				? locationIdsInView.current.concat([location.locationId])
				: locationIdsInView.current.filter(locationId => locationId !== location.locationId);

			console.debug('Location ids in view', locationIdsInView);

			sendMessage(JSON.stringify(locationIdsInView));
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
