<script lang="ts">
	// Just an example, suppose we have page data loaded from +page.server.ts:
	//
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
</script>

{#if data.animal}
	<div> 
		<ul>
			<li>Pet type: {data.animal.type} </li>
			<li>ID: {data.animal.id} </li>
			<li> Name: {data.animal.name}</li>
			<li>Breed: {data.animal.breeds['primary']} </li>
			<li>Age: {data.animal.age} </li>
			<li>Gender: {data.animal.gender}</li>
			<li>Size: {data.animal.size}</li>
			<li>Description: {data.animal.description}</li>
			<li>Good with children: {data.animal.environment['children']}</li>
			<li>Good with dogs: {data.animal.environment['dogs']}</li>
			<li>Good with cats: {data.animal.environment['cats']}</li>
		</ul>
	</div>
{/if}
