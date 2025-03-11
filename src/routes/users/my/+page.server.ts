import type { PageServerLoad } from './$types';

import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, redirect } from '@sveltejs/kit';

// Form schemas moved to $lib/schemas.ts
import { accountSchema, prefsSchema } from '$lib/schemas';
import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { PRIVATE_SUPABASE_SERVICE_KEY } from '$env/static/private';

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

	depends('supabase:db:favorites')
	const { data: favorites, error } = await supabase.from('favorites') //'petType, petID, petName, petPhoto, petURL'
		.select('petType, petID, petName, petDescription, petURL').eq('id', user?.id)
		.then(response => {
			console.log(response)
			console.log(`User ID is ${user?.id}`)
			return response
		})


	if (error){
		console.log(error)
	}

	return { account_form, prefs_form, favorites:favorites}
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

		// Updating password
		// Needs a separate process because Supabase constraints
		if (form.data.password !== '' && form.data.password_confirm === form.data.password) {
			const { error: password_error } = await supabase.auth.updateUser({
				password: form.data.password
			})

			if (password_error) {
				console.error(password_error)
				return fail(500, { password_error })
			} else {
				// Return the form with a password update successful message
				return message(form, 'Password updated successfully!');
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
	},
	quit: async ({ request, locals: { supabase, user } }) => {
		console.log('Quitting account: ' + user?.id);

		const supabaseAdmin = createClient(PUBLIC_SUPABASE_URL, PRIVATE_SUPABASE_SERVICE_KEY, {
			auth: {
				persistSession: false,
				autoRefreshToken: false,
				detectSessionInUrl: false,
			},
		})

		const { error: quit_error } = await supabaseAdmin.auth.admin.deleteUser(user?.id)

		if (quit_error) {
			console.error(quit_error)
			return fail(500, { quit_error })
		}

		// Redirect to home
		redirect(303, '/')
	}
};