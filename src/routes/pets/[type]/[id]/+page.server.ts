import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params, parent }) => {
	try {
		const { accessToken } = await parent();
		const { type, id } = params;

		const res = await fetch(`https://api.petfinder.com/v2/animals/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`
			}
		});

		const data = await res.json();
		console.log(data);
		return {
			animal: data.animal
		};
	} catch (error) {
		console.error(`Error retreiving pets: ${error}`);
	}
};
