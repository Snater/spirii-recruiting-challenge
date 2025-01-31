import type {Location} from '../types.ts';
import {memo} from 'react';
import {ListItem} from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import PlaceIcon from '@mui/icons-material/Place';
import EvStationIcon from '@mui/icons-material/EvStation';
import LocationIcon from './LocationIcon.tsx';

type Props = {
	locations: Location[]
}

export default memo(function Locations({locations}: Props) {
	return (
		<>
			{
				locations.map(location => (
					<ListItem key={location.locationId}>
						<Grid2 container spacing={1}>
							<Grid2
								alignContent="center"
								bgcolor={
									location.status === 'Available'
										? 'success.main'
										: location.status === 'In use'
										? 'warning.main'
										: location.status === 'Suspended'
										? 'error.main'
										: 'grey.700'
								}
								color="common.white"
								p={1}
								size="auto"
							>
								<LocationIcon status={location.status}/>
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
				))
			}
		</>
	);
}, (oldProps, newProps) => {
	if (oldProps.locations.length !== newProps.locations.length) {
		return false;
	}

	for (let i = 0; i < oldProps.locations.length; i++) {
		if (oldProps.locations[i].locationId !== newProps.locations[i].locationId) {
			return false;
		}
	}

	return true;
});