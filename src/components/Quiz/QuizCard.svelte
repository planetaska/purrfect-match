<script lang="ts">
	import { scale, fly } from 'svelte/transition';
	let { quiz, index, handleAnswer, selection = $bindable() } = $props()
	let hidden = $state(true)

	export function toggle() {
		hidden = !hidden
	}

	function passAnswer() {
		handleAnswer(index)
		// hidden = true
	}
</script>

{#if !hidden}
<div class="absolute left-0 sm:left-auto w-full max-w-md card glass shadow-md" in:scale={{duration: 200}} out:fly={{ x: -200, duration: 600 }}>
	<div class="card-body">
		<div class="sm:flex lg:block">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="h-8 w-8 shrink-0 text-primary">
				<path fill="currentColor" d="M480-80q-134 0-227-93t-93-227v-200q0-122 96-201t224-79q128 0 224 79t96 201v520H480Zm0-80h80q-19-25-29.5-55.5T520-280v-42q-10 1-20 1.5t-20 .5q-67 0-129.5-23.5T240-415v15q0 100 70 170t170 70Zm120-120q0 50 35 85t85 35v-255q-26 26-56 44.5T600-340v60ZM440-560q0-66-45-111t-109-48q-22 24-34 54t-12 65q0 89 72.5 144.5T480-400q95 0 167.5-55.5T720-600q0-35-12-65.5T674-720q-64 2-109 48t-45 112h-80Zm-100 0q-17 0-28.5-11.5T300-600q0-17 11.5-28.5T340-640q17 0 28.5 11.5T380-600q0 17-11.5 28.5T340-560Zm280 0q-17 0-28.5-11.5T580-600q0-17 11.5-28.5T620-640q17 0 28.5 11.5T660-600q0 17-11.5 28.5T620-560ZM370-778q34 14 62 37t48 52q20-29 47.5-52t61.5-37q-25-11-52.5-16.5T480-800q-29 0-56.5 5.5T370-778Zm430 618H520h280Zm-320 0q-100 0-170-70t-70-170q0 100 70 170t170 70h80-80Zm120-120q0 50 35 85t85 35q-50 0-85-35t-35-85ZM480-689Z"/>
			</svg>
			<div class="mt-8 sm:mt-0 sm:ml-6 lg:mt-10 lg:ml-0">
				<p class="text-lg text-base-content">{quiz.question}</p>
				<div class="mt-4 text-base font-semibold text-base-content space-y-2">
					{#each quiz.answers as answer, idx}
						{#if quiz.multiple}
							<div class="flex items-center gap-x-2">
								<input type="checkbox"
											 bind:group={selection} value={answer} tabindex="0"
											 id="option-{index}-{idx}" name="answer-{index}" class="checkbox checkbox-primary" />
								<label for="option-{index}-{idx}">{answer}</label>
							</div>
						{:else}
							<div class="flex items-center gap-x-2">
								<input type="radio" tabindex="0"
											 bind:group={selection} value={answer} onclick={() => setTimeout(passAnswer, 200)}
											 id="option-{index}-{idx}" name="answer-{index}" class="radio radio-primary" />
								<label for="option-{index}-{idx}">{answer}</label>
							</div>
						{/if}
					{/each}
					{#if quiz.multiple}
						<button onclick={passAnswer} class="btn btn-primary mt-6" tabindex="0">{selection.length === 0 ? 'No preference' : 'Next'}</button>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
{/if}