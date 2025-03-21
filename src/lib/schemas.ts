import { z } from 'zod';

export const accountSchema = z.object({
	full_name: z.string().min(2).max(64),
	email: z.string().email(),
	password: z.string().min(6).max(32).optional(),
	password_confirm: z.string().min(6).max(32).optional(),
	location: z.string().min(5).max(10),
}).refine((data) => data.password === data.password_confirm,
	{ message: 'Passwords do not match', path: ["password_confirm"] });

export const prefsSchema = z.object({
	size: z.string().array(),
	age: z.string().array(),
	gender: z.string(),
	coat: z.string(),
	env_children: z.boolean(),
	env_dogs: z.boolean(),
	env_cats: z.boolean(),
});

export const filterSchema = z.object({
	sort: z.string().default('recent'),
	size: z.string().array().optional(),
	age: z.string().array().optional(),
	gender: z.string().array().optional(),
	coat: z.string().array().optional(),
	env_children: z.boolean().optional(),
	env_dogs: z.boolean().optional(),
	env_cats: z.boolean().optional(),
});

export type AccountSchema = typeof accountSchema;
export type PrefsSchema = typeof prefsSchema;
export type FilterSchema = typeof filterSchema;