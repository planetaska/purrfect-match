<script lang="ts">
	import { superForm } from 'sveltekit-superforms';

	const { data } = $props()
	const { form, message, enhance, delayed } = superForm(data, {
		invalidateAll: false,
		resetForm: false,
	});

	const size_options = ['Small', 'Medium', 'Large', 'Extra Large']
	const age_options = ['Baby', 'Young', 'Adult', 'Senior']
	const coat_options = ['Hairless', 'Short', 'Medium', 'Long', 'Wire', 'Curly']

</script>

<!-- User preferences forms -->
<div class="divide-y divide-base-content/8 bg-base-200">
	<div class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
		<div>
			<h2 class="text-base/7 font-semibold text-base-content">Pet Preferences</h2>
			<p class="mt-1 text-sm/6 text-base-content">
				You can update your pet preferences here, or by taking our <a href="/match" class="link link-primary">Match for Me</a> questionnaires!
			</p>
		</div>

		<form method="POST" action="?/prefs" class="md:col-span-2" use:enhance>
			<div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
				<div class="sm:col-span-3">
					<fieldset class="fieldset p-4 bg-base-100 border border-base-300 rounded-box w-64" aria-labelledby="size-legend">
						<legend id="size-legend" class="fieldset-legend text-sm/6">Size</legend>
						{#each size_options as size, i}
						<div class="flex items-center gap-2">
							<input type="checkbox" id="size-{i}" bind:group={$form.size} name="size" value="{size}" class="checkbox" aria-labelledby="size-legend size-label-{i}" />
							<label id="size-label-{i}" for="size-{i}" class="fieldset-label text-sm/6 text-base-content">{size}</label>
						</div>
						{/each}
					</fieldset>
				</div>

				<div class="sm:col-span-3">
					<fieldset class="fieldset p-4 bg-base-100 border border-base-300 rounded-box w-64" aria-labelledby="age-legend">
						<legend id="age-legend" class="fieldset-legend text-sm/6">Age</legend>
						{#each age_options as age, i}
							<div class="flex items-center gap-2">
								<input type="checkbox" id="age-{i}" bind:group={$form.age} name="age" value="{age}" class="checkbox" aria-labelledby="age-legend age-label-{i}" />
								<label id="age-label-{i}" for="age-{i}" class="fieldset-label text-sm/6 text-base-content">{age}</label>
							</div>
						{/each}
					</fieldset>
				</div>

				<div class="sm:col-span-3">
					<label for="gender" class="block text-sm/6 font-medium text-base-content">Gender</label>
					<div class="mt-2">
						<select name="gender" id="gender" bind:value={$form.gender} class="select">
							<option value="">No preference</option>
							<option>Male</option>
							<option>Female</option>
						</select>
					</div>
				</div>

				<div class="sm:col-span-3">
					<label for="coat" class="block text-sm/6 font-medium text-base-content">Coat</label>
					<div class="mt-2">
						<select name="coat" id="coat" bind:value={$form.coat} class="select">
							<option value="">No preference</option>
							{#each coat_options as coat}
								<option>{coat}</option>
							{/each}
						</select>
					</div>
				</div>

				<div class="sm:col-span-3 sm:col-start-1 flex items-center justify-between">
					<label for="env_children" class="block text-sm/6 font-medium text-base-content">Children in environment?</label>
					<input type="checkbox" bind:checked={$form.env_children} name="env_children" id="env_children" class="checkbox checkbox-primary" aria-label="Children in environment" />
				</div>

				<div class="sm:col-span-3 sm:col-start-1 flex items-center justify-between">
					<label for="env_dogs" class="block text-sm/6 font-medium text-base-content">Dogs in environment?</label>
					<input type="checkbox" bind:checked={$form.env_dogs} name="env_dogs" id="env_dogs" class="checkbox checkbox-primary" aria-label="Dogs in environment" />
				</div>

				<div class="sm:col-span-3 sm:col-start-1 flex items-center justify-between">
					<label for="env_cats" class="block text-sm/6 font-medium text-base-content">Cats in environment?</label>
					<input type="checkbox" bind:checked={$form.env_cats} name="env_cats" id="env_cats" class="checkbox checkbox-primary" aria-label="Cats in environment" />
				</div>
			</div>

			<div class="mt-8 flex gap-x-4 items-center">
				<button type="submit" class="btn btn-primary">Save</button>
				{#if $delayed}
					<span class="loading loading-spinner loading-sm text-primary" aria-label="Loading"></span>
				{/if}
				{#if $message}<span class="text-success" aria-live="polite">{$message}</span>{/if}
			</div>
		</form>
	</div>
</div>