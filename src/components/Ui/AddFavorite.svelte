<script lang="ts">
	let { supabase, user, animal} = $props()
	const photo = $derived.by(() => {
		return animal.photos.length > 0 ? animal.photos[0].large : `/images/layout/placeholder/${animal.type}.png`
	})
    async function addToFav(animal, user, supabase){

		console.log(`user is ${user?.id}`)
		const { data, error } = await supabase
        .from('favorites')
        .insert({ id: user?.id, petID: animal.id, petName: animal.name, petType: animal.type, petDescription: animal.description, petPhoto: photo, petURL: animal.url })

        if (error) {
			if (error.code == '42501'){
				console.error('Error adding pet', error);
				alert('Please ensure you are signed in or register an account today!')
			} else{
				console.error('Error adding pet', error);
				alert('Error adding pet');
			}
        } else{
            alert('Pet added successfully!');
            console.log('Pet added successfully!');
        }
	}
</script>

{#if user?.id}
<button class="btn btn-primary" onclick={() => addToFav(animal, user, supabase)}>Add to Favorites</button>
{/if}