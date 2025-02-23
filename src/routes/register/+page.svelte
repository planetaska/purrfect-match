<div class="flex grow">
	<div class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-base-100">
		<div class="mx-auto w-full max-w-sm lg:w-96">
			<div>
				<svg class="h-10 w-10 text-blue-400">
					<use xlink:href="/images/layout/logo.svg#purr_logo"></use>
				</svg>
				<h2 class="mt-8 text-2xl/9 font-bold tracking-tight text-base-content">Create new account</h2>
				<p class="mt-2 text-sm/6 text-base-content">
					Already have an account?
					<a href="/sign-in" class="link link-primary font-semibold">Sign in!</a>
				</p>
			</div>

			<div class="mt-10">
				<div>
					<form action="/auth?/register" method="POST" class="space-y-4">
						<div>
							<label for="full_name" class="block text-sm/6 font-medium text-base-content">Full name</label>
							<div class="mt-2">
								<input type="text" name="full_name" id="full_name" required class="input w-full">
							</div>
						</div>

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

						<div>
							<label for="location" class="block text-sm/6 font-medium text-base-content">Location (Zip code)</label>
							<div class="mt-2">
								<input type="text" name="location" id="location" required class="input w-full">
							</div>
						</div>

						<div class="flex items-center justify-between">
							<div class="flex gap-3">
								<input id="remember-me" name="remember-me" type="checkbox" class="checkbox">
								<label for="remember-me" class="block text-sm/6 text-base">Remember me</label>
							</div>

							<div class="text-sm/6">
								<a href="/forgot" class="link link-primary font-semibold">Forgot password?</a>
							</div>
						</div>

						<div>
							<button type="submit" class="btn btn-primary w-full">Register</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
	<div class="relative hidden w-0 flex-1 lg:block">
		<img class="absolute inset-0 size-full object-cover" src="/images/layout/splash/purr-16.jpg" alt="">
	</div>
</div>
