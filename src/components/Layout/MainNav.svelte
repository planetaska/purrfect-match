<script lang="ts">
	import { blur } from 'svelte/transition'
	import DarkToggle from '$components/Ui/DarkToggle.svelte'
	import { navigating } from '$app/state'
	// import { onMount } from 'svelte';

	let { supabase, user, profile } = $props();
	let showMobileMenu = $state(false)
	// let is_dark = false
	//
	// onMount(() => {
	// 	is_dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
	// });

	// Close mobile menu when navigating
	$effect(() => {
		if (navigating.to) showMobileMenu = false
	})

	function toggleMobileMenu() { showMobileMenu = !showMobileMenu }

	// Turns out we don't need Tailwind's dark mode and can use Daisy's colors
	//function toggleTheme() {
		// is_dark = !is_dark
		// if (is_dark) {
		// 	document.documentElement.classList.add('dark')
		// } else {
		// 	document.documentElement.classList.remove('dark')
		// }
	//}

	// handles users sign out through Supabase
	const signOut = async () => {
		const { error } = await supabase.auth.signOut()
		if (error) {
			console.error(error)
		}
	}
</script>

<header class="sticky bg-base-100 inset-x-0 top-0 z-50">
	<nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
		<div class="flex lg:flex-1">
			<a href="/" class="-m-1.5 p-1.5 text-blue-400 flex items-center gap-x-2">
				<span class="sr-only">Purrfect Match</span>
				<svg class="h-8 w-8">
					<use xlink:href="/images/layout/logo.svg#purr_logo"></use>
				</svg>
				<span class="text-blue-400">Purrfect Match</span>
			</a>
		</div>
		<div class="flex gap-x-6 lg:hidden">
			<div>
				<DarkToggle />
			</div>
			<button onclick={ toggleMobileMenu } type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-base-content">
				<span class="sr-only">Open main menu</span>
				<svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
					<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
				</svg>
			</button>
		</div>
		<div class="hidden lg:flex lg:gap-x-12">
			<a href="/match" class="text-sm/6 font-semibold text-base-content">Match for Me</a>
			<a href="/pets" class="text-sm/6 font-semibold text-base-content">Find Pet</a>
			{#if user}
			<a href={`/users/${user.id}/favorites`} class="text-sm/6 font-semibold text-base-content">My Favorites</a>
			{/if}
			<a href="/about" class="text-sm/6 font-semibold text-base-content">About</a>
		</div>
		<div class="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-8 lg:items-center">
			<div>
				<DarkToggle />
			</div>
			{#if user}
				<div class="dropdown dropdown-end">
					<div tabindex="0" role="button" class="avatar avatar-placeholder cursor-pointer">
						<div class="bg-neutral text-neutral-content w-8 rounded-full">
							<span class="text-xs">{profile.full_name.slice(0,1)}</span>
						</div>
					</div>
					<ul tabindex="-1" class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
						<li><a href={`/users/${user.id}`}>My profile</a></li>
						<li><button onclick={signOut}>Sign out</button></li>
					</ul>
				</div>
<!--				<details class="dropdown dropdown-end">-->
<!--					<summary class="inline-flex cursor-pointer size-6 items-center justify-center rounded-full bg-neutral text-neutral-content">-->
<!--						<span class="text-xs font-medium text-white">{profile.full_name.slice(0,1)}</span>-->
<!--					</summary>-->
<!--					<ul class="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">-->
<!--						<li><a href={`/users/${user.id}`}>My profile</a></li>-->
<!--						<li><button onclick={signOut}>Sign out</button></li>-->
<!--					</ul>-->
<!--				</details>-->
			{:else}
				<a href="/register" class="text-sm/6 font-semibold text-base-content">Register</a>
				<a href="/sign-in" class="text-sm/6 font-semibold text-base-content">Sign in <span aria-hidden="true">&rarr;</span></a>
			{/if}
		</div>
	</nav>
	<!-- Mobile menu, show/hide based on menu open state. -->
	{#if showMobileMenu}
	<div class="lg:hidden" transition:blur={{duration: 300 }} role="dialog" aria-modal="true">
		<!-- Background backdrop, show/hide based on slide-over state. -->
		<div class="fixed inset-0 z-50"></div>
		<div class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-base-100 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
			<div class="flex items-center justify-between">
				<a href="/" class="-m-1.5 p-1.5 text-blue-400">
					<span class="sr-only">Purrfect Match</span>
					<svg class="h-8 w-8">
						<use xlink:href="/images/layout/logo.svg#purr_logo"></use>
					</svg>
				</a>
				<button onclick={ toggleMobileMenu } type="button" class="-m-2.5 rounded-md p-2.5 text-base-content">
					<span class="sr-only">Close menu</span>
					<svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
			<div class="mt-6 flow-root">
				<div class="-my-6 divide-y divide-gray-500/10">
					<div class="space-y-2 py-6">
						<a href="/match" class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-base-content hover:bg-base-300">Match for Me</a>
						<a href="/pets" class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-base-content hover:bg-base-300">Find Pet</a>
						{#if user}
						<a href={`/users/${user.id}/favorites`} class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-base-content hover:bg-base-300">My Favorites</a>
						{/if}
						<a href="/about" class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-base-content hover:bg-base-300">About</a>
					</div>
					<div class="py-6">
						{#if user}
							<a href={`/users/${user.id}`} class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-base-content hover:bg-base-300">My profile</a>
							<button onclick={signOut} class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-base-content hover:bg-base-300">Sign out</button>
						{:else}
							<a href="/register" class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-base-content hover:bg-base-300">Register</a>
							<a href="/sign-in" class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-base-content hover:bg-base-300">Sign in</a>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
	{/if}
</header>
