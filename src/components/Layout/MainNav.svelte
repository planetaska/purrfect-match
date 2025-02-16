<script lang="ts">
	import { blur } from 'svelte/transition'

	let showMobileMenu = $state(false)

	function toggleMobileMenu() { showMobileMenu = !showMobileMenu }
</script>

<header class="sticky inset-x-0 top-0 z-50 bg-white glass">
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
		<div class="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-8">
			<a href="/register" class="text-sm/6 font-semibold text-gray-900">Register</a>
			<a href="/sign-in" class="text-sm/6 font-semibold text-gray-900">Sign in <span aria-hidden="true">&rarr;</span></a>
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
						<a href="#" class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Register</a>
						<a href="#" class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Sign in</a>
					</div>
				</div>
			</div>
		</div>
	</div>
	{/if}
</header>
