<script lang="ts">
	import { blur } from 'svelte/transition'

	let { supabase, user } = $props();
	let showMobileMenu = $state(false)
	let is_dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

	function toggleMobileMenu() { showMobileMenu = !showMobileMenu }
	function toggleTheme() {
		is_dark = !is_dark
		if (is_dark) {
			document.documentElement.classList.add('dark')
		} else {
			document.documentElement.classList.remove('dark')
		}
	}

	// handles users sign out through Supabase
	const signOut = async () => {
		const { error } = await supabase.auth.signOut()
		if (error) {
			console.error(error)
		}
	}
</script>

<header class="sticky inset-x-0 top-0 z-50 bg-white dark:bg-gray-950 glass">
	<nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
		<div class="flex lg:flex-1">
			<a href="/" class="-m-1.5 p-1.5 text-blue-300 flex items-center gap-x-2">
				<span class="sr-only">Purrfect Match</span>
				<svg class="h-8 w-8">
					<use xlink:href="/images/layout/logo.svg#purr_logo"></use>
				</svg>
				<span class="text-blue-400">Purrfect Match</span>
			</a>
		</div>
		<div class="flex lg:hidden">
			<button onclick={ toggleMobileMenu } type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
				<span class="sr-only">Open main menu</span>
				<svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
					<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
				</svg>
			</button>
		</div>
		<div class="hidden lg:flex lg:gap-x-12">
			<a href="#" class="text-sm/6 font-semibold text-gray-900">Match for Me</a>
			<a href="#" class="text-sm/6 font-semibold text-gray-900">Find Pet</a>
			<a href="#" class="text-sm/6 font-semibold text-gray-900">My Favorites</a>
			<a href="#" class="text-sm/6 font-semibold text-gray-900">About</a>
		</div>
		<div class="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-8 lg:items-center">
			<div>
				<label class="swap swap-rotate">
					<!-- this hidden checkbox controls the state -->
					<input type="checkbox" class="theme-controller" value="dark" onchange={toggleTheme} />

					<!-- sun icon -->
					<svg
						class="swap-off w-8 h-8 fill-current"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24">
						<path
							d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
					</svg>

					<!-- moon icon -->
					<svg
						class="swap-on w-8 h-8 fill-current"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24">
						<path
							d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
					</svg>
				</label>
			</div>
			{#if user}
				<a href={`/users/${user.id}`} class="text-sm/6 font-semibold text-gray-900">My profile</a>
				<button onclick={signOut} class="cursor-pointer text-sm/6 font-semibold text-gray-900">Sign out</button>
			{:else}
				<a href="/register" class="text-sm/6 font-semibold text-gray-900">Register</a>
				<a href="/sign-in" class="text-sm/6 font-semibold text-gray-900">Sign in <span aria-hidden="true">&rarr;</span></a>
			{/if}
		</div>
	</nav>
	<!-- Mobile menu, show/hide based on menu open state. -->
	{#if showMobileMenu}
	<div class="lg:hidden" transition:blur={{duration: 300 }} role="dialog" aria-modal="true">
		<!-- Background backdrop, show/hide based on slide-over state. -->
		<div class="fixed inset-0 z-50"></div>
		<div class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
			<div class="flex items-center justify-between">
				<a href="/" class="-m-1.5 p-1.5">
					<span class="sr-only">Purrfect Match</span>
					<img class="h-8 w-auto" src="/images/layout/logo.svg" alt="">
				</a>
				<button onclick={ toggleMobileMenu } type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700">
					<span class="sr-only">Close menu</span>
					<svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
			<div class="mt-6 flow-root">
				<div class="-my-6 divide-y divide-gray-500/10">
					<div class="space-y-2 py-6">
						<a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Match for Me</a>
						<a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Find Pet</a>
						<a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">My Favorites</a>
						<a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">About</a>
					</div>
					<div class="py-6">
						{#if user}
							<a href={`/users/${user.id}`} class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">My profile</a>
							<button onclick={signOut} class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Sign out</button>
						{:else}
							<a href="/register" class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Register</a>
							<a href="/sign-in" class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Sign in</a>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
	{/if}
</header>
