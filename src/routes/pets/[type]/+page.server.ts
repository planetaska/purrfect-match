import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent, params, url }) => {
	const { accessToken } = await parent();
	const zip = url.searchParams.get('zip');
	const { type } = params;

	// Get animals
	let query = 'https://api.petfinder.com/v2/animals?';
	if (zip) query += `location=${zip}&`;
	if (type) query += `type=${type.slice(0, -1)}`;
	query += '&page=1';

	const result = await fetch(query, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`
		}
	}).then(res => res.json())
		.catch(error => console.log(error))

	return {
		type: type,
		animals: result.animals
	}
}
