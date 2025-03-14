<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import QuizCard from '$components/Quiz/QuizCard.svelte';

	let { supabase, user } = $props()

	// Using strings instead of boolean to avoid type conversion headaches
	let prefs = $state({
		pet_type: '',
		env_cats: '',
		env_dogs: '',
		env_children: '',
		age: [],
		gender: '',
		size: [],
		coat: '',
	})

	const quizzes = [
		{
			question: "I'd like to adopt a",
			display: 'I\'d like to adopt a',
			answers: ['Cat', 'Dog'],
			multiple: false,
			binds: 'pet_type',
		},
		{
			question: 'Do I currently have cats?',
			display: 'I currently have cats: ',
			answers: ['Yes', 'No'],
			multiple: false,
			binds: 'env_cats',
		},
		{
			question: 'Do I currently have dogs?',
			display: 'I currently have dogs: ',
			answers: ['Yes', 'No'],
			multiple: false,
			binds: 'env_dogs',
		},
		{
			question: 'Do I currently live with children?',
			display: 'I live with children: ',
			answers: ['Yes', 'No'],
			multiple: false,
			binds: 'env_children',
		},
		{
			question: 'My ideal pet is in age range of',
			display: 'My pet is in age range of ',
			answers: ['Baby', 'Young', 'Adult', 'Senior'],
			multiple: true,
			binds: 'age',
		},
		{
			question: 'I would like to adopt a pet that is',
			display: 'I prefer a pet that is ',
			answers: ['Female', 'Male'],
			multiple: false,
			binds: 'gender',
		},
		{
			question: 'I prefer a pet that is',
			display: 'I prefer a pet with size: ',
			answers: ['Small', 'Medium', 'Large', 'XLarge'],
			multiple: true,
			binds: 'size',
		},
		{
			question: 'I would like a pet that has',
			display: 'I prefer a pet with hair: ',
			answers: ['Short hair', 'Medium hair', 'Long hair', 'Wire hair', 'Curly hair'],
			multiple: false,
			binds: 'coat',
		},
	]

	let current_quiz = $state(0);
	const quiz_total = quizzes.length;
	let progress = $derived(Math.round((current_quiz / quiz_total) * 100));
	const cards = $state(Array.from({ length: quiz_total }));
	let form: HTMLFormElement
	let final_card: HTMLDivElement

	onMount(() => {
		cards[0].toggle()
	});

	// async function handleAnswer(selected: string, index: number) {
	async function handleAnswer(index: number) {
		if (current_quiz < quiz_total) {
			cards[current_quiz].toggle()
			current_quiz = index + 1;
			if (current_quiz < quiz_total) cards[current_quiz].toggle()
		}

		if (progress >= 100) {
			// Show the final card
			final_card.classList.remove('hidden')

			// construct the search params
			const searchParams = new URLSearchParams()
			searchParams.set('size', prefs.size.join(',').toLowerCase())
			searchParams.set('age', prefs.age.join(',').toLowerCase())
			searchParams.set('gender', prefs.gender.toLowerCase())
			searchParams.set('coat', prefs.coat.split(' ')[0].toLowerCase())
			searchParams.set('good_with_children', prefs.env_children === 'Yes' ? 'true' : 'false')
			searchParams.set('good_with_dogs', prefs.env_dogs === 'Yes' ? 'true' : 'false')
			searchParams.set('good_with_cats', prefs.env_cats === 'Yes' ? 'true' : 'false')

			const path = `/pets/${prefs.pet_type.toLowerCase()+'s'}?${searchParams.toString()}`

			// Update user profile if user is logged in
			if (user) {
				const { data, error } = await supabase
					.from('prefs')
					.update({
						pet_type: prefs.pet_type,
						size: prefs.size,
						age: prefs.age,
						gender: prefs.gender,
						coat: prefs.coat,
						env_children: prefs.env_children === 'Yes',
						env_dogs: prefs.env_dogs === 'Yes',
						env_cats: prefs.env_cats === 'Yes'
					})
					.eq('id', user?.id)
					.then(response => {
						goto(path)
					})
					// .select()

				if (error) {
					console.error(error)
					// return fail(500, { error })
				}
			}

			// form.submit()
			goto(path)
		}
	}

</script>

<div class="flex flex-col sm:flex-row sm:gap-x-6 w-full justify-center">
	<div class="hidden sm:block order-2 sm:order-1 card bg-base-100 shadow-md">
		<figure class="px-10 pt-10">
			<div
				class="radial-progress bg-primary text-primary-content border-primary border-4"
				style="--value:{progress};" aria-valuenow="{progress}" role="progressbar">
				{progress}%
			</div>
		</figure>
		<div class="card-body text-base-content">
			<h3 class="text-lg font-bold">Your Preferences:</h3>
			<ul class="list-disc ml-5 max-w-md">
				{#each Object.entries(prefs) as [_, value], index}
					<li>
						<p class="font-medium">{quizzes[index].display}</p>
						<div class="block truncate max-w-[180px] font-semibold">
						{#if Array.isArray(value)}
							{value.length > 0 ? value.join(', ') : 'No preference'}
						{:else}
							{value || 'None'}
						{/if}
						</div>
					</li>
				{/each}
			</ul>
		</div>
	</div>

	<div class="order-1 sm:order-2 w-full max-w-lg">
		{#each quizzes as quiz, index}
			<QuizCard {quiz} {index} {handleAnswer} bind:this={cards[index]} bind:selection={prefs[quiz.binds]} />
		{/each}
		<div bind:this={final_card} class="card glass shadow-md hidden">
			<div class="card-body">
				<div class="sm:flex lg:block">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="h-8 w-8 shrink-0 text-primary">
						<path fill="currentColor" d="M480-80q-134 0-227-93t-93-227v-200q0-122 96-201t224-79q128 0 224 79t96 201v520H480Zm0-80h80q-19-25-29.5-55.5T520-280v-42q-10 1-20 1.5t-20 .5q-67 0-129.5-23.5T240-415v15q0 100 70 170t170 70Zm120-120q0 50 35 85t85 35v-255q-26 26-56 44.5T600-340v60ZM440-560q0-66-45-111t-109-48q-22 24-34 54t-12 65q0 89 72.5 144.5T480-400q95 0 167.5-55.5T720-600q0-35-12-65.5T674-720q-64 2-109 48t-45 112h-80Zm-100 0q-17 0-28.5-11.5T300-600q0-17 11.5-28.5T340-640q17 0 28.5 11.5T380-600q0 17-11.5 28.5T340-560Zm280 0q-17 0-28.5-11.5T580-600q0-17 11.5-28.5T620-640q17 0 28.5 11.5T660-600q0 17-11.5 28.5T620-560ZM370-778q34 14 62 37t48 52q20-29 47.5-52t61.5-37q-25-11-52.5-16.5T480-800q-29 0-56.5 5.5T370-778Zm430 618H520h280Zm-320 0q-100 0-170-70t-70-170q0 100 70 170t170 70h80-80Zm120-120q0 50 35 85t85 35q-50 0-85-35t-35-85ZM480-689Z"/>
					</svg>
					<div class="mt-8 sm:mt-0 sm:ml-6 lg:mt-10 lg:ml-0 text-lg">
						All done! Submitting your preferences
						<span class="loading loading-dots loading-xs"></span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<form bind:this={form} action="/pets/{prefs.pet_type.toLowerCase()}" method="post" class="hidden">
	<input type="hidden" name="pet_type" bind:value={prefs.pet_type} />
	<input type="hidden" name="env_cats" bind:value={prefs.env_cats} />
	<input type="hidden" name="env_dogs" bind:value={prefs.env_dogs} />
	<input type="hidden" name="env_children" bind:value={prefs.env_children} />
	<input type="hidden" name="age" bind:value={prefs.age} />
	<input type="hidden" name="gender" bind:value={prefs.gender} />
	<input type="hidden" name="size" bind:value={prefs.size} />
	<input type="hidden" name="coat" bind:value={prefs.coat} />
</form>
