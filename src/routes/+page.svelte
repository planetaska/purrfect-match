<!-- src/routes/+page.svelte -->
<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, SubmitFunction } from './$types.js';

	export let form: ActionData;

	let loading = false;

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			update();
			loading = false;
		};
	};
</script>

<svelte:head>
	<title>User Management</title>
</svelte:head>

<form class="row flex flex-center" method="POST" use:enhance={handleSubmit}>
	<div class="col-6 form-widget">
		<h1 class="header">Supabase + SvelteKit</h1>
		<p class="description">Sign in via magic link with your email below</p>
		{#if form?.message !== undefined}
			<div class="success {form?.success ? '' : 'fail'}">
				{form?.message}
			</div>
		{/if}
		<div>
			<label for="email">Email address</label>
			<input
				id="email"
				name="email"
				class="inputField"
				type="email"
				placeholder="Your email"
				value={form?.email ?? ''}
			/>
		</div>
		{#if form?.errors?.email}
			<span class="flex items-center text-sm error">
				{form?.errors?.email}
			</span>
		{/if}
		<div>
			<button class="button primary block">
				{loading ? 'Loading' : 'Send magic link'}
			</button>
		</div>
	</div>
</form>

<!-- <div class="hero bg-base-200 min-h-screen">
	<div class="hero-content text-center">
		<div class="max-w-md">
			<h1 class="text-5xl font-bold">Hello there</h1>
			<p class="py-6">
				Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
				quasi. In deleniti eaque aut repudiandae et a id nisi.
			</p>
			<button class="btn btn-primary">Get Started</button>
		</div>
	</div>
</div> -->
