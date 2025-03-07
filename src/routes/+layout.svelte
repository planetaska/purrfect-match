<script lang="ts">
	// For Supabase auth
	import { invalidate } from '$app/navigation'
	import { onMount } from 'svelte'

	// Main CSS file
	import "../app.css";

	import { getFlash } from 'sveltekit-flash-message';
	import { page, navigating } from '$app/state';

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

	// Handle flash messages
	const flash = getFlash(page);

	// Handle loading status
	const SHOW_LOADING_DELAY_MS = 300
	let showLoadingRef: ReturnType<typeof setTimeout>
	let showLoading = $state(false)

	$effect(() => {
		// Navigation changed, skip any existing wait for showing an indicator.
		clearTimeout(showLoadingRef)
		if (navigating.complete == null) {
			// Navigation completed, hide loading indicator now.
			showLoading = false
		} else {
			// Navigation in progress, show loading indicator in a bit.
			showLoadingRef = setTimeout(() => {
				showLoading = true
			}, SHOW_LOADING_DELAY_MS)
		}
	})
</script>

<div class="min-h-dvh flex flex-col bg-base-100">
	<MainNav {supabase} {user} {profile} />

	{#if $flash}
		<Flash flash={$flash} />
	{/if}

	{@render children()}

	{#if showLoading}
		<p>Loading... <span class="loading loading-spinner text-secondary"></span></p>
	{/if}
</div>
