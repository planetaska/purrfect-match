<script lang="ts">
	import QuizCard from '$components/Quiz/QuizCard.svelte';

	let prefs = $state({
		pet_type: '',
		size: [],
		age: [],
		gender: '',
		coat: '',
		env: [],
		env_cats: false,
		env_dogs: false,
		env_children: false,
	})

	const quizzes = [
		{
			question: "I'd like to adopt a",
			answers: ['Cat', 'Dog'],
			multiple: false,
			binds: 'pet_type',
		},
		{
			question: 'I currently have:',
			answers: ['Cat(s)', 'Dog(s)', 'No dogs or cats'],
			multiple: true,
			binds: 'env',
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

</script>

<div class="card bg-white shadow-md">
	<div class="card-body">
		<h3 class="text-lg font-bold">Your Preferences:</h3>
		<ul class="list-disc ml-5">
			{#each Object.entries(prefs) as [key, value]}
				<li>
					<span class="font-medium">{key}:</span>
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

<div class="stack w-full max-w-lg">
	{#each quizzes as quiz}
		<QuizCard {quiz} bind:selected={prefs[quiz.binds]} />
	{/each}
</div>