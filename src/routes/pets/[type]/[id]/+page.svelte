<script lang="ts">
	// Just an example, suppose we have page data loaded from +page.server.ts:
	//
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
</script>

{#if data.props}
	<div> 
		<ul>
			<li>Pet type: {data.props.animal.type} </li>
			<li>ID: {data.props.animal.id} </li>
			<li> Name: {data.props.animal.name}</li>
			<li>Breed: {data.props.animal.breeds['primary']} </li>
			<li>Age: {data.props.animal.age} </li>
			<li>Gender: {data.props.animal.gender}</li>
			<li>Size: {data.props.animal.size}</li>
			<li>Description: {data.props.animal.description}</li>
			<li>Good with children: {data.props.animal.environment['children']}</li>
			<li>Good with dogs: {data.props.animal.environment['dogs']}</li>
			<li>Good with cats: {data.props.animal.environment['cats']}</li>
		</ul>
	</div>
{/if}
