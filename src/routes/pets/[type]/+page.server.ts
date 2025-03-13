import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent, params, url, cookies }) => {
	const { accessToken } = await parent();
	const page: string = url.searchParams.get('page') || '1';
	const { type } = params;

	// Have to pre-process params as they are different types
	const arrayParams = ['size', 'age', 'gender', 'coat']
	const booleanParams = ['env_children', 'env_dogs', 'env_cats']
	const skipParams = ['page', 'zip', 'limit', 'type']

	// Add all parameters
	const queryParams = {}
	url.searchParams.forEach((value, key) => {
		// console.log(`Key: ${key}, Value: ${value}`);

		if (skipParams.includes(key)) return

		// For array parameters, we need to handle them specially
		if (arrayParams.includes(key)) {
			if (!queryParams[key]) {
				queryParams[key] = [];
			}
			queryParams[key].push(value);
		} else if (booleanParams.includes(key)) {
			queryParams[key] = value === 'true';
		} else {
			queryParams[key] = value;
		}
	});

	// Create the URLSearchParams that will be used in the fetch query
	const searchParams = new URLSearchParams();

	// Copy values into search params
	Object.entries(queryParams).forEach(([key, value]) => {
		if (Array.isArray(value)) {
			searchParams.append(key, value.join(','))
		} else {
			searchParams.append(key, value);
		}
	});

	// get the zip code from url params
	let zip: string | undefined = url.searchParams.get('zip') || undefined
	// or get zip from cookies; set empty if not available
	if (!zip) zip = cookies.get('zip') || ''
	searchParams.append('location', zip)

	searchParams.append('type', type.slice(0, -1))
	searchParams.append('limit', '18')
	searchParams.append('page', page)

	// Get animals
	const query = `https://api.petfinder.com/v2/animals?${searchParams.toString()}`
	// console.log(query);

	const result = await fetch(query, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`
		}
	})
		.then((res) => res.json())
		.catch((error) => console.log(error));

	return {
		type: type,
		zip: zip,
		animals: result.animals,
		pagination: result.pagination
	}
}
