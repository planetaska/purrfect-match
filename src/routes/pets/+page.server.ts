import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, cookies }) => {
	const zip = url.searchParams.get('zip');

	if (zip) {
		// save zip to cookies
		cookies.set('zip', zip, { path: '/' });
	}

	return { zip }
}
