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
</div>

<!-- Example -->
<!-- {#each data.pets as pet}-->
<!-- 	 <div>{pet.name}</div>-->
<!-- {/each}-->