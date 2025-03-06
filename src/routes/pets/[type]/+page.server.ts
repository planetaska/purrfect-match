import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types'; //'@sveltejs/kit'; //

export const actions = {
	default: async ({ request }) => {
		//const formData = await request.formData();

		return { success: true };
	}
};

export const load: PageServerLoad = async ({ fetch, params, parent, url, request }) => {
	try {
		const { accessToken } = await parent();
		let zip = url.searchParams.get('location');
		let { type } = params;

		console.log(`zip is: ${zip}, type is ${type}`);

		let path = '';

		if (request.method == 'POST') {
			console.log('Form submitted');
			const formData = await request.formData();
			const formZip = formData.get('location');
			const formType = formData.get('type');
			const size = formData.get('size');
			const gender = formData.getAll('gender');
			const age = formData.getAll('age');
			const goodWithChildren = formData.get('children');
			const goodWithDogs = formData.get('dogs');
			const goodWithCats = formData.get('cats');

			// Add other params if they exist
			if (formZip) {
				zip = formZip.toString();
				console.log(`zip from form is ${zip}`);
			}
			if (formType) {
				type = formType.toString();
				console.log(`type from form is ${type}`);
			}

			path = 'https://api.petfinder.com/v2/animals?';

			if (!zip) {
				path += `type=${type}&page=1`;
			} else {
				path += `type=${type}&location=${zip}&page=1`;
			}

			if (size) path += `&size=${size}`;
			if (gender) path += `&gender=${gender}`;
			if (age) path += `&age=${age}`;
			if (goodWithChildren) path += `&good_with_children=${goodWithChildren}`;
			if (goodWithDogs) path += `&good_with_dogs=${goodWithDogs}`;
			if (goodWithCats) path += `&good_with_cats=${goodWithCats}`;

			console.log(path);
		} else {
			path = 'https://api.petfinder.com/v2/animals?';

			if (!zip) {
				path += `type=${type}&page=1`;
			} else {
				path += `type=${type}&location=${zip}&page=1`;
			}
		}
		console.log(path);

		const res = await fetch(path, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`
			}
		});

		const data = await res.json();
		console.log(data);
		return {
			props: { animal: data.animals, zip }
		};
	} catch (error) {
		console.error(`Error retreiving pets: ${error}`);
	}
};
