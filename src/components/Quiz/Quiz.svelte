<script lang="ts">
	import QuizCard from '$components/Quiz/QuizCard.svelte';

	let { supabase, user } = $props()

	let prefs = $state({
		pet_type: '',
		env_cats: false,
		env_dogs: false,
		env_children: false,
		age: [],
		gender: '',
		size: [],
		coat: '',
	})

	const quizzes = [
		{
			question: "I'd like to adopt a",
			answers: ['Cat', 'Dog'],
			multiple: false,
			binds: 'pet_type',
		},
		{
			question: 'Do I currently have cats?',
			answers: ['Yes', 'No'],
			multiple: false,
			binds: 'env_cats',
		},
		{
			question: 'Do I currently have dogs?',
			answers: ['Yes', 'No'],
			multiple: false,
			binds: 'env_dogs',
		},
		{
			question: 'Do I currently live with children?',
			answers: ['Yes', 'No'],
			multiple: false,
			binds: 'env_children',
		},
		{
			question: 'My ideal pet is in age range of:',
			answers: ['Baby', 'Young', 'Adult', 'Senior', 'No preference'],
			multiple: true,
			binds: 'age',
		},
		{
			question: 'I would like to adopt a pet that is:',
			answers: ['Female', 'Male', 'No preference'],
			multiple: false,
			binds: 'gender',
		},
		{
			question: 'I prefer a pet that is',
			answers: ['Small (0-6 lbs)', 'Medium (7-11 lbs)', 'Large (12+ lbs)', 'Extra Large (18+ lbs)', 'No preference'],
			multiple: true,
			binds: 'size',
		},
		{
			question: 'I would like a pet that has',
			answers: ['Short hair', 'Medium hair', 'Long hair', 'Wire hair', 'Curly hair', 'No preference'],
			multiple: true,
			binds: 'coat',
		},
	]

	let current_quiz = $state(0);
	const quiz_total = quizzes.length;
	let progress = $derived(Math.round((current_quiz / quiz_total) * 100));
	const cards = $state(Array.from({ length: quiz_total }));
	let form: HTMLFormElement

	async function handleAnswer(selected: string, index: number) {
		if (current_quiz < quiz_total) current_quiz = index + 1;
		if (progress >= 100) {
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
						env_children: prefs.env_children,
						env_dogs: prefs.env_dogs,
						env_cats: prefs.env_cats
					})
					.eq('id', user?.id)
					// .select()

				if (error) {
					console.error(error)
					// return fail(500, { error })
				}
			}

			form.submit()
		}
	}

</script>

<div class="flex flex-col sm:flex-row w-full justify-center">
	<div class="order-2 sm:order-1 card bg-base-100 shadow-md">
		<figure class="px-10 pt-10">
			<div
				class="radial-progress bg-primary text-primary-content border-primary border-4"
				style="--value:{progress};" aria-valuenow="{progress}" role="progressbar">
				{progress}%
			</div>
		</figure>
		<div class="card-body text-base-content">
			<h3 class="text-lg font-bold">Your Preferences:</h3>
			<ul class="list-disc ml-5">
				{#each Object.entries(prefs) as [_, value], index}
					<li>
						<span class="font-medium">{quizzes[index].question}:</span>
						{#if Array.isArray(value)}
							{value.length > 0 ? value.join(', ') : 'None'}
						{:else if (typeof value === 'boolean')}
							{value ? 'Yes' : 'No'}
						{:else}
							{value || 'None'}
						{/if}
					</li>
				{/each}
			</ul>
		</div>
	</div>

	<div class="order-1 sm:order-2 stack w-full max-w-lg">
		{#each quizzes as quiz, index}
			<QuizCard {quiz} {index} {handleAnswer} bind:this={cards[index]} bind:selected={prefs[quiz.binds]} />
		{/each}
	</div>
</div>

<form bind:this={form} action="/pets/{prefs.pet_type}" method="post" class="hidden">
	<input type="hidden" name="pet_type" bind:value={prefs.pet_type} />
	<input type="hidden" name="env_cats" bind:value={prefs.env_cats} />
	<input type="hidden" name="env_dogs" bind:value={prefs.env_dogs} />
	<input type="hidden" name="env_children" bind:value={prefs.env_children} />
	<input type="hidden" name="age" bind:value={prefs.age} />
	<input type="hidden" name="gender" bind:value={prefs.gender} />
	<input type="hidden" name="size" bind:value={prefs.size} />
	<input type="hidden" name="coat" bind:value={prefs.coat} />
</form>
