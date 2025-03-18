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
				<div class="sm:col-span-3">
					<label for="full_name" class="block text-sm/6 font-medium text-base-content">Full name</label>
					<div class="mt-2">
						<input type="text" bind:value={$form.full_name}
									 aria-invalid={$errors.full_name ? 'true' : undefined} {...$constraints.full_name}
									 aria-describedby={$errors.full_name ? 'full_name-error' : undefined}
									 name="full_name" id="full_name" autocomplete="given-name" class="input w-full">
						{#if $errors.full_name}<span class="validator-hint" id="full_name-error" aria-live="polite">{$errors.full_name}</span>{/if}
					</div>
				</div>

				<div class="col-span-full">
					<label for="email" class="block text-sm/6 font-medium text-base-content">Email address</label>
					<div class="mt-2">
						<input id="email" bind:value={$form.email}
									 aria-invalid={$errors.email ? 'true' : undefined} {...$constraints.email}
									 aria-describedby={$errors.email ? 'email-error' : undefined}
									 name="email" type="email" autocomplete="email" class="input w-full">
						{#if $errors.email}<span class="validator-hint" id="email-error" aria-live="polite">{$errors.email}</span>{/if}
					</div>
				</div>

				<div class="sm:col-span-3">
					<label for="password" class="block text-sm/6 font-medium text-base-content">New password</label>
					<div class="mt-2">
						<input id="password" bind:value={$form.password}
									 aria-invalid={$errors.password ? 'true' : undefined} {...$constraints.password}
									 aria-describedby={$errors.password ? 'password-error' : undefined}
									 name="password" type="password" autocomplete="new-password" class="input w-full">
						{#if $errors.password}<span class="validator-hint" id="password-error" aria-live="polite">{$errors.password}</span>{/if}
					</div>
				</div>

				<div class="sm:col-span-3">
					<label for="password_confirm" class="block text-sm/6 font-medium text-base-content">Confirm password</label>
					<div class="mt-2">
						<input id="password_confirm" bind:value={$form.password_confirm}
									 aria-invalid={$errors.password_confirm ? 'true' : undefined} {...$constraints.password_confirm}
									 aria-describedby={$errors.password_confirm ? 'password_confirm-error' : undefined}
									 name="password_confirm" type="password" autocomplete="new-password" class="input w-full">
						{#if $errors.password_confirm}<span class="validator-hint" id="password_confirm-error" aria-live="polite">{$errors.password_confirm}</span>{/if}
					</div>
				</div>

				<div class="sm:col-start-1 sm:col-span-3">
					<label for="location" class="block text-sm/6 font-medium text-base-content">Location</label>
					<div class="mt-2">
						<input type="text" bind:value={$form.location}
									 aria-invalid={$errors.location ? 'true' : undefined} {...$constraints.location}
									 aria-describedby={$errors.location ? 'location-error' : undefined}
									 name="location" id="location" autocomplete="postal-code" class="input w-full">
						{#if $errors.location}<span class="validator-hint" id="location-error" aria-live="polite">{$errors.location}</span>{/if}
					</div>
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

	<div class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
		<div>
			<h2 class="text-base/7 font-semibold text-base-content">Delete account</h2>
			<p class="mt-1 text-sm/6 text-base-content">No longer want to use our service? You can delete your account here. This action is not reversible. All information related to this account will be deleted permanently.</p>
		</div>

		<form method="POST" action="?/quit" class="flex items-start md:col-span-2">
			<button type="submit" class="btn btn-secondary">Yes, delete my account</button>
		</form>
	</div>
</div>