<script lang="ts">
	// Just an example, suppose we have page data loaded from +page.server.ts:
	//
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
	//
	// You don't need this, but if you wanted to confirm data is loaded:
	// onMount(() => {
	// 	console.log('Pets loaded: ' + data.pets);
	// });
</script>

<div >
	<div>
		This page should contain the pets category select.
		<br />
		Remember in SvelteKit, a directory inside /src/routes is a route, and the +page.svelte file inside
		the directory is the route's page component.
	</div>

	<!-- Example -->

	{#each data.props.types as pet}
		<!-- <div>Pet type: {pet.type}, Name: {pet.name}</div> -->
		{#if pet.name == 'Cat' || pet.name == 'Dog'}
			<!-- <div>Pet type: {pet.name}</div> -->

			<form method="POST" action="/pets/type">
				<!-- Passing zip if exists -->
				{#if data.props.zip}
					<input type="hidden" name="zipcode" value={data.props.zip} />
				{/if}
				<input type="hidden" name="type" value={pet.name} />
				<button type="submit">{pet.name}</button>
			</form>
		{/if}
	{/each}
</div>
