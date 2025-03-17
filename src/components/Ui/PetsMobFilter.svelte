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

	let filter_form: HTMLFormElement;

	function submitForm() {
		filter_form.requestSubmit();
		toggleMobFilter();
	}
</script>

<!--
	Mobile filter dialog
	Off-canvas menu for mobile, show/hide based on off-canvas menu state.
-->
<div class="relative z-40 sm:hidden" role="dialog" aria-modal="true">
	<!--
		Off-canvas menu backdrop, show/hide based on off-canvas menu state.
	-->
	<div class="fixed inset-0 bg-black/25" aria-hidden="true"></div>

	<div class="fixed inset-0 mt-[80px] z-40 flex">
		<!--
			Off-canvas menu, show/hide based on off-canvas menu state.
		-->
		<div class="relative ml-auto flex size-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
			<div class="flex items-center justify-between px-4">
				<h2 class="text-lg font-medium text-gray-900">Filters</h2>
				<button type="button" onclick={submitForm}
								class="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden">
					<span class="sr-only">Close menu</span>
					<svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			<!-- Filters -->
			<form bind:this={filter_form} method="get" class="mt-4">
				<!-- Hidden input for sort -->
				<input type="hidden" name="sort" value={$filterForm.sort} />
				
				<div class="border-t border-gray-200 px-4 py-6">
					<h3 class="-mx-2 -my-3 flow-root">
						<button type="button" class="flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400" aria-controls="filter-section-0" aria-expanded="false">
							<span class="font-medium text-gray-900">Size</span>
						</button>
					</h3>
					<div class="pt-6" id="filter-section-0">
						<div class="space-y-6">
							{#each sizes as size}
								<div>
									<label class="flex items-center gap-x-3 text-sm text-gray-500">
										<input type="checkbox" name="size" value="{size.toLowerCase()}" class="checkbox"
											checked={$filterForm.size?.includes(size.toLowerCase())} />
										{size}
									</label>
								</div>
							{/each}
						</div>
					</div>
				</div>
				<div class="border-t border-gray-200 px-4 py-6">
					<h3 class="-mx-2 -my-3 flow-root">
						<button type="button" class="flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400" aria-controls="filter-section-0" aria-expanded="false">
							<span class="font-medium text-gray-900">Age</span>
						</button>
					</h3>
					<div class="pt-6" id="filter-section-0">
						<div class="space-y-6">
							{#each ages as age}
								<div>
									<label class="flex items-center gap-x-3 text-sm text-gray-500">
										<input type="checkbox" name="age" value="{age.toLowerCase()}" class="checkbox"
											checked={$filterForm.age?.includes(age.toLowerCase())} />
										{age}
									</label>
								</div>
							{/each}
						</div>
					</div>
				</div>
				<div class="border-t border-gray-200 px-4 py-6">
					<h3 class="-mx-2 -my-3 flow-root">
						<button type="button" class="flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400" aria-controls="filter-section-0" aria-expanded="false">
							<span class="font-medium text-gray-900">Gender</span>
						</button>
					</h3>
					<div class="pt-6" id="filter-section-0">
						<div class="space-y-6">
							{#each genders as gender}
								<div>
									<label class="flex items-center gap-x-3 text-sm text-gray-500">
										<input type="checkbox" name="gender" value="{gender.toLowerCase()}" class="checkbox"
											checked={$filterForm.gender?.includes(gender.toLowerCase())} />
										{gender}
									</label>
								</div>
							{/each}
						</div>
					</div>
				</div>
				<div class="border-t border-gray-200 px-4 py-6">
					<h3 class="-mx-2 -my-3 flow-root">
						<button type="button" class="flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400" aria-controls="filter-section-0" aria-expanded="false">
							<span class="font-medium text-gray-900">Coat</span>
						</button>
					</h3>
					<div class="pt-6" id="filter-section-0">
						<div class="space-y-6">
							{#each coats as coat}
								<div>
									<label class="flex items-center gap-x-3 text-sm text-gray-500">
										<input type="checkbox" name="coat" value="{coat.toLowerCase()}" class="checkbox"
											checked={$filterForm.coat?.includes(coat.toLowerCase())} />
										{coat}
									</label>
								</div>
							{/each}
						</div>
					</div>
				</div>
				<div class="border-t border-gray-200 px-4 py-6">
					<h3 class="-mx-2 -my-3 flow-root">
						<button type="button" class="flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400" aria-controls="filter-section-0" aria-expanded="false">
							<span class="font-medium text-gray-900">Environment</span>
						</button>
					</h3>
					<div class="pt-6" id="filter-section-0">
						<div class="space-y-6">
							{#each envs as env}
								{#if env === "Good with children"}
									<div>
										<label class="flex items-center gap-x-3 text-sm text-gray-500">
											<input type="checkbox" name="env_children" value="true" class="checkbox"
												checked={$filterForm.env_children} />
											{env}
										</label>
									</div>
								{:else if env === "Good with cats"}
									<div>
										<label class="flex items-center gap-x-3 text-sm text-gray-500">
											<input type="checkbox" name="env_cats" value="true" class="checkbox"
												checked={$filterForm.env_cats} />
											{env}
										</label>
									</div>
								{:else if env === "Good with dogs"}
									<div>
										<label class="flex items-center gap-x-3 text-sm text-gray-500">
											<input type="checkbox" name="env_dogs" value="true" class="checkbox"
												checked={$filterForm.env_dogs} />
											{env}
										</label>
									</div>
								{/if}
							{/each}
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>