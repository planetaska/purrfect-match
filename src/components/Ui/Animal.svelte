<script lang="ts">
	import type { PageProps } from './$types';

	let { animal, type }: PageProps = $props();
	const link = $derived(`/pets/${type}/${animal.id}`);
	const photo = $derived.by(() => {
		return animal.photos.length > 0 ? animal.photos[0].large : `/images/layout/placeholder/${type}.png`
	})
</script>

<a href={link} class="group">
	<img src={photo} alt="" class="aspect-square w-full rounded-lg object-cover group-hover:opacity-75 sm:aspect-2/3">
	<div class="mt-4 flex items-start justify-between text-base font-medium text-base-content">
		<h3>{animal.name}</h3>
		<p>{animal.breeds.primary}</p>
	</div>
	<p class="mt-1 text-sm text-gray-500 italic">{animal.colors.primary}</p>
</a>