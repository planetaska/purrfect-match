import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { filterSchema } from '$lib/schemas';

export const load: PageServerLoad = async ({ parent, params, url, cookies }) => {
	const { accessToken } = await parent();
	const page: string = url.searchParams.get('page') || '1';
	const { type } = params;

	// Parse form data from URL parameters
	const formData = new FormData();
	
	// Always add sort parameter
	formData.append('sort', url.searchParams.get('sort') || 'recent');

	// Add array parameters (can have multiple values)
	['size', 'age', 'gender', 'coat'].forEach(param => {
		const values = url.searchParams.getAll(param);
		values.forEach(value => {
			formData.append(param, value);
		});
	});

	// Add boolean parameters
	['env_children', 'env_dogs', 'env_cats'].forEach(param => {
		const value = url.searchParams.get(param);
		if (value === 'true') {
			formData.append(param, 'true');
		}
	});

	// Create and validate the form
	const form = await superValidate(formData, zod(filterSchema));

	// Create the URLSearchParams that will be used in the fetch query
	const searchParams = new URLSearchParams();

	// Copy values from form data into searchParams
	if (form.data.sort) {
		searchParams.append('sort', form.data.sort);
	}

	// Convert params into comma seperated values as PetFinder API's spec
	['size', 'age', 'gender', 'coat'].forEach(param => {
		const values = form.data[param];
		if (values && values.length > 0) {
			searchParams.append(param, values.join(','));
		}
	});

	['env_children', 'env_dogs', 'env_cats'].forEach(param => {
		if (form.data[param]) {
			searchParams.append(param, 'true');
		}
	});

	// get the zip code from url params
	// if we get zip=(empty), keep the zip out of query to allow search all regions
	let zip: string | null
	if (url.searchParams.has('zip')) {
		zip = url.searchParams.get('zip')
		if (zip !== '') {
			searchParams.append('location', zip)
		}
	} else {
		zip = cookies.get('zip') || ''
		searchParams.append('location', zip)
	}

	searchParams.append('type', type.slice(0, -1))
	searchParams.append('limit', '18')
	searchParams.append('page', page)

	// Get animals
	const query = `https://api.petfinder.com/v2/animals?${searchParams.toString()}`

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
		filter_form: form,
		type: type,
		zip: zip,
		animals: result.animals || [],
		pagination: result.pagination || { current_page: 1, total_pages: 1 }
	}
}
