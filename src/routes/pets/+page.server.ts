import type { PageServerLoad } from './$types'; //'@sveltejs/kit'; //
import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const zipcode = data.get('zipcode');

		console.log(`Zip Code: ${zipcode}`);

		if (zipcode) {
			return redirect(303, `/pets?location=${zipcode}`);
		}
	}
};

export const load: PageServerLoad = async ({ fetch, params, parent, url }) => {
	try {
		const { accessToken } = await parent();
		const zip = url.searchParams.get('location');

		console.log(`In pets page.server load function, zip is ${zip}`);
		const page = ''; //params.page;
		let path = '';
		//const { page } = params.page;

		if (page) {
			// url = `https://api.petfinder.com/v2/animals?type=Dog&type=Cat&page=${page}`;
			path = `https://api.petfinder.com/v2/types?page=${page}`;
		} else {
			// url = `https://api.petfinder.com/v2/animals?type=Dog&type=Cat&page=1`;
			path = `https://api.petfinder.com/v2/types?page=1`;
		}

		const res = await fetch(path, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}` //`ApiKey ${API_KEY}`
			}
		});

		const data = await res.json();
		// console.log(data);
		return {
			// props: { types: data.animals }
			props: { types: data.types, zip }
		};
	} catch (error) {
		console.error(`Error retreiving pets: ${error}`);
	}
};
