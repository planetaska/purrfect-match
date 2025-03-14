import type { PageServerLoad } from './$types';

export const actions = {
    default: async ({ request, locals: { supabase} }) => {
        const formData = await request.formData();
        const petID = formData.get('petId') as string;

        console.log(`PetID is ${petID}`);
        // Delete the item from the Supabase table
        const { data, error } = await supabase
        .from('favorites') 
        .delete()
        .eq('petID', petID);

        if (error) {
            console.error('Error deleting item:', error);
        } 
    }
}

export const load: PageServerLoad = async ({ depends, locals: { supabase, user } }) => {
    depends('supabase:db:favorites')
        const { data: favorites, error } = await supabase.from('favorites') //'petType, petID, petName, petPhoto, petURL'
            .select('petType, petID, petName, petDescription, petPhoto, petURL').eq('id', user?.id)
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