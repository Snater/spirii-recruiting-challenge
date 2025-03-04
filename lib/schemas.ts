import {z} from 'zod';

export const LocationIds = z.object({
	current: z.array(z.number()),
});

const LocationStatus = z.object({
	locationId: z.number(),
	status: z.union([z.literal('Available'), z.literal('In use'), z.literal('Suspended')]),
});

export const LocationStatuses = z.array(LocationStatus);
