import type { PageServerLoad } from './$types'; //'@sveltejs/kit'; //

export const load: PageServerLoad = async ({ fetch, params, parent }) => {
	try {
		const { accessToken } = await parent();

		const page = ''; //params.page;
		let url = '';
		if (accessToken) {
			if (page) {
				// url = `https://api.petfinder.com/v2/animals?type=Dog&type=Cat&page=${page}`;
				url = `https://api.petfinder.com/v2/types?page=${page}`;
			} else {
				// url = `https://api.petfinder.com/v2/animals?type=Dog&type=Cat&page=1`;
				url = `https://api.petfinder.com/v2/types?page=1`;
			}
		}
		const res = await fetch(url, {
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
			props: { types: data.types }
		};
	} catch (error) {
		console.error(`Error retreiving pets: ${error}`);
	}
};
