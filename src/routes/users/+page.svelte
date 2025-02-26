<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<h1>{data.users.length}</h1>
<!--<div>{@html data.users.content}</div>-->