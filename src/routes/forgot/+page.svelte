<div class="flex grow">
	<div class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-base-100">
		<div class="mx-auto w-full max-w-sm lg:w-96">
			<div>
				<svg class="h-10 w-10 text-blue-400">
					<use xlink:href="/images/layout/logo.svg#purr_logo"></use>
				</svg>
				<h2 class="mt-8 text-2xl/9 font-bold tracking-tight text-base-content">Forgot Password</h2>
				<p class="mt-2 text-sm/6 text-base-content">
					Where should we send you a link for password reset?
				</p>
			</div>

			<div class="mt-10">
				<div>
					<form action="/auth?/reset_password" method="POST" class="space-y-4">
						<div>
							<label for="email" class="block text-sm/6 font-medium text-base-content">Email address</label>
							<div class="mt-2">
								<input type="email" name="email" id="email" autocomplete="email" required class="input w-full">
							</div>
						</div>
						<div>
							<button type="submit" class="btn btn-primary w-full">Submit</button>
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
