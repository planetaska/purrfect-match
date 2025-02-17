/*
	Handles users authentication.
	Form actions: register, sign_in
 */

import { redirect } from '@sveltejs/kit'

import type { Actions } from './$types'

export const actions: Actions = {
	register: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData()
		const email = formData.get('email') as string
		const password = formData.get('password') as string
		const full_name = formData.get('full_name') as string
		const location = formData.get('location') as string

		const { error } = await supabase.auth.signUp(
			{
				email, password,
				options: {
					data: {
						full_name: full_name,
						location: location,
					},
				},
			}
		)
		if (error) {
			console.error(error)
			redirect(303, '/auth/error')
		} else {
			redirect(303, '/')
		}
	},
	sign_in: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData()
		const email = formData.get('email') as string
		const password = formData.get('password') as string

		const { error } = await supabase.auth.signInWithPassword({ email, password })
		if (error) {
			console.error(error)
			redirect(303, '/auth/error?message=' + error.code)
		} else {
			redirect(303, '/')
		}
	},
}