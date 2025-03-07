<script lang="ts">
	import type { PageProps } from './$types';
	import { zip } from '$utils/store'

	let { data }: PageProps = $props();

	$effect(() => {
		$zip = (data.zip) ? data.zip : ''
	})
</script>

<div>
	<h1>Pets</h1>
	<p>Location: {data.zip || 'Any'}</p>
	<a href="/pets/cats">Cats</a>
	<a href="/pets/dogs">Dogs</a>
	<a href="/pets/rabbits">Rabbits</a>
	<a href="/pets/birds">Birds</a>
</div>
