<script lang="ts">
	// Just an example, suppose we have page data loaded from +page.server.ts:
	//
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
</script>

<div class="text-base-900">
	This page should contain a list of pets with selected type and query parameters. e.g
	/pets/dogs?location_near=97211
	<br />
	Notice the dogs in the url is in plural form, this is a convention to represent a list of items.
</div>

<p> Pets located near {data.props.zip}</p>
{#each data.props.animal as pet}
	<div>
		Pet type: {pet.type}, Name: {pet.name}, Breed: {pet.breeds['primary']}, Location: {pet.organization_id}
	</div>
{/each}
