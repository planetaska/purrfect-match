/*
	Server side load function for creating a Supabase client in root layout (+layout.ts)
 */

import type { LayoutServerLoad } from './$types'

// For flash messages
import { loadFlash } from 'sveltekit-flash-message/server';

export const load: LayoutServerLoad = loadFlash( async ({ locals: { safeGetSession }, cookies }) => {
	const { session } = await safeGetSession()
	return {
		session,
		cookies: cookies.getAll(),
	}
})