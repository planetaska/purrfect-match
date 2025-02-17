/*
	Server side load function for creating a Supabase client in root layout (+layout.ts)
 */

import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals: { safeGetSession }, cookies }) => {
	const { session } = await safeGetSession()
	return {
		session,
		cookies: cookies.getAll(),
	}
}