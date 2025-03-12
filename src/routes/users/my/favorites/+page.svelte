<script lang="ts">
	import type { PageProps } from './$types';
	import Favorites from '$components/Favorites.svelte';

	let { data}: PageProps = $props()
	let { supabase } = $derived(data)
  
</script>

<div>
	{#if data.favorites && data.favorites.length > 0}
	<h2 class="text-base/7 font-semibold text-base-content">Your Favorites</h2> 
		{#each data.favorites as pet}
		<Favorites {supabase} {pet} />
		{/each}
	{:else}
	<h2 class="text-base/7 font-semibold text-base-content">You have no favorites yet</h2>
	{/if}
</div>