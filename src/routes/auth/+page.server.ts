/*
	Handles users authentication.
	Form actions: register, sign_in
 */

import { redirect } from 'sveltekit-flash-message/server'

import type { Actions } from './$types'

export const actions: Actions = {
	register: async ({ request, cookies, locals: { supabase } }) => {
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
			redirect(303, '/', { type: 'success', message: "Registration successful!" }, cookies)
		}
	},
	sign_in: async ({ request, cookies, locals: { supabase } }) => {
		const formData = await request.formData()
		const email = formData.get('email') as string
		const password = formData.get('password') as string

		const { error } = await supabase.auth.signInWithPassword({ email, password })
		if (error) {
			console.error(error)
			redirect(303, '/auth/error?message=' + error.code)
		} else {
			redirect(303, '/', { type: 'success', message: "Welcome back!" }, cookies)
		}
	},

	reset_password: async ({ request, cookies, locals: { supabase } }) => {
		const formData = await request.formData()
		const email = formData.get('email') as string

		const {data, error} = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: '/update',
		  })

		if (error) {
			console.error(error)
			redirect(303, '/auth/error?message=' + error.code)
		} 
		else {
			redirect(303, '/', { type: 'success', message: "Check your email for reset password link!" }, cookies);
		}
	},
	
	update_password: async ({ request, cookies, locals: { supabase } }) => {
		const formData = await request.formData()
		const newPassword = formData.get('new-password') as string
		const confirmPassword = formData.get('confirm-password') as string

		console.log(newPassword);

		if (newPassword !== '' && confirmPassword === newPassword) {
			const {error} = await supabase.auth.updateUser({ password: newPassword })
			if (error) {
				console.error(error)
				redirect(303, '/auth/error?message=' + error.code)
			} else {
				console.log("succes!");
				redirect(303, '/', { type: 'success', message: "Update password successful" }, cookies)
			}
		} else{
			console.log("passwords don't match!");
			redirect(303, '/update', { type: 'success', message: "Passwords don't match" }, cookies)
		}
	}
}