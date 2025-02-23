import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ depends, locals: { supabase, user } }) => {
	depends('supabase:db:profiles')
	const { data: profile } = await supabase.from('profiles').select().eq('id', user?.id).single()
	return { profile: profile ?? undefined }
}