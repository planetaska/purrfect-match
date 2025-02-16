<script lang="ts">
	import '../styles.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	// Main CSS file
	import '../app.css';

	import MainNav from '$components/Layout/MainNav.svelte';

	let { children } = $props();

	export let data;
	// let data = $props();

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<svelte:head>
	<title>User Management</title>
</svelte:head>

<div class="container" style="padding: 50px 0 100px 0">
	<!-- {@render } -->
</div>

<div class="bg-white">
	<MainNav />

	{@render children()}
</div>
