<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<h1>{data.type} near {data.zip || 'all region'}</h1>
{#each data.animals as animal}
	<div>
		<a href="/pets/{data.type}/{animal.id}">{animal.id} {animal.type}</a>
	</div>
{/each}
