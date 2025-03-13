<script lang="ts">
	import type { PageProps } from './$types';
	import { zip } from '$utils/store'

	let { data }: PageProps = $props();

	$effect(() => {
		$zip = (data.zip) ? data.zip : ''
	})
</script>

<div class="bg-base-100 py-12 sm:py-16">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mx-auto max-w-2xl lg:mx-0">
			<h2 class="text-4xl font-semibold tracking-tight text-pretty text-base-content sm:text-5xl">
				Find a pet
				{#if $zip !== ''}
				<span class="text-sm font-normal tracking-normal">near: {$zip}</span>
				{/if}
			</h2>
			<p class="mt-6 text-lg/8 text-gray-500">Select a category</p>
		</div>
		<ul role="list" class="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
			<li>
				<a href="/pets/cats">
				<img class="aspect-3/2 w-full rounded-2xl object-cover" src="/images/layout/cats/cats-17.jpg" alt="">
				<h3 class="mt-6 text-lg/8 font-semibold tracking-tight text-base-content">Cats</h3>
				<p class="text-base/7 text-gray-600 truncate">Maine Coon, Ragdoll, American Shorthair</p>
				</a>
			</li>

			<li>
				<a href="/pets/dogs">
				<img class="aspect-3/2 w-full rounded-2xl object-cover" src="/images/layout/splash/purr-05.jpg" alt="">
				<h3 class="mt-6 text-lg/8 font-semibold tracking-tight text-base-content">Dogs</h3>
				<p class="text-base/7 text-gray-600 truncate">Golden Retriever, Labrador, German Shepherd</p>
				</a>
			</li>

			<li>
				<a href="/pets/rabbits">
				<img class="aspect-3/2 w-full rounded-2xl object-cover" src="/images/layout/rabbits/rabbits-10.jpg" alt="">
				<h3 class="mt-6 text-lg/8 font-semibold tracking-tight text-base-content">Rabbits</h3>
				<p class="text-base/7 text-gray-600 truncate">Holland Lop, Florida White, Flemish Giant</p>
				</a>
			</li>

			<li>
				<a href="/pets/birds">
				<img class="aspect-3/2 w-full rounded-2xl object-cover" src="/images/layout/birds/birds-01.jpg" alt="">
				<h3 class="mt-6 text-lg/8 font-semibold tracking-tight text-base-content">Birds</h3>
				<p class="text-base/7 text-gray-600 truncate">Parakeet, Canary, Lovebirds</p>
				</a>
			</li>
		</ul>
	</div>
</div>
