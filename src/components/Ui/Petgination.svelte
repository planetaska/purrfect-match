<script lang="ts">
	import type { PageProps } from './$types'
	import { page } from '$app/state'

	let { pagi }: PageProps = $props()
	const params = $derived.by(() => {
		let pams = page.url.searchParams
		pams.delete('page')
		return pams.toString()
	})

	const prev_link = $derived(pagi.current_page > 1 ? `${page.url.pathname}?${params}&page=${pagi.current_page - 1}` : '')
	const next_link = $derived(pagi.current_page < pagi.total_pages ? `${page.url.pathname}?${params}&page=${pagi.current_page + 1}` : '')

	interface PaginationInfo {
		count_per_page: number;
		total_count: number;
		current_page: number;
		total_pages: number;
	}

	type PaginationItem = number | '...';

	function getPaginationIndexes(
		pagi: PaginationInfo,
		adjacentCount: number = 2,
		edgeCount: number = 2
	): PaginationItem[] {
		const { current_page, total_pages } = pagi;

		// Validate inputs
		if (!current_page || !total_pages || current_page < 1 || total_pages < 1) {
			return [];
		}

		// Create a Set to avoid duplicates
		const indexes = new Set<number>();

		// Add edge pages (beginning)
		for (let i = 1; i <= Math.min(edgeCount, total_pages); i++) {
			indexes.add(i);
		}

		// Add pages around current page
		const rangeStart = Math.max(1, current_page - adjacentCount);
		const rangeEnd = Math.min(total_pages, current_page + adjacentCount);

		for (let i = rangeStart; i <= rangeEnd; i++) {
			indexes.add(i);
		}

		// Add edge pages (end)
		for (let i = Math.max(1, total_pages - edgeCount + 1); i <= total_pages; i++) {
			indexes.add(i);
		}

		// Convert to array and sort
		const result = [...indexes].sort((a, b) => a - b);

		// Add ellipses where needed
		const final: PaginationItem[] = [];
		let prev = 0;

		for (const index of result) {
			if (index - prev > 1) {
				final.push('...');
			}
			final.push(index);
			prev = index;
		}

		return final;
	}

	const pagi_links = $derived.by(() => {
		return getPaginationIndexes(pagi)
	})

	// const pagi_link_class = "inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
	// const pagi_active_class = ""
</script>

<nav class="flex items-center justify-between border-t border-base-300 px-4 sm:px-0">
	<div class="-mt-px flex w-0 flex-1">
		<a href={prev_link} class="inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
			<svg class="mr-3 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
				<path fill-rule="evenodd" d="M18 10a.75.75 0 0 1-.75.75H4.66l2.1 1.95a.75.75 0 1 1-1.02 1.1l-3.5-3.25a.75.75 0 0 1 0-1.1l3.5-3.25a.75.75 0 1 1 1.02 1.1l-2.1 1.95h12.59A.75.75 0 0 1 18 10Z" clip-rule="evenodd" />
			</svg>
			Previous
		</a>
	</div>
	<div class="hidden md:-mt-px md:flex">
		{#each pagi_links as link}
			{#if link === '...'}
				<span class="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500">...</span>
			{:else if link === pagi.current_page}
				<a href={`${page.url.pathname}?${params}&page=${link}`}
					 class="inline-flex items-center border-t-2 border-indigo-500 px-4 pt-4 text-sm font-medium text-indigo-600">{link}</a>
			{:else}
				<a href={`${page.url.pathname}?${params}&page=${link}`}
					 class="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">{link}</a>
			{/if}
		{/each}
	</div>
	<div class="-mt-px flex w-0 flex-1 justify-end">
		<a href={next_link} class="inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
			Next
			<svg class="ml-3 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
				<path fill-rule="evenodd" d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z" clip-rule="evenodd" />
			</svg>
		</a>
	</div>
</nav>
