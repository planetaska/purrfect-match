<script lang="ts">
	import type { PageProps } from './$types';
	import AddFavorite from '$components/Ui/AddFavorite.svelte';
	import { unescape } from 'es-toolkit/string'

	let { data }: PageProps = $props()
	let { supabase, user } = $derived(data)

	const animal = $derived(data.animal)
	const cover_photo = $derived.by(() => {
		return animal.photos.length > 0 ? animal.photos[0].large : `/images/layout/placeholder/${data.type}.png`
	})
	const env_desc = $derived.by(() => {
		const experiences = [];
		if (animal.environment.children) experiences.push("children");
		if (animal.environment.dogs) experiences.push("other dogs");
		if (animal.environment.cats) experiences.push("other cats");

		if (experiences.length === 0) {
			return "Have never lived with children, dogs, or cats.";
		} else {
			return `Have experience living with ${experiences.join(" and ")}.`;
		}
	})

	let modal: HTMLDialogElement

	export function getPetVariation(attributeType: string, petData: string = '') {
		const variations = {
			coatLength: {
				answers: [
					`My ${petData} fur is one of my best features! What do you think?`,
					`I'm sporting a ${petData} coat that's totally my style!`,
					`Did you notice my ${petData} fur? It's part of what makes me unique!`,
					`I come with ${petData} fur - perfect for my personality!`,
					`Guess what? I have ${petData} fur that's waiting for some love!`
				]
			},
			houseTrained: {
				answers: [
					`${petData} to house-training! Every pet learns at their own pace.`,
					`House-trained? ${petData} - but I'm always ready to learn new things!`,
					`The house-training situation: ${petData}. With the right routine, we'll figure it out!`,
					`Am I house-trained? ${petData}. Each day is a new opportunity!`,
					`House-training status: ${petData}. Patience and consistency work wonders!`
				]
			},
			health: {
				answers: [
					`I'm looking forward to a healthy life!`,
					`Taking care of these basics is important!`,
					`Regular vet visits keep me happy!`,
					`A healthy pet is a happy pet!`,
					`Small steps for a big, healthy future together!`
				]
			},
			env: {
				answers: [
					`Every introduction is a new adventure!`,
					`I'm excited to meet my new family!`,
					`Let's see who becomes my new best friend!`,
					`New friends are always welcome in my world!`,
					`Every friendship starts somewhere!`
				]
			}
		};

		// Get the right category
		const category = variations[attributeType] || {};
		const options = category.answers;

		// Return a random variation or empty string if invalid
		if (!options || options.length === 0) return '';
		const randomIndex = Math.floor(Math.random() * options.length);
		return options[randomIndex];
	}

</script>

<div class="bg-base-100">
	<div class="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8">
		<div class="pb-4">
			<button onclick={() => history.back()} tabindex="0" class="link link-info link-hover">
				&larr; Back to list
			</button>
		</div>
		<div class="grid grid-cols-1 items-start gap-x-8 gap-y-16 lg:grid-cols-2">
			<div>
				<div class="border-b border-gray-200 pb-4">
					<h2 class="font-medium text-gray-500">
						{animal.breeds.primary}
						{#if animal.contact.address.city}
							in {animal.contact.address.city}
						{/if}
					</h2>
					<p class="mt-2 text-3xl font-bold tracking-tight text-base-content sm:text-4xl">{animal.name}</p>
					<div class="text-base-content">
						is a
						<ul class="inline-flex space-x-2">
							<li>{animal.age}</li>
							<li>{animal.gender}</li>
							<li>{animal.size}</li>
							{#if animal.color}
							<li>{animal.color}</li>
							{/if}
							{#if animal.coat}
							<li>{animal.coat} Haired</li>
							{/if}
						</ul>
						{animal.type}
					</div>
				</div>
				<div class="mt-6 space-y-6 border-b border-gray-200 pb-4">
					<div class="sm:hidden flex justify-between items-end">
						<h3 class="text-base-content text-xl">
							Hear something about {animal.name} from {animal.gender === 'Male' ? 'himself' : 'herself'}:
						</h3>
						<img src={cover_photo} alt="" class="mask mask-squircle aspect-square w-1/3 rounded-lg bg-gray-100 object-cover">
					</div>
					<h3 class="hidden sm:block text-base-content text-xl">
						Hear something about {animal.name} from {animal.gender === 'Male' ? 'himself' : 'herself'}:
					</h3>
					<div class="sm:pl-12 py-6 flex flex-col gap-y-6">
						{#if animal.tags.length > 0}
						<div>
							<div class="chat chat-start">
								<div class="chat-bubble chat-bubble-primary">What are your main <b>characteristics</b>?</div>
							</div>
							<div class="chat chat-end">
								<div class="chat-bubble chat-bubble-info max-w-xs">{animal.tags.join(', ')}</div>
							</div>
						</div>
						{/if}

						{#if animal.coat !== null}
						<div>
							<div class="chat chat-start">
								<div class="chat-bubble chat-bubble-primary">What type of <b>coat</b> do you have?</div>
							</div>
							<div class="chat chat-end">
								<div class="chat-bubble chat-bubble-info max-w-xs">
									{getPetVariation('coatLength', animal.coat)}
								</div>
							</div>
						</div>
						{/if}

						<div>
							<div class="chat chat-start">
								<div class="chat-bubble chat-bubble-primary">Are you <b>house-trained</b>?</div>
							</div>
							<div class="chat chat-end">
								<div class="chat-bubble chat-bubble-info max-w-xs">
									{getPetVariation('houseTrained', animal.attributes.house_trained ? 'Yes' : 'No')}
								</div>
							</div>
						</div>

						<div>
							<div class="chat chat-start">
								<div class="chat-bubble chat-bubble-primary">What's your current <b>health status</b>?</div>
							</div>
							<div class="chat chat-end">
								<div class="chat-bubble chat-bubble-info">
									{animal.attributes.shots_current ? 'Vaccinations up to date.' : 'Need vaccinations.'} <br>
									{animal.attributes.spayed_neutered ? 'Spayed and neutered.' : 'Not spayed or neutered.'} <br>
									{getPetVariation('health')}
								</div>
							</div>
						</div>

						<div>
							<div class="chat chat-start">
								<div class="chat-bubble chat-bubble-primary">What's your experience with <b>children and other pets</b>?</div>
							</div>
							<div class="chat chat-end">
								<div class="chat-bubble chat-bubble-info max-w-xs">
									{env_desc} <br>
									{getPetVariation('env')}
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="mt-6 space-y-6">
					<h3 class="text-base-content text-xl">
						Meet {animal.name}
					</h3>
					<div>
						{animal.description ? unescape(animal.description) : ''}
						<p class="mt-3">
							<a href={animal.url} target="_blank" tabindex="0" class="link link-primary">Read more on PetFinder.com</a>
						</p>
					</div>
				</div>
			</div>

			<div class="relative">
				{#if user}
					<div class="absolute top-4 right-4 z-10">
						<AddFavorite {supabase} {animal} {user}/>
					</div>
				{/if}
				<button onclick={() => modal.showModal()}>
					<img src={cover_photo} alt="" class="mask mask-squircle cursor-pointer aspect-square w-full rounded-lg bg-gray-100 object-cover">
				</button>
				<div class="mt-4 grid grid-cols-2 gap-4 sm:mt-6 sm:gap-6 lg:mt-8 lg:gap-8">
					{#each animal.photos.slice(1) as photo}
						<button onclick={() => modal.showModal()}>
							<img src={photo.large} alt="" class="mask mask-squircle cursor-pointer aspect-square w-full rounded-lg bg-gray-100 object-cover">
						</button>
					{/each}
					{#each animal.videos as video}
						<div class="av col-span-2 sm:col-span-1 min-h-64 rounded-lg overflow-hidden bg-gray-100">
							{@html video.embed}
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>

<dialog bind:this={modal} id="my_modal_2" class="modal">
	<div class="modal-box w-11/12 max-w-5xl">
		<div class="carousel carousel-center rounded-box">
			{#each animal.photos as photo}
			<div class="carousel-item w-full">
				<img src={photo.large} class="h-full w-full object-cover" alt="" />
			</div>
			{/each}
			{#each animal.videos as video}
				<div class="carousel-item w-full av">
					{@html video.embed}
				</div>
			{/each}
		</div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>