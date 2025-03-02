import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types'; //'@sveltejs/kit'; //

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const type = data.get('type');
		const filters = {
			location: data.get('location'),
			size: data.getAll('size'),
			gender: data.getAll('gender'),
			age: data.getAll('age'),
			good_with_children: data.get('children'),
			good_with_dogs: data.get('dogs'),
			good_with_cats: data.get('cats')
		};
		//console.log(filters);

		const queryParams = new URLSearchParams();

		Object.entries(filters).forEach(([key, value]) => {
			let val = '';
			if (value) {
				if (value instanceof File) {
					val = value.name;
				} else if (value instanceof Array) {
					val = value.join(', ');
				} else {
					val = value;
				}
			}
			queryParams.set(key, val);
		});

		console.log(queryParams);

		// Construct route with query parameters
		const redirectUrl = `/pets/${type}?${queryParams.toString()}`;
		console.log(redirectUrl);

		return redirect(303, redirectUrl);
	}
};

export const load: PageServerLoad = async ({ fetch, params, parent, url }) => {
	try {
		const { accessToken } = await parent();
		const zip = url.searchParams.get('location');
		const { type } = params;

		console.log(`zip is: ${zip}, type is ${type}`);

		const size = url.searchParams.get('size');
		const gender = url.searchParams.get('gender');
		const age = url.searchParams.get('age');
		const goodWithChildren = url.searchParams.get('good_with_children');
		const goodWithDogs = url.searchParams.get('good_with_dogs');
		const goodWithCats = url.searchParams.get('good_with_cats');

		let path = '';
		if (!zip) {
			path = `https://api.petfinder.com/v2/animals?type=${type}&page=1`;
		} else {
			path = `https://api.petfinder.com/v2/animals?type=${type}&location=${zip}&page=1`;
		}
		// Add other params if they exist
		if (size) path += `&size=${size}`;
		if (gender) path += `&gender=${gender}`;
		if (age) path += `&age=${age}`;
		if (goodWithChildren) path += `&good_with_children=${goodWithChildren}`;
		if (goodWithDogs) path += `&good_with_dogs=${goodWithDogs}`;
		if (goodWithCats) path += `&good_with_cats=${goodWithCats}`;

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
