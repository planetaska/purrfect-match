<div class="flex grow">
	<div class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-base-100">
		<div class="mx-auto w-full max-w-sm lg:w-96">
			<div>
				<svg class="h-10 w-10 text-blue-400">
					<use xlink:href="/images/layout/logo.svg#purr_logo"></use>
				</svg>
				<h2 class="mt-8 text-2xl/9 font-bold tracking-tight text-base-content">Reset Password</h2>
				<p class="mt-2 text-sm/6 text-base-content">
					Not a member?
					<a href="/register" class="link link-primary font-semibold">Join today!</a>
				</p>
			</div>

			<div class="mt-10">
				<div>
					<form action="/auth?/update" method="POST" class="space-y-4">

						<div>
							<label for="password" class="block text-sm/6 font-medium text-base-content">New Password</label>
							<div class="mt-2">
								<input type="password" name="password" id="password" autocomplete="current-password" required class="input w-full">
							</div>
						</div>

						<div>
							<button type="submit" class="btn btn-primary w-full">Reset</button>
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