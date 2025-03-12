import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ depends, locals: { supabase, user } }) => {
    depends('supabase:db:favorites')
        const { data: favorites, error } = await supabase.from('favorites') //'petType, petID, petName, petPhoto, petURL'
            .select('petType, petID, petName, petDescription, petURL').eq('id', user?.id)
            .then(response => {
                console.log(response)
                console.log(`User ID is ${user?.id}`)
                return response
            })
        if (error){
            console.log(error)
        }
        return {favorites: favorites}
}