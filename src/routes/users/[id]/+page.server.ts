import type { PageServerLoad } from '../../../../.svelte-kit/types/src/routes'

export const load: PageServerLoad = async ({ depends, locals: { supabase } }) => {
	depends('supabase:db:profiles')
	const { data: profile } = await supabase.from('profiles').select('id,location')
	return { profile: profile[0] ?? undefined }
}