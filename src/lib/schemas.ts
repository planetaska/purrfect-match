import { z } from 'zod';

export const accountSchema = z.object({
	full_name: z.string().min(2).max(64),
	email: z.string().email(),
	// password: z.string().min(6).max(32),
	location: z.string().min(5).max(10),
});

export const prefsSchema = z.object({
	size: z.string(),
	age: z.string(),
	gender: z.string(),
	coat: z.string(),
	env_children: z.boolean(),
	env_dogs: z.boolean(),
	env_cats: z.boolean(),
});

export type AccountSchema = typeof accountSchema;
export type PrefsSchema = typeof prefsSchema;