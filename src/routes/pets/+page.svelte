<script lang="ts">
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
</script>

<div >
	{#if data.props}
		{#each data.props.types as pet}
			{#if data.props.zip}
				{#if pet.name == 'Cat'} 
					<div>
						<a href="pets/cat?location={data.props.zip}"> Cat</a>
					</div>
				{/if}
				
				{#if pet.name == 'Dog'}
					<div>
						<a href="pets/dog?location={data.props.zip}"> Dog</a>
					</div>
				{/if}
			{:else}
				{#if pet.name == 'Cat'} 
					<div>
						<a href="pets/cat"> Cat</a>
					</div>
				{/if}
				{#if pet.name == 'Dog'}
					<div>
						<a href="pets/dog"> Dog</a>
					</div>
				{/if}
			{/if}
		{/each}
	{/if}
</div>
