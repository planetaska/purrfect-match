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
	<div>
		{#if show_mob_filter}
			<PetsMobFilter {sizes} {ages} {genders} {coats} {envs} {toggleMobFilter} />
		{/if}

		<main>
			<div class="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
				<div class="py-24 text-center">
					<h1 class="text-4xl font-bold tracking-tight text-gray-900">{upperFirst(data.type)} near {data.zip || 'all region'}</h1>
					<p class="mx-auto mt-4 max-w-3xl text-base text-gray-500">You can use the filters to further fine-tune the result!</p>
				</div>

				<!-- Filters -->
				<PetsFilter {sizes} {ages} {genders} {coats} {envs} {toggleMobFilter} />

				<!-- Animals grid -->
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
			</div>
		</main>
	</div>
</div>
