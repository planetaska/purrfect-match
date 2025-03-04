<script lang="ts">
	// Just an example, suppose we have page data loaded from +page.server.ts:
	//
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
</script>

{#if data.props}
	{#if data.props.zip}
		<p> Pets located near {data.props.zip}</p>
	{/if}

	{#each data.props.animal as pet}
		<div>
			Pet type: {pet.type}, Name: {pet.name}, Breed: {pet.breeds['primary']}, Location: {pet.organization_id}
		</div>
	{/each}
{/if}
