<script lang="ts">
	let { zip, updateZip } = $props()

	let editing = $state(false)
	let input: HTMLInputElement

	function handleEditClick(e: MouseEvent) {
		e.preventDefault()
		editing = true
		// this is a JavaScript thing, yup still not resolved in 2025
		// input.focus()
		window.setTimeout(() => input.focus(), 10)
	}

	function handleInput() {
		editing = false
		updateZip(zip)
	}

	function formatZipCode(value: string) {
		const numericValue = value.replace(/[^0-9]/g, '');
		return numericValue.slice(0, 5);
	}

	function handleZipInput(e: Event) {
		const target = e.target as HTMLInputElement;
		zip = formatZipCode(target.value);
	}
</script>

<span class="inline-flex items-center gap-x-1">
	{#if editing}
		<input bind:this={input} bind:value={zip} type="text"
					 onchange={handleInput}
					 oninput={handleZipInput}
					 pattern="[0-9]{5}"
					 class="w-32 border-b !outline-none" />
		<button aria-label="Confirm change location" onclick={handleInput} class="cursor-pointer">
			<svg class="size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
			</svg>
		</button>
		<button aria-label="Cancel change location" onclick={() => editing = false} class="cursor-pointer">
			<svg class="size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
			</svg>
		</button>
	{:else}
		{zip || 'all region'}
		<button aria-label="Change location" onclick={handleEditClick} class="cursor-pointer">
			<svg class="size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
			</svg>
		</button>
	{/if}
</span>