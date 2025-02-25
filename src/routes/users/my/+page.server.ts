import type { PageServerLoad } from './$types';

import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { z } from 'zod';

// Define outside the load function so the adapter can be cached
const schema = z.object({
	full_name: z.string().min(2).max(64),
	email: z.string().email(),
	// password: z.string().min(6).max(32),
	location: z.string().min(5).max(10),
});

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

	const account_form = await superValidate(profile, zod(schema))
		// .then(data => console.log(data))
	return { account_form }
}

// Form actions
export const actions = {
	default: async ({ request, locals: { supabase, user } }) => {
		const form = await superValidate(request, zod(schema));
		console.log(form);

		if (!form.valid) {
			// Return { form } and things will just work.
			return fail(400, { form });
		}

		// Updating data
		const { data, error } = await supabase
			.from('profiles')
			.update({
				full_name: form.data.full_name,
				location: form.data.location
			})
			.eq('id', user?.id)
			.select('full_name, location')

		if (error) {
			console.error(error)
			return fail(500, { error })
		}

		// Return the form with a status message
		return message(form, 'Form posted successfully!');
	}
};