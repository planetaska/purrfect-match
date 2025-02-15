<script lang="ts">
	import '../styles.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data;
	// import { props } from '$props';
	// const { data } = props;

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

	let { children } = $props();
	import '../app.css';
</script>

<svelte:head>
	<title>User Management</title>
</svelte:head>

<div class="container" style="padding: 50px 0 100px 0">
	<!-- {@render } -->
</div>

{@render children()}
