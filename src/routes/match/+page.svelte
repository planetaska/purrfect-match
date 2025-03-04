<script lang="ts">
	import Quiz from '$components/Quiz/Quiz.svelte';

	let { data } = $props()
	let { supabase, user } = $derived(data)
</script>

<div class="relative overflow-hidden bg-base-100">
	<!-- Decorative background image and gradient -->
	<div aria-hidden="true" class="absolute inset-0">
		<div class="absolute inset-0 mx-auto max-w-7xl overflow-hidden xl:px-8">
			<img src="/images/layout/splash/purr-10.jpg" alt="" class="size-full object-cover">
		</div>
		<div class="absolute inset-0 bg-white/35"></div>
		<div class="absolute inset-0 bg-linear-to-t from-base-100 via-base-100"></div>
	</div>

	<!-- Callout -->
	<section aria-labelledby="callout-heading" class="relative mx-auto flex max-w-7xl flex-col items-center px-4 pt-16 text-center sm:px-6 lg:px-8">
		<div class="mx-auto max-w-2xl lg:max-w-none">
			<h2 id="sale-heading" class="text-4xl font-bold tracking-tight text-base-content sm:text-5xl lg:text-6xl">Let's find the purrfect match for you!</h2>
			<p class="mx-auto mt-4 max-w-xl text-xl text-base-content">Tell us about yourself</p>
		</div>
	</section>

	<!-- Questionnaires -->
	<section aria-labelledby="questionnaires" class="relative mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 lg:py-8">
		<div class="mx-auto max-w-2xl lg:max-w-none">
			<div class="mt-16 space-y-16 flex justify-center">
				<Quiz {supabase} {user} />
			</div>
		</div>
	</section>
</div>
