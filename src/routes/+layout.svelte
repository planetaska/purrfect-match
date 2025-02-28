<script lang="ts">
	// For Supabase auth
	import { invalidate } from '$app/navigation'
	import { onMount } from 'svelte'

	// Main CSS file
	import "../app.css";

	import { getFlash } from 'sveltekit-flash-message';
	import { page } from '$app/state';

	import MainNav from '$components/Layout/MainNav.svelte';
	import Flash from '$components/Layout/Flash.svelte';

	/*
		Listen to Auth events
		Set up a listener for Auth events on the client, to handle session refreshes and signouts.
	 */
	let { data, children } = $props()
	let { session, supabase, user, profile } = $derived(data)

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth')
			}
		})

		return () => data.subscription.unsubscribe()
	})

	const flash = getFlash(page);
</script>

<div class="min-h-dvh flex flex-col bg-base-100">
	<MainNav {supabase} {user} {profile} />

	{#if $flash}
		<Flash flash={$flash} />
	{/if}

	{@render children()}
</div>
