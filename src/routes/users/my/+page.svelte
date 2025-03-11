<script lang="ts">
	import type { PageProps } from './$types';

	import AccountForm from '$components/Form/AccountForm.svelte';
	import PreferencesForm from '$components/Form/PreferencesForm.svelte';

	let { data }: PageProps = $props()
	// let { account_form, prefs_form } = $derived(data)
</script>

<main class="px-4">
	<h1 class="sr-only">Account Settings</h1>

	<div class="tabs tabs-border">
		<input type="radio" name="user_tabs" class="tab" aria-label="Account Info" checked />
		<div class="tab-content rounded-md overflow-hidden">
			<AccountForm data={data.account_form} />
		</div>

		<input type="radio" name="user_tabs" class="tab" aria-label="Pet Preferences" />
		<div class="tab-content rounded-md overflow-hidden">
			<PreferencesForm data={data.prefs_form} />
		</div>

		<input type="radio" name="user_tabs" class="tab" aria-label="Pet Favorites" />
		<div class="tab-content rounded-md overflow-hidden">
		
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
						<button class="btn btn-active btn-secondary">Delete</button>
						<button class="btn btn-primary"> <a href="/pets/type/{pet.petID}"> View Details</a></button>
					</div>
					</div>
				</div>
				{/each}
			{:else}
			<p>You have no favorites yet.</p>
			{/if}
		</div>
	</div>
</main>
