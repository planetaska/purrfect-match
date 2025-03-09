import type { PageServerLoad } from './$types';

// Load function
export const load: PageServerLoad = async ({ depends, locals: { supabase, user } }) => {
	depends('supabase:db:favorites')
	const { data: favorites } = await supabase.from('favorites')
		.select('petType, petID, petName, petPhoto, petURL').eq('id', user?.id).then(response => {
			return response
		})

	return { data: favorites}
}

