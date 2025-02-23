<!-- Settings forms -->
<div class="divide-y divide-base-content/8 bg-base-200">
	<div class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
		<div>
			<h2 class="text-base/7 font-semibold text-base-content">Personal Information</h2>
			<p class="mt-1 text-sm/6 text-base-content">These information will not be shared with others, and we do not intend to collect your personal information for other purposes.</p>
		</div>

		<form class="md:col-span-2">
			<div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
				<!-- Saved for later if we decided to add user avatars -->
				<!--						<div class="col-span-full flex items-center gap-x-8">-->
				<!--							<img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="size-24 flex-none rounded-lg bg-gray-800 object-cover">-->
				<!--							<div>-->
				<!--								<button type="button" class="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-baes-content shadow-xs hover:bg-white/20">Change avatar</button>-->
				<!--								<p class="mt-2 text-xs/5 text-baes-content">JPG, GIF or PNG. 1MB max.</p>-->
				<!--							</div>-->
				<!--						</div>-->

				<div class="sm:col-span-3">
					<label for="first-name" class="block text-sm/6 font-medium text-baes-content">Full name</label>
					<div class="mt-2">
						<input type="text" name="first-name" id="first-name" autocomplete="given-name" class="input w-full">
					</div>
				</div>

				<div class="col-span-full">
					<label for="email" class="block text-sm/6 font-medium text-baes-content">Email address</label>
					<div class="mt-2">
						<input id="email" name="email" type="email" autocomplete="email" class="input w-full">
					</div>
				</div>

				<div class="sm:col-span-3">
					<label for="first-name" class="block text-sm/6 font-medium text-baes-content">Location</label>
					<div class="mt-2">
						<input type="text" name="location" id="location" autocomplete="postal-code" class="input w-full">
					</div>
				</div>
			</div>

			<div class="mt-8 flex">
				<button type="submit" class="btn btn-primary">Save</button>
			</div>
		</form>
	</div>

	<div class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
		<div>
			<h2 class="text-base/7 font-semibold text-baes-content">Change password</h2>
			<p class="mt-1 text-sm/6 text-baes-content">Update your password associated with your account.</p>
		</div>

		<form class="md:col-span-2">
			<div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
				<div class="col-span-full">
					<label for="current-password" class="block text-sm/6 font-medium text-baes-content">Current password</label>
					<div class="mt-2">
						<input id="current-password" name="current_password" type="password" autocomplete="current-password" class="input w-full">
					</div>
				</div>

				<div class="col-span-full">
					<label for="new-password" class="block text-sm/6 font-medium text-baes-content">New password</label>
					<div class="mt-2">
						<input id="new-password" name="new_password" type="password" autocomplete="new-password" class="input w-full">
					</div>
				</div>

				<div class="col-span-full">
					<label for="confirm-password" class="block text-sm/6 font-medium text-baes-content">Confirm password</label>
					<div class="mt-2">
						<input id="confirm-password" name="confirm_password" type="password" autocomplete="new-password" class="input w-full">
					</div>
				</div>
			</div>

			<div class="mt-8 flex">
				<button type="submit" class="btn btn-primary">Save</button>
			</div>
		</form>
	</div>

	<div class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
		<div>
			<h2 class="text-base/7 font-semibold text-baes-content">Delete account</h2>
			<p class="mt-1 text-sm/6 text-baes-content">No longer want to use our service? You can delete your account here. This action is not reversible. All information related to this account will be deleted permanently.</p>
		</div>

		<form class="flex items-start md:col-span-2">
			<button type="submit" class="btn btn-secondary">Yes, delete my account</button>
		</form>
	</div>
</div>