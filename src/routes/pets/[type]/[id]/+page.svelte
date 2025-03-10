<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div>
	Pet type: {data.animal.type}, ID: {data.animal.id}, Name: {data.animal.name},
	Breed: {data.animal.breeds['primary']}
</div>
<button onclick={() => history.back()}>Back</button>