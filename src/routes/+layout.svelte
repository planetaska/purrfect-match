<script lang="ts">
	// Main CSS file
	import "../app.css";

	import MainNav from '$components/Layout/MainNav.svelte';

	let { children } = $props();
</script>

<div class="min-h-dvh flex flex-col">
	<MainNav />

	{@render children()}
</div>
