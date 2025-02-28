import type {Location, LocationStatuses, SendMessageFn} from '../types.ts';
import {type MutableRefObject, memo} from 'react';
import LocationComponent from './Location';

type Props = {
	currentStatuses: LocationStatuses
	locationIdsInView: MutableRefObject<number[]>
	locations: Location[]
	sendMessage: SendMessageFn
}

export default memo(function Locations({
	currentStatuses,
	locationIdsInView,
	locations,
	sendMessage,
}: Props) {
	return (
		<>
			{
				locations.map(location => (
					<LocationComponent
						currentStatus={currentStatuses[location.locationId]}
						key={location.locationId}
						location={location}
						locationIdsInView={locationIdsInView}
						sendMessage={sendMessage}
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
