<script lang="ts">
	import type { PageProps } from './$types';
	let { data}: PageProps = $props()
</script>

<div>
	{#if data.favorites && data.favorites.length > 0}
	<h2 class="text-base/7 font-semibold text-base-content">Your Favorites</h2> 
		{#each data.favorites as pet}
		<div class="card card-side bg-base-100 shadow-sm">
			<form method="POST">
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
					<button class="btn btn-active btn-secondary" type="submit" name="petId" value={pet.petID}>Delete</button>
					<button class="btn btn-primary"> <a href="/pets/type/{pet.petID}"> View Details</a></button>
				</div>
				</div>
			</form>
		</div>
		{/each}
	{:else}
	<h2 class="text-base/7 font-semibold text-base-content">You have no favorites yet</h2>
	{/if}
</div>