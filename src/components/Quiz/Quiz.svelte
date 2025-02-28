<script lang="ts">
	import QuizCard from '$components/Quiz/QuizCard.svelte';

	const quizzes = [
		{
			question: 'What is the capital of France?',
			answers: ['Paris', 'London', 'Berlin'],
		},
		{
			question: 'What is 2 + 2?',
			answers: ['3', '4', '5']
		},
		{
			question: 'Which planet is known as the Red Planet?',
			answers: ['Earth', 'Mars', 'Jupiter']
		},
		{
			question: 'What is the largest mammal in the world?',
			answers: ['Elephant', 'Blue Whale', 'Giraffe']
		}
	]

</script>

<div class="stack w-full max-w-lg">
	{#each quizzes as quiz}
		<QuizCard {quiz} />
	{/each}
</div>