import {type Dispatch, type SetStateAction, memo} from 'react';
import type {Location} from '../types.ts';
import LocationComponent from './Location';

type Props = {
	locations: Location[]
	setLocationIdsInView: Dispatch<SetStateAction<number[]>>
}

export default memo(function Locations({locations, setLocationIdsInView}: Props) {
	return (
		<>
			{
				locations.map(location => (
					<LocationComponent
						key={location.locationId}
						location={location}
						setLocationIdsInView={setLocationIdsInView}
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
	}

	return true;
});