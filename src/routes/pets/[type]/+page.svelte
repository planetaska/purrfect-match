<script lang="ts">
	import type { PageProps } from './$types';
	import PetsMobFilter from '$components/Ui/PetsMobFilter.svelte';
	import PetsFilter from '$components/Ui/PetsFilter.svelte';
	import Animal from '$components/Ui/Animal.svelte';
	import Petgination from '$components/Ui/Petgination.svelte';
	import { upperFirst } from 'es-toolkit/string'

	let { data }: PageProps = $props();

	const sizes = ["Small", "Medium", "Large", "Extra Large"];
	const ages = ["Baby", "Young", "Adult", "Senior"];
	const genders = ["Male", "Female"];
	const coats = ["Hairless", "Short", "Medium", "Long", "Wire", "Curly"];
	const envs = ["With children", "With cats", "With dogs"];

	let show_mob_filter = $state(false)

	function toggleMobFilter() { show_mob_filter = !show_mob_filter }
</script>

<div class="flex grow bg-base-100">
	<div class="w-full">
		{#if show_mob_filter}
			<PetsMobFilter {sizes} {ages} {genders} {coats} {envs} {toggleMobFilter} />
		{/if}

		<main>
			<div class="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
				<div class="py-10 sm:py-24 text-center">
					<h1 class="text-4xl font-bold tracking-tight text-base-content">{upperFirst(data.type)} near {data.zip || 'all region'}</h1>
					{#if data.animals.length > 0}
					<p class="mx-auto mt-4 max-w-3xl text-base text-gray-500">You can use the filters to further fine-tune the result!</p>
					{/if}
				</div>

				<!-- Animals grid -->
				{#if data.animals.length > 0}
					<!-- Filters -->
					<PetsFilter {sizes} {ages} {genders} {coats} {envs} {toggleMobFilter} />

					<section aria-labelledby="animals-heading" class="mt-8 mb-8">
						<h2 id="animals-heading" class="sr-only">Animals</h2>
	
						<div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
							{#each data.animals as animal}
								<Animal {animal} type={data.type} />
							{/each}
						</div>
					</section>

					<!-- Pagination -->
					<div class="mb-8">
						<Petgination pagi={data.pagination} />
					</div>
				{:else}
					<div class="-mt-8 grid min-h-full grid-cols-1 grid-rows-[1fr_auto_1fr] bg-base-100 lg:grid-cols-[max(50%,36rem)_1fr]">
						<main class="mx-auto w-full max-w-7xl px-6 py-0 sm:py-32 lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:px-8">
							<div class="max-w-lg">
								<p class="hidden sm:inline text-base/8 font-semibold text-indigo-600">404</p>
								<h1 class="mt-4 text-5xl font-semibold tracking-tight text-pretty text-base-content sm:text-6xl">Pet not found</h1>
								<p class="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">Sorry, we couldn’t find the pet you’re looking for.</p>
								<div class="mt-10">
									<a href="/pets" class="text-sm/7 font-semibold text-indigo-600"><span aria-hidden="true">&larr;</span> Back to categories</a>
								</div>
							</div>
						</main>
						<div class="block lg:relative lg:col-start-2 lg:row-start-1 lg:row-end-4 lg:block">
							<img src="/images/layout/cat-404.jpg" alt="" class="sm:absolute sm:inset-0 size-full object-cover">
						</div>
					</div>
				{/if}
			</div>
		</main>
	</div>
</div>
