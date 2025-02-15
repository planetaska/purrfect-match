<script lang="ts">
	// Main CSS file
	import "../app.css";

	import MainNav from '$components/Layout/MainNav.svelte';

	let { children } = $props();
</script>

<div class="bg-white">
	<MainNav />

	{@render children()}
</div>
