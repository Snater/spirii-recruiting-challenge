import type {Location, LocationResponse, Status} from '../types.ts';
import locations from './locations.json';

const ITEMS_PER_PAGE = 5 as const;

export default class MockApi {

	static fetchLocations(
		query: string,
		status?: Status,
		cursor = 0,
		signal?: AbortSignal
	): Promise<LocationResponse> {

		return new Promise((resolve, reject) => {

			setTimeout(() => {
				if (signal?.aborted) {
					reject(new Error('Aborted'));
					return;
				}

				const filteredLocations = (locations as Location[])
					.filter(location => {
						return (
							(
								location.address.name.toLowerCase().includes(query.toLowerCase())
								|| location.address.street.toLowerCase().includes(query.toLowerCase())
								|| location.address.zipCode.toLowerCase().includes(query.toLowerCase())
								|| location.address.city.toLowerCase().includes(query.toLowerCase())
								|| location.address.countryISO.toLowerCase().includes(query.toLowerCase())
							)
							&& (!status || status === location.status)
						);
					});

				let nextCursor: number | undefined = cursor + ITEMS_PER_PAGE;

				if (nextCursor > filteredLocations.length) {
					nextCursor = undefined;
				}

				const pageItems = filteredLocations.slice(cursor, nextCursor);

				resolve({locations: pageItems, nextCursor});
			}, 500);
		});
	}

}