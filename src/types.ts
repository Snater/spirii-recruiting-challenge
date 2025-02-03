export type CountryISO = 'DK' // ...

export type Address = {
	name: string
	street: string
	zipCode: string
	city: string
	countryISO: CountryISO
}

export type Coordinates = {
	lat: number
	lon: number
}

export type ConnectorType = 'sType2'

export type Status = 'Available' | 'Suspended' | 'In use'

export type Type = 'hubject' | 'spirii'

export type Location = {
	locationId: number,
	address: Address,
	coordinates: Coordinates
	connectorType: ConnectorType
	// location with id 2533 has no `status`; assuming there is an empty status mapping to "unknown"
	status?: Status
	maxPower: number
	public: boolean
	type: Type
}

export type LocationResponse = {
	locations: Location[]
	nextCursor?: number
}

export type SearchQuery = {
	text: string
	status?: Status
}

export type LocationStatuses = {
	[k: number]: Status
}