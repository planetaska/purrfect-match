<script lang="ts">
	import type { PageProps } from './$types';

	import AccountForm from '$components/Form/AccountForm.svelte';
	import PreferencesForm from '$components/Form/PreferencesForm.svelte';

	let { data }: PageProps = $props()
	// let { supabase, user } = $derived(data)
</script>

<main class="px-4">
	<h1 class="sr-only">Account Settings</h1>

	<div class="tabs tabs-border">
		<input type="radio" name="user_tabs" class="tab" aria-label="Account Info" checked />
		<div class="tab-content rounded-md overflow-hidden">
			<AccountForm super_form={data.account_form} />
		</div>

		<input type="radio" name="user_tabs" class="tab" aria-label="Pet Preferences" />
		<div class="tab-content rounded-md overflow-hidden">
			<PreferencesForm />
		</div>
	</div>
</main>
