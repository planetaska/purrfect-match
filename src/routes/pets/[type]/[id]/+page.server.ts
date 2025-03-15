import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params, parent }) => {
	const { accessToken } = await parent();
	const { type, id } = params;

	const res = await fetch(`https://api.petfinder.com/v2/animals/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`
		}
	});

	const { animal } = await res.json();

	return { animal, type }
};
