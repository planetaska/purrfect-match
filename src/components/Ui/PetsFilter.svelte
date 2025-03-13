<script lang="ts">
	import type { PageProps } from './$types';
	// import { onMount } from 'svelte';
	import { snakeCase } from 'es-toolkit';

	let {
		sizes, ages, genders, coats, envs, toggleMobFilter
	}: PageProps = $props();

	let form: HTMLFormElement

	function submitForm() {
		form.requestSubmit()
	}

	function menuClose() {
		console.log('close')
		form.requestSubmit()
	}

	// onMount(() => {
	// 	// document.querySelectorAll('input[type="radio"][name="sort"]').forEach(el => {
	// 	// 	el.addEventListener('change', submitForm)
	// 	// })
	// })
</script>

<section aria-labelledby="filter-heading" class="border-t border-gray-200 pt-6">
	<h2 id="filter-heading" class="sr-only">Search filters</h2>

	<form bind:this={form} method="get" class="flex items-center justify-between">
		<div class="relative inline-block text-left">
			<div class="dropdown">
				<div tabindex="0" role="button" class="group inline-flex justify-center text-sm font-medium text-base-content hover:text-gray-400">
					Sort
					<svg class="-mr-1 ml-1 size-5 shrink-0 text-gray-500 group-hover:text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
						<path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
					</svg>
				</div>
				<ul tabindex="-1" onblur={submitForm} class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
					<li>
						<label>
							<input type="radio" name="sort" value="recent" class="radio" checked />
							Most Recent
						</label>
					</li>
					<li>
						<label>
							<input type="radio" name="sort" value="-recent" class="radio" />
							Oldest Top
						</label>
					</li>
					<li>
						<label>
							<input type="radio" name="sort" value="distance" class="radio" />
							Nearest to me
						</label>
					</li>
					<li>
						<label>
							<input type="radio" name="sort" value="-distance" class="radio" />
							Farthest from me
						</label>
					</li>
					<li>
						<label>
							<input type="radio" name="sort" value="random" class="radio" />
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
								<input type="checkbox" name="size" value="{size.toLowerCase()}" class="checkbox" />
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
								<input type="checkbox" name="age" value="{age.toLowerCase()}" class="checkbox" />
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
								<input type="checkbox" name="gender" value="{gender.toLowerCase()}" class="checkbox" />
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
								<input type="checkbox" name="coat" value="{coat.toLowerCase()}" class="checkbox" />
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
						<li>
							<label>
								<input type="checkbox" name={snakeCase(env)} value="true" class="checkbox" />
								{env}
							</label>
						</li>
					{/each}
				</ul>
			</div>

		</div>
	</form>
</section>