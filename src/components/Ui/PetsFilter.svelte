<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import type { SuperForm } from 'sveltekit-superforms';
	import type { FilterSchema } from '$lib/schemas';

	let {
		sizes, ages, genders, coats, envs, toggleMobFilter, form
	} = $props<{
		sizes: string[];
		ages: string[];
		genders: string[];
		coats: string[];
		envs: string[];
		toggleMobFilter: () => void;
		form: SuperForm<FilterSchema>;
	}>();

	const { form: filterForm } = superForm(form);

	let filter_form:HTMLFormElement;

	function menuClose() {
		// Trigger form submission on menu close
		filter_form.requestSubmit();
	}
</script>

<section aria-labelledby="filter-heading" class="border-t border-gray-200 pt-6">
	<h2 id="filter-heading" class="sr-only">Search filters</h2>

	<form bind:this={filter_form} method="get" class="flex items-center justify-between">
		<div class="relative inline-block text-left">
			<div class="dropdown">
				<div tabindex="0" role="button" class="group inline-flex justify-center text-sm font-medium text-base-content hover:text-gray-400">
					Sort
					<svg class="-mr-1 ml-1 size-5 shrink-0 text-gray-500 group-hover:text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
						<path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
					</svg>
				</div>
				<ul tabindex="-1" onblur={menuClose} class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
					<li>
						<label>
							<input type="radio" name="sort" value="recent" class="radio" bind:group={$filterForm.sort} checked={$filterForm.sort === 'recent'} />
							Most Recent
						</label>
					</li>
					<li>
						<label>
							<input type="radio" name="sort" value="-recent" class="radio" bind:group={$filterForm.sort} checked={$filterForm.sort === '-recent'} />
							Oldest Top
						</label>
					</li>
					<li>
						<label>
							<input type="radio" name="sort" value="distance" class="radio" bind:group={$filterForm.sort} checked={$filterForm.sort === 'distance'} />
							Nearest to me
						</label>
					</li>
					<li>
						<label>
							<input type="radio" name="sort" value="-distance" class="radio" bind:group={$filterForm.sort} checked={$filterForm.sort === '-distance'} />
							Farthest from me
						</label>
					</li>
					<li>
						<label>
							<input type="radio" name="sort" value="random" class="radio" bind:group={$filterForm.sort} checked={$filterForm.sort === 'random'} />
							Random
						</label>
					</li>
				</ul>
			</div>
		</div>

		<!-- Mobile filter dialog toggle, controls the 'mobileFilterDialogOpen' state. -->
		<button type="button" onclick={toggleMobFilter}
						class="inline-block text-sm font-medium text-base-content hover:text-gray-400 sm:hidden">Filters</button>

		<div class="hidden sm:flex sm:items-baseline sm:space-x-8">
			<div class="dropdown dropdown-center">
				<div tabindex="0" role="button" class="group inline-flex justify-center text-sm font-medium text-base-content hover:text-gray-400">
					Size
					<svg class="-mr-1 ml-1 size-5 shrink-0 text-gray-500 group-hover:text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
						<path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
					</svg>
				</div>
				<ul tabindex="-1" onblur={menuClose} class="dropdown-content mt-2 menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
					{#each sizes as size}
						<li>
							<label>
								<input type="checkbox" name="size" value="{size.toLowerCase()}" class="checkbox" 
									checked={$filterForm.size?.includes(size.toLowerCase())} />
								{size}
							</label>
						</li>
					{/each}
				</ul>
			</div>

			<div class="dropdown dropdown-center">
				<div tabindex="0" role="button" class="group inline-flex justify-center text-sm font-medium text-base-content hover:text-gray-400">
					Age
					<svg class="-mr-1 ml-1 size-5 shrink-0 text-gray-500 group-hover:text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
						<path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
					</svg>
				</div>
				<ul tabindex="-1" onblur={menuClose} class="dropdown-content mt-2 menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
					{#each ages as age}
						<li>
							<label>
								<input type="checkbox" name="age" value="{age.toLowerCase()}" class="checkbox"
									checked={$filterForm.age?.includes(age.toLowerCase())} />
								{age}
							</label>
						</li>
					{/each}
				</ul>
			</div>

			<div class="dropdown dropdown-center">
				<div tabindex="0" role="button" class="group inline-flex justify-center text-sm font-medium text-base-content hover:text-gray-400">
					Gender
					<svg class="-mr-1 ml-1 size-5 shrink-0 text-gray-500 group-hover:text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
						<path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
					</svg>
				</div>
				<ul tabindex="-1" onblur={menuClose} class="dropdown-content mt-2 menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
					{#each genders as gender}
						<li>
							<label>
								<input type="checkbox" name="gender" value="{gender.toLowerCase()}" class="checkbox"
									checked={$filterForm.gender?.includes(gender.toLowerCase())} />
								{gender}
							</label>
						</li>
					{/each}
				</ul>
			</div>

			<div class="dropdown dropdown-center">
				<div tabindex="0" role="button" class="group inline-flex justify-center text-sm font-medium text-base-content hover:text-gray-400">
					Coat
					<svg class="-mr-1 ml-1 size-5 shrink-0 text-gray-500 group-hover:text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
						<path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
					</svg>
				</div>
				<ul tabindex="-1" onblur={menuClose} class="dropdown-content mt-2 menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
					{#each coats as coat}
						<li>
							<label>
								<input type="checkbox" name="coat" value="{coat.toLowerCase()}" class="checkbox"
									checked={$filterForm.coat?.includes(coat.toLowerCase())} />
								{coat}
							</label>
						</li>
					{/each}
				</ul>
			</div>

			<div class="dropdown dropdown-end">
				<div tabindex="0" role="button" class="group inline-flex justify-center text-sm font-medium text-base-content hover:text-gray-400">
					Environment
					<svg class="-mr-1 ml-1 size-5 shrink-0 text-gray-500 group-hover:text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
						<path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
					</svg>
				</div>
				<ul tabindex="-1" onblur={menuClose} class="dropdown-content mt-2 menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
					{#each envs as env}
						{#if env === "Good with children"}
							<li>
								<label>
									<input type="checkbox" name="env_children" value="true" class="checkbox"
										checked={$filterForm.env_children} />
									{env}
								</label>
							</li>
						{:else if env === "Good with cats"}
							<li>
								<label>
									<input type="checkbox" name="env_cats" value="true" class="checkbox"
										checked={$filterForm.env_cats} />
									{env}
								</label>
							</li>
						{:else if env === "Good with dogs"}
							<li>
								<label>
									<input type="checkbox" name="env_dogs" value="true" class="checkbox"
										checked={$filterForm.env_dogs} />
									{env}
								</label>
							</li>
						{/if}
					{/each}
				</ul>
			</div>

		</div>
	</form>
</section>