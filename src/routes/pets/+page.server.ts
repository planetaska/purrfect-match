import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const zip = url.searchParams.get('zip');

	return { zip }
}
