<script lang="ts">
	import { superForm } from 'sveltekit-superforms';

	const { data } = $props()

	const { form, errors, constraints, message, enhance, delayed } = superForm(data, {
		invalidateAll: false,
		resetForm: false,
	});
</script>

<!-- User account info forms -->
<div class="divide-y divide-base-content/8 bg-base-200">
	<div class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
		<div>
			<h2 class="text-base/7 font-semibold text-base-content">Personal Information</h2>
			<p class="mt-1 text-sm/6 text-base-content">These information will not be shared with others, and we do not intend to collect your personal information for other purposes.</p>
		</div>

		<form method="POST" action="?/account" class="md:col-span-2" use:enhance>
			<div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
				<!-- Saved for later if we decided to add user avatars -->
				<!--						<div class="col-span-full flex items-center gap-x-8">-->
				<!--							<img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="size-24 flex-none rounded-lg bg-gray-800 object-cover">-->
				<!--							<div>-->
				<!--								<button type="button" class="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-baes-content shadow-xs hover:bg-white/20">Change avatar</button>-->
				<!--								<p class="mt-2 text-xs/5 text-baes-content">JPG, GIF or PNG. 1MB max.</p>-->
				<!--							</div>-->
				<!--						</div>-->

				<div class="sm:col-span-3">
					<label for="first-name" class="block text-sm/6 font-medium text-baes-content">Full name</label>
					<div class="mt-2">
						<input type="text" bind:value={$form.full_name}
									 aria-invalid={$errors.full_name ? 'true' : undefined} {...$constraints.full_name}
									 name="full_name" id="full_name" autocomplete="given-name" class="input w-full">
						{#if $errors.full_name}<span class="validator-hint">{$errors.full_name}</span>{/if}
					</div>
				</div>

				<div class="col-span-full">
					<label for="email" class="block text-sm/6 font-medium text-baes-content">Email address</label>
					<div class="mt-2">
						<input id="email" bind:value={$form.email}
									 aria-invalid={$errors.email ? 'true' : undefined} {...$constraints.email}
									 name="email" type="email" autocomplete="email" class="input w-full">
						{#if $errors.email}<span class="validator-hint">{$errors.email}</span>{/if}
					</div>
				</div>

				<div class="sm:col-span-3">
					<label for="password" class="block text-sm/6 font-medium text-baes-content">New password</label>
					<div class="mt-2">
						<input id="password" bind:value={$form.password}
									 aria-invalid={$errors.password ? 'true' : undefined} {...$constraints.password}
									 name="password" type="password" autocomplete="new-password" class="input w-full">
						{#if $errors.password}<span class="validator-hint">{$errors.password}</span>{/if}
					</div>
				</div>

				<div class="sm:col-span-3">
					<label for="confirm-password" class="block text-sm/6 font-medium text-baes-content">Confirm password</label>
					<div class="mt-2">
						<input id="password_confirm" bind:value={$form.password_confirm}
									 aria-invalid={$errors.password_confirm ? 'true' : undefined} {...$constraints.password_confirm}
									 name="password_confirm" type="password" autocomplete="new-password" class="input w-full">
						{#if $errors.password_confirm}<span class="validator-hint">{$errors.password_confirm}</span>{/if}
					</div>
				</div>

				<div class="sm:col-start-1 sm:col-span-3">
					<label for="first-name" class="block text-sm/6 font-medium text-baes-content">Location</label>
					<div class="mt-2">
						<input type="text" bind:value={$form.location}
									 aria-invalid={$errors.location ? 'true' : undefined} {...$constraints.location}
									 name="location" id="location" autocomplete="postal-code" class="input w-full">
						{#if $errors.location}<span class="validator-hint">{$errors.location}</span>{/if}
					</div>
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

	<div class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
		<div>
			<h2 class="text-base/7 font-semibold text-baes-content">Delete account</h2>
			<p class="mt-1 text-sm/6 text-baes-content">No longer want to use our service? You can delete your account here. This action is not reversible. All information related to this account will be deleted permanently.</p>
		</div>

		<form method="POST" action="?/quit" class="flex items-start md:col-span-2">
			<button type="submit" class="btn btn-secondary">Yes, delete my account</button>
		</form>
	</div>
</div>