<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

{data.type}

{#each data.animals as animal}
	<h1>{animal.type}</h1>
	<div>
		<a href="/pets/{data.type}/{animal.id}">{animal.id} {animal.type}</a>
	</div>
{/each}
