import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ depends, locals: { supabase } }) => {
	depends('supabase:db:profiles')
	const { data: profile } = await supabase.from('profiles').select('id,location,admin')
	return { profile: profile[0] ?? undefined }
}