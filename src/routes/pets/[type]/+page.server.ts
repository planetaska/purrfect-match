import type { PageServerLoad } from './$types'; //'@sveltejs/kit'; //

export const load: PageServerLoad = async ({ fetch, params, parent }) => {
	try {
		const { accessToken } = await parent();
		const { type } = params;

		//Assume id for the location would be taken from user input
		//https://api.petfinder.com/v2/animals?type=${type}&location=${id}
		const res = await fetch(`https://api.petfinder.com/v2/animals?type=${type}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`
			}
		});

		const data = await res.json();
		console.log(data);
		return {
			props: { animal: data.animals }
		};
	} catch (error) {
		console.error(`Error retreiving pets: ${error}`);
	}
};
