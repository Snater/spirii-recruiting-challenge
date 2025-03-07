import {z} from 'zod';

const LocationStatus = z.object({
	locationId: z.number(),
	status: z.union([z.literal('Available'), z.literal('In use'), z.literal('Suspended')]).optional(),
});

export const LocationStatuses = z.array(LocationStatus);
