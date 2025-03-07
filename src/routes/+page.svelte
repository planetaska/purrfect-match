<script lang="ts">
	import { formatGeneral } from 'cleave-zen'
	import { onMount } from 'svelte';

	let zip_input: HTMLInputElement

	async function getZipCode() {
		return new Promise((resolve) => {
			if ("geolocation" in navigator) {
				navigator.geolocation.getCurrentPosition(async (position) => {
					const { latitude, longitude } = position.coords;
					const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

					const response = await fetch(url);
					const data = await response.json();

					if (data.address && data.address.postcode) {
						resolve(data.address.postcode);
					} else {
						console.log("GPS found, but no ZIP. Falling back to IP...");
						resolve(await getZipFromIP());
					}
				}, async () => {
					console.log("Geolocation failed. Falling back to IP lookup...");
					resolve(await getZipFromIP());
				});
			} else {
				console.log("Geolocation not supported. Falling back to IP lookup...");
				resolve(getZipFromIP());
			}
		});
	}

	async function getZipFromIP() {
		const response = await fetch("http://ip-api.com/json/");
		const data = await response.json();
		return data.zip || "Unknown ZIP";
	}

	async function populateZip(input: HTMLInputElement) {
		input.value = await getZipCode() as string;
	}

	onMount(() => {
		zip_input.addEventListener('input', (e) => {
			zip_input.value = formatGeneral(e.target?.value, {
				blocks: [5],
				numericOnly: true
			})
		})

		populateZip(zip_input)
	});
</script>

<main class="relative flex-grow overflow-hidden">
	<div class="relative isolate">
		<svg class="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-base-content/10 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]" aria-hidden="true">
			<defs>
				<pattern id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
					<path d="M.5 200V.5H200" fill="none" />
				</pattern>
			</defs>
			<svg x="50%" y="-1" class="overflow-visible fill-base-100">
				<path d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z" stroke-width="0" />
			</svg>
			<rect width="100%" height="100%" stroke-width="0" fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)" />
		</svg>
		<div class="absolute top-0 right-0 left-1/2 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48" aria-hidden="true">
			<div class="aspect-801/1036 w-[50.0625rem] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30" style="clip-path: polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)"></div>
		</div>
		<div class="overflow-hidden">
			<div class="mx-auto max-w-7xl px-6 pt-6 pb-12 lg:px-8 sm:pt-4">
				<div class="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
					<div class="relative w-full lg:max-w-xl lg:shrink-0 xl:max-w-2xl">
						<h1 class="text-5xl font-semibold tracking-tight text-pretty text-base-content sm:text-7xl">Because every happy tail begins with the right match.</h1>
						<p class="mt-8 text-lg font-light text-pretty text-base-content sm:max-w-md sm:text-xl/8 lg:max-w-none">
							<span class="font-medium italic">Find your perfect companion, not just any pet.</span>
							<span class="hidden sm:inline">Every pet deserves their perfect human, and every human deserves their perfect pet. At Purrfect Match, we've reimagined pet adoption by focusing on what truly matters – compatibility.</span>
						</p>
						<div class="mt-10 grid grid-cols-1 gap-y-4 sm:grid-cols-3 sm:gap-x-4 sm:justify-between">
							<form action="/pets" class="order-2 sm:order-none sm:col-span-2 flex items-center space-x-4">
								<label class="input">
									<svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
									<input type="search" name="zip" bind:this={zip_input} pattern={`[0-9]{5}`} class="grow" placeholder="Zip code" />
								</label>
								<button type="submit" class="btn btn-secondary py-2">Find near me</button>
							</form>
							<div class="order-1 sm:order-none">
								<a href="/match" class="btn btn-primary">Match for Me</a>
							</div>
						</div>
					</div>
					<div class="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
						<div class="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
							<div class="relative">
								<img src="/images/layout/splash/purr-01.jpg" alt="" class="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg">
								<div class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset"></div>
							</div>
						</div>
						<div class="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
							<div class="relative">
								<img src="/images/layout/splash/purr-02.jpg" alt="" class="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg">
								<div class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset"></div>
							</div>
							<div class="relative">
								<img src="/images/layout/splash/purr-04.jpg" alt="" class="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg">
								<div class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset"></div>
							</div>
						</div>
						<div class="w-44 flex-none space-y-8 pt-32 sm:pt-0">
							<div class="relative">
								<img src="/images/layout/splash/purr-13.jpg" alt="" class="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg">
								<div class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset"></div>
							</div>
							<div class="relative">
								<img src="/images/layout/splash/purr-15.jpg" alt="" class="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg">
								<div class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</main>