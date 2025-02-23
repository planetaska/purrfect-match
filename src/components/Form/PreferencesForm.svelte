<!-- Settings forms -->
<div class="divide-y divide-base-content/8 bg-base-200">
	<div class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
		<div>
			<h2 class="text-base/7 font-semibold text-base-content">Pet Preferences</h2>
			<p class="mt-1 text-sm/6 text-base-content">
				You can update your pet preferences here, or by taking our <a href="/match" class="link link-primary">Match for Me</a> questionnaires!
			</p>
		</div>

		<form class="md:col-span-2">
			<div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
				<div class="sm:col-span-3">
					<label for="size" class="block text-sm/6 font-medium text-baes-content">Size</label>
					<div class="mt-2">
						<select name="size" id="size" class="select">
							<option>Small</option>
							<option>Medium</option>
							<option>Large</option>
						</select>
					</div>
				</div>

				<div class="sm:col-span-3">
					<label for="age" class="block text-sm/6 font-medium text-baes-content">Age</label>
					<div class="mt-2">
						<select name="age" id="age" class="select">
							<option>Young</option>
							<option>Medium</option>
							<option>Large</option>
						</select>
					</div>
				</div>

				<div class="sm:col-span-3">
					<label for="gender" class="block text-sm/6 font-medium text-baes-content">Gender</label>
					<div class="mt-2">
						<select name="gender" id="gender" class="select">
							<option>Male</option>
							<option>Female</option>
						</select>
					</div>
				</div>

				<div class="sm:col-span-3">
					<label for="coat" class="block text-sm/6 font-medium text-baes-content">Coat</label>
					<div class="mt-2">
						<select name="coat" id="coat" class="select">
							<option>Short</option>
							<option>Long</option>
						</select>
					</div>
				</div>

				<div class="sm:col-span-3 sm:col-start-1 flex items-center justify-between">
					<label for="env_children" class="block text-sm/6 font-medium text-baes-content">Children in environment?</label>
					<input type="checkbox" name="env_children" id="env_children" class="checkbox checkbox-primary" />
				</div>

				<div class="sm:col-span-3 sm:col-start-1 flex items-center justify-between">
					<label for="env_dogs" class="block text-sm/6 font-medium text-baes-content">Dogs in environment?</label>
					<input type="checkbox" name="env_dogs" id="env_dogs" class="checkbox checkbox-primary" />
				</div>

				<div class="sm:col-span-3 sm:col-start-1 flex items-center justify-between">
					<label for="env_cats" class="block text-sm/6 font-medium text-baes-content">Cats in environment?</label>
					<input type="checkbox" name="env_cats" id="env_cats" class="checkbox checkbox-primary" />
				</div>
			</div>

			<div class="mt-8 flex">
				<button type="submit" class="btn btn-primary">Save</button>
			</div>
		</form>
	</div>
</div>