import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent, params, url, cookies }) => {
	const { accessToken } = await parent();
	let zip: string | undefined = url.searchParams.get('zip') || undefined;
	const page: string = url.searchParams.get('page') || '1';
	const { type } = params;

	// or get zip from cookies
	if (!zip) {
		zip = cookies.get('zip');
	}

	// Get animals
	let query = 'https://api.petfinder.com/v2/animals?';
	if (zip) query += `location=${zip}&`;
	if (type) query += `type=${type.slice(0, -1)}`;
	query += `&limit=18&page=${page}`;

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
		zip: zip,
		animals: result.animals,
		pagination: result.pagination
	}
}
