<script lang="ts">

    import {redirect } from '@sveltejs/kit'
	let { supabase, pet } = $props();

 	async function deleteFav(id: number) {
        const { data, error } = await supabase
        .from('favorites')
        .delete()
        .eq('petID', id);

        if (error) {
            console.error('Error deleting item:', error);
            alert('Error deleting pet');
        } else{
            alert('Pet deleted successfully!');
            console.log('Pet deleted successfully!');
        }
    }
</script>

<div class="card card-side bg-base-100 shadow-sm">
    <figure>
    <img
        src={pet.petPhoto} 
        alt="pet" />
    </figure>
    <div class="card-body">
    <h2 class="card-title">{pet.petName}</h2>
    <h3 class="petID">{pet.petID} </h3>
    <p>{pet.petDescription}</p>
    <div class="card-actions justify-end">
        <button class="btn btn-active btn-secondary" onclick={()=>deleteFav(pet.petID)}>Delete</button>
        <button class="btn btn-primary"> <a href="/pets/type/{pet.petID}"> View Details</a></button>
    </div>
    </div>
</div>