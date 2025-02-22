import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

import { createClient } from '@supabase/supabase-js'
import { PUBLIC_SUPABASE_URL } from '$env/static/public'
import { PRIVATE_SUPABASE_SERVICE_KEY } from '$env/static/private'

export const load: PageServerLoad = async ({ depends, locals: { supabase } }) => {
	// Create a separate supabase client for admin
	const supabaseAdmin = createClient(PUBLIC_SUPABASE_URL, PRIVATE_SUPABASE_SERVICE_KEY, {
		auth: {
			persistSession: false,
			autoRefreshToken: false,
			detectSessionInUrl: false,
		},
	})

	depends('supabase:db:profiles')
	const { data: { users }, error } = await supabaseAdmin.auth.admin.listUsers()

	if (error) {
		console.error(error)
		redirect(303, '/auth/error?message=' + error.code)
	} else {
		return { users: users ?? [] }
	}
}