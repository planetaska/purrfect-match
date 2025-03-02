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
					<fieldset class="fieldset p-4 bg-base-100 border border-base-300 rounded-box w-64">
						<legend class="fieldset-legend text-sm/6">Size</legend>
						{#each size_options as size}
						<label class="fieldset-label text-sm/6 text-base-content">
							<input type="checkbox" bind:group={$form.size} name="size" value="{size}" class="checkbox" />
							{size}
						</label>
						{/each}
					</fieldset>
				</div>

				<div class="sm:col-span-3">
					<fieldset class="fieldset p-4 bg-base-100 border border-base-300 rounded-box w-64">
						<legend class="fieldset-legend text-sm/6">Age</legend>
						{#each age_options as age}
							<label class="fieldset-label text-sm/6 text-base-content">
								<input type="checkbox" bind:group={$form.age} name="age" value="{age}" class="checkbox" />
								{age}
							</label>
						{/each}
					</fieldset>
				</div>

				<div class="sm:col-span-3">
					<label for="gender" class="block text-sm/6 font-medium text-baes-content">Gender</label>
					<div class="mt-2">
						<select name="gender" id="gender" bind:value={$form.gender} class="select">
							<option value="">No preference</option>
							<option>Male</option>
							<option>Female</option>
						</select>
					</div>
				</div>

				<div class="sm:col-span-3">
					<label for="coat" class="block text-sm/6 font-medium text-baes-content">Coat</label>
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
					<label for="env_children" class="block text-sm/6 font-medium text-baes-content">Children in environment?</label>
					<input type="checkbox" bind:checked={$form.env_children} name="env_children" id="env_children" class="checkbox checkbox-primary" />
				</div>

				<div class="sm:col-span-3 sm:col-start-1 flex items-center justify-between">
					<label for="env_dogs" class="block text-sm/6 font-medium text-baes-content">Dogs in environment?</label>
					<input type="checkbox" bind:checked={$form.env_dogs} name="env_dogs" id="env_dogs" class="checkbox checkbox-primary" />
				</div>

				<div class="sm:col-span-3 sm:col-start-1 flex items-center justify-between">
					<label for="env_cats" class="block text-sm/6 font-medium text-baes-content">Cats in environment?</label>
					<input type="checkbox" bind:checked={$form.cats} name="env_cats" id="env_cats" class="checkbox checkbox-primary" />
				</div>
			</div>

			<div class="mt-8 flex gap-x-4 items-center">
				<button type="submit" class="btn btn-primary">Save</button>
				{#if $delayed}
					<span class="loading loading-spinner loading-sm text-primary"></span>
				{/if}
				{#if $message}<span class="text-success">{$message}</span>{/if}
			</div>
		</form>
	</div>
</div>