<script lang="ts">
	// Just an example, suppose we have page data loaded from +page.server.ts:
	//
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
</script>

<div>
	This page should contain the info for a certain pet with supplied id. e.g /pets/dogs/123
	<br />
	123 is the id of the dog.
</div>

{#each data.props.animal as pet}
	<div>
		Pet type: {pet.type}, Name: {pet.name}, Breed: {pet.breeds['primary']}, Location: {pet.organization_id}
	</div>
{/each}
