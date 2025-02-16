<script lang="ts">
	// Just an example, suppose we have page data loaded from +page.ts:
	//
	// import type { PageProps } from './$types';
	// let { data }: PageProps = $props();
	//
	// You don't need this, but if you wanted to confirm data is loaded:
	// onMount(() => {
	//   console.log('Pets loaded: ' + data.pets);
	// });
</script>

<div>
	This page should contain the pets category select.
	<br>
	Remember in SvelteKit, a directory inside /src/routes is a route,
	and the +page.svelte file inside the directory is the route's page component.
</div>

<!-- Example -->
<!-- {#each data.pets as pet}-->
<!-- 	 <div>{pet.name}</div>-->
<!-- {/each}-->