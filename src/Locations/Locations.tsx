import type {Location, LocationStatuses} from '../types.ts';
import LocationComponent from './Location';
import {memo} from 'react';

type Props = {
	currentStatuses: LocationStatuses
	locations: Location[]
}

/**
 * `currentStatuses` may contain statuses not relevant for this batch of `locations`. Hence, the
 * component is memoized to only re-render when `currentStatuses` contain updated status(es) for the
 * `locations` rendered by the component. All other properties of the `locations` are considered
 * static.
 */
export default memo(function Locations({currentStatuses, locations}: Props) {

	console.debug('Rendering Locations component');

	return (
		<>
			{
				locations.map(location => (
					<LocationComponent
						currentStatus={currentStatuses[location.locationId]}
						key={location.locationId}
						location={location}
					/>
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

		const locationId = oldProps.locations[i].locationId;

		if (
			// There is an updated status for a location.
			(newProps.currentStatuses[locationId] && !oldProps.currentStatuses[locationId])
			// The status of a location has changed.
			|| newProps.currentStatuses[locationId] !== oldProps.currentStatuses[locationId]
		) {
			return false;
		}
	}

	return true;
});
