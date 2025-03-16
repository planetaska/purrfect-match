<script lang="ts">
	let { supabase, user, animal} = $props()
	const photo = $derived.by(() => {
		return animal.photos.length > 0 ? animal.photos[0].large : `/images/layout/placeholder/${animal.type}.png`
	})
    async function addToFav(animal, user, supabase){

		// console.log(`user is ${user?.id}`)
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

<button aria-label="Add to favorite" class="btn btn-secondary btn-circle" onclick={() => addToFav(animal, user, supabase)}>
	<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="size-[1.2em]"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
</button>
