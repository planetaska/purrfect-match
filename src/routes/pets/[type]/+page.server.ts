import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types'; 

export const load: PageServerLoad = async ({ fetch, params, parent, url }) => {
	try {
		const { accessToken } = await parent();
		const zip = url.searchParams.get('location');
		const { type } = params;

		console.log(`zip is: ${zip}, type is ${type}`);

		let path = '';
		if (!zip) {
			path = `https://api.petfinder.com/v2/animals?type=${type}&page=1`;
		} else {
			path = `https://api.petfinder.com/v2/animals?type=${type}&location=${zip}&page=1`;
		}
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
