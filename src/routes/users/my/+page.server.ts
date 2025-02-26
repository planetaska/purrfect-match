import type { PageServerLoad } from './$types';

import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
// import { z } from 'zod';
import { accountSchema, prefsSchema } from '$lib/schemas';

// Moved to $lib/schemas.ts
// Define outside the load function so the adapter can be cached
// const accountSchema = z.object({
// 	full_name: z.string().min(2).max(64),
// 	email: z.string().email(),
// 	// password: z.string().min(6).max(32),
// 	location: z.string().min(5).max(10),
// });
//
// const prefsSchema = z.object({
// 	size: z.string(),
// 	age: z.string(),
// 	gender: z.string(),
// 	coat: z.string(),
// 	env_children: z.boolean(),
// 	env_dogs: z.boolean(),
// 	env_cats: z.boolean(),
// });

// Load function
export const load: PageServerLoad = async ({ depends, locals: { supabase, user } }) => {
	depends('supabase:db:profiles')
	const { data: profile } = await supabase.from('profiles')
		.select('full_name, location').eq('id', user?.id).single().then(response => {
			// Inject email because email is saved in users table
			response.data.email = user?.email
			return response
		})
	// return { profile: profile ?? undefined }

	const { data: prefs } = await supabase.from('prefs')
		.select().eq('id', user?.id).single()

	const account_form = await superValidate(profile, zod(accountSchema))
		// .then(data => console.log(data))
	const prefs_form = await superValidate(prefs, zod(prefsSchema))

	return { account_form, prefs_form }
}

// Form actions
export const actions = {
	account: async ({ request, locals: { supabase, user } }) => {
		const form = await superValidate(request, zod(accountSchema));
		console.log(form);

		if (!form.valid) {
			// Return { form } and things will just work.
			return fail(400, { form });
		}

		// Updating profile
		const { data, error } = await supabase
			.from('profiles')
			.update({
				full_name: form.data.full_name,
				location: form.data.location
			})
			.eq('id', user?.id)
			.select('full_name, location').single()

		if (error) {
			console.error(error)
			return fail(500, { error })
		}

		// Updating email
		// Email is treated differently on Supabase managed auth accounts.
		// Sends a "Confirm Email Change" email to the new email address.
		if (form.data.email !== user?.email) {
			const { error: email_error } = await supabase.auth.updateUser({
				email: form.data.email
			})

			if (email_error) {
				console.error(email_error)
				return fail(500, { email_error })
			} else {
				// Return the form with a confirmation email sent message
				return message(form, 'A confirmation email is sent to you.');
			}
		}

		// Return the form with a status message
		return message(form, 'Profile updated successfully!');
	},
	prefs: async ({ request, locals: { supabase, user } }) => {
		const form = await superValidate(request, zod(prefsSchema));
		console.log(form);

		if (!form.valid) {
			// Return { form } and things will just work.
			return fail(400, { form });
		}

		// Updating data
		const { data, error } = await supabase
			.from('prefs')
			.update({
				size: form.data.size,
				age: form.data.age,
				gender: form.data.gender,
				coat: form.data.coat,
				env_children: form.data.env_children,
				env_dogs: form.data.env_dogs,
				env_cats: form.data.env_cats
			})
			.eq('id', user?.id)
			.select()

		if (error) {
			console.error(error)
			return fail(500, { error })
		}

		// Return the form with a status message
		return message(form, 'Preferences updated successfully!');
	}
};