import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types'; //'@sveltejs/kit'; //

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const type = data.get('type');
		const zip = data.get('zipcode');

		console.log(`type: ${type}`);
		if (type && zip) {
			//Todo also check if zip exists
			return redirect(303, `/pets/${type}?location=${zip}`);
		}
	}
};

export const load: PageServerLoad = async ({ fetch, params, parent, url }) => {
	try {
		const { accessToken } = await parent();
		const zip = url.searchParams.get('location');
		const { type } = params;

		console.log(`zip is: ${zip}, type is ${type}`);
		//Assume id for the location would be taken from user input
		//https://api.petfinder.com/v2/animals?type=${type}&location=${id}
		const res = await fetch(
			`https://api.petfinder.com/v2/animals?type=${type}&location=${zip}&page=1`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}`
				}
			}
		);

		const data = await res.json();
		console.log(data);
		return {
			props: { animal: data.animals, zip }
		};
	} catch (error) {
		console.error(`Error retreiving pets: ${error}`);
	}
};
