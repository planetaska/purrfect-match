<script lang="ts">
	import type { PageProps } from './$types';
	let { data}: PageProps = $props()

	async function deleteFav(id: number) {
		const formData = new FormData();
		formData.append('petId', id.toString());

		const response = await fetch('/users/my/favorites', {
			method: 'POST',
			body: formData,
		});

		if (response.ok) {
			// Successfully deleted pet, maybe navigate or refresh
			alert('Pet deleted successfully!');
		} else {
			alert('Error deleting pet');
		}
  }
  
</script>

<div>
    <!-- <input type="radio" name="user_tabs" class="tab" aria-label="Pet Favorites" /> -->
		<!-- <div class="tab-content rounded-md overflow-hidden"> -->
		
			{#if data.favorites && data.favorites.length > 0}
				{#each data.favorites as pet}
				<div class="card card-side bg-base-100 shadow-sm">
					<figure>
					<img
						src={pet.petPhoto} 
						alt="pet" />
					</figure>
					<div class="card-body">
					<h2 class="card-title">{pet.petName}</h2>
					<p>{pet.petDescription}</p>
					<div class="card-actions justify-end">
						<button class="btn btn-active btn-secondary" onclick={()=>deleteFav(pet.petID)}>Delete</button>
						<button class="btn btn-primary"> <a href="/pets/type/{pet.petID}"> View Details</a></button>
					</div>
					</div>
				</div>
				{/each}
			{:else}
			<p>You have no favorites yet.</p>
			{/if}
		<!-- </div> -->
</div>