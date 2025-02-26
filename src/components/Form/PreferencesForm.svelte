<script lang="ts">
	import { superForm } from 'sveltekit-superforms';

	const { data } = $props()
	const { form, message, enhance, delayed } = superForm(data, {
		invalidateAll: false,
		resetForm: false,
	});
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
					<label for="size" class="block text-sm/6 font-medium text-baes-content">Size</label>
					<div class="mt-2">
						<select name="size" id="size" bind:value={$form.size} class="select">
							<option></option>
							<option>Small</option>
							<option>Medium</option>
							<option>Large</option>
							<option>Extra Large</option>
						</select>
					</div>
				</div>

				<div class="sm:col-span-3">
					<label for="age" class="block text-sm/6 font-medium text-baes-content">Age</label>
					<div class="mt-2">
						<select name="age" id="age" bind:value={$form.age} class="select">
							<option>Kitten</option>
							<option>Young</option>
							<option>Adult</option>
							<option>Senior</option>
						</select>
					</div>
				</div>

				<div class="sm:col-span-3">
					<label for="gender" class="block text-sm/6 font-medium text-baes-content">Gender</label>
					<div class="mt-2">
						<select name="gender" id="gender" bind:value={$form.gender} class="select">
							<option>Male</option>
							<option>Female</option>
						</select>
					</div>
				</div>

				<div class="sm:col-span-3">
					<label for="coat" class="block text-sm/6 font-medium text-baes-content">Coat</label>
					<div class="mt-2">
						<select name="coat" id="coat" bind:value={$form.coat} class="select">
							<option>Hairless</option>
							<option>Short</option>
							<option>Medium</option>
							<option>Long</option>
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