<script lang="ts">
	import { page } from '$app/state';
	// const message = page.url.searchParams.get('message')
</script>

<div class="flex grow">
	<div class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
		<div class="mx-auto w-full max-w-sm lg:w-96">
			<div>
				<svg class="h-10 w-10 text-blue-400">
					<use xlink:href="/images/layout/logo.svg#purr_logo"></use>
				</svg>
				<h2 class="mt-8 text-2xl/9 font-bold tracking-tight text-base-content">Sign in to your account</h2>
				<p class="mt-2 text-sm/6 text-base-content">
					Not a member?
					<a href="/register" class="link link-primary font-semibold">Join today!</a>
				</p>
			</div>

			<div class="mt-10">
				<div>
					<form action="/auth?/sign_in" method="POST" class="space-y-4">
						<div>
							<label for="email" class="block text-sm/6 font-medium text-base-content">Email address</label>
							<div class="mt-2">
								<input type="email" name="email" id="email" autocomplete="email" required class="input w-full">
							</div>
						</div>

						<div>
							<label for="password" class="block text-sm/6 font-medium text-base-content">Password</label>
							<div class="mt-2">
								<input type="password" name="password" id="password" autocomplete="current-password" required class="input w-full">
							</div>
						</div>

						<div class="flex items-center justify-between">
							<div class="flex gap-3">
								<div class="flex h-6 shrink-0 items-center">
									<div class="group grid size-4 grid-cols-1">
										<input id="remember-me" name="remember-me" type="checkbox" class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto">
										<svg class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25" viewBox="0 0 14 14" fill="none">
											<path class="opacity-0 group-has-checked:opacity-100" d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
											<path class="opacity-0 group-has-indeterminate:opacity-100" d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
										</svg>
									</div>
								</div>
								<label for="remember-me" class="block text-sm/6 text-base">Remember me</label>
							</div>

							<div class="text-sm/6">
								<a href="/forgot" class="link link-primary font-semibold">Forgot password?</a>
							</div>
						</div>

						<div>
							<button type="submit" class="btn btn-primary w-full">Sign in</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
	<div class="relative hidden w-0 flex-1 lg:block">
		<img class="absolute inset-0 size-full object-cover" src="/images/layout/splash/purr-11.jpg" alt="">
	</div>
</div>
