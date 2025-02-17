<script lang="ts">
	// For Supabase auth
	import { invalidate } from '$app/navigation'
	import { onMount } from 'svelte'

	// Main CSS file
	import "../app.css";

	import MainNav from '$components/Layout/MainNav.svelte';

	/*
		Listen to Auth events
		Set up a listener for Auth events on the client, to handle session refreshes and signouts.
	 */
	let { data, children } = $props()
	let { session, supabase, user } = $derived(data)

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth')
			}
		})

		return () => data.subscription.unsubscribe()
	})
</script>

<div class="min-h-dvh flex flex-col">
	<MainNav {supabase} {user} />

	{@render children()}
</div>
