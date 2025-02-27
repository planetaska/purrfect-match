import { PRIVATE_PETFINDER_KEY, PRIVATE_PETFINDER_SECRET } from '$env/static/private';
import type { PageServerLoad } from './$types'; //'@sveltejs/kit'; //

export const load: PageServerLoad = async () => {
	try {
		// Step 1: Obtain Access Token using your API Key and Secret
		const tokenRes = await fetch('https://api.petfinder.com/v2/oauth2/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams({
				grant_type: 'client_credentials',
				client_id: PRIVATE_PETFINDER_KEY,
				client_secret: PRIVATE_PETFINDER_SECRET
			})
		});

		const tokenData = await tokenRes.json();
		const accessToken = tokenData.access_token;

		// console.log(accessToken);
		return { accessToken };
	} catch (error) {
		console.error(`Error retreiving pets: ${error}`);
		return {};
	}
};
