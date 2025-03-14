<script lang="ts">
	import type { PageProps } from './$types';
	let { data}: PageProps = $props()
</script>

<div>
	{#if data.favorites && data.favorites.length > 0}
	<h2 class="mt-2 text-3xl font-bold tracking-tight text-base-content">Your Favorites</h2> 
	<div class="space-y-4">
		{#each data.favorites as pet}
			<form method="POST">
				<div class="card card-side bg-base-100 shadow-sm ">
					<img
						class="rounded-full"
						src={pet.petPhoto} 
						alt="pet" 
						width="200"
						height="200" />
				
					<div class="card-body">
					<h2 class="card-title">{pet.petName}</h2>
					<h3 class="petID">PetFinder ID: {pet.petID} </h3>
					<p>Description: {pet.petDescription}</p>
					<a href={pet.petURL} target="_blank" class="link link-primary">Read more on PetFinder.com</a> 
					<div class="card-actions justify-end">
						<button class="btn btn-active btn-secondary" type="submit" name="petId" value={pet.petID}>Delete</button>
						<button class="btn btn-primary"> <a href="/pets/type/{pet.petID}"> View Details</a></button>
					</div>
					</div>
				</div>
			</form>
		{/each}
	</div>
	{:else}
	<h2 class="mt-2 text-3xl font-bold tracking-tight text-base-content">You have no favorites yet</h2>
	{/if}
	
</div>