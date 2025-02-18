import { API_KEY, API_SECRET } from '$env/static/private';
import type { PageServerLoad } from '@sveltejs/kit'; //'./$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
	try {
		// Step 1: Obtain Access Token using your API Key and Secret
		const tokenRes = await fetch('https://api.petfinder.com/v2/oauth2/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams({
				grant_type: 'client_credentials', // OAuth grant type for public access
				client_id: API_KEY, // Your API Key
				client_secret: API_SECRET // Your API Secret
			})
		});

		const tokenData = await tokenRes.json();
		const accessToken = tokenData.access_token;

		const res = await fetch(`https://api.petfinder.com/v2/types`, {
			//?type=cat&type=dog`
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}` //`ApiKey ${API_KEY}`
			}
		});

		const data = await res.json();
		console.log(data);
		return {
			//props: { types: data.animals }
			props: { types: data.types }
		};
	} catch (error) {
		console.error(`Error retreiving pets: ${error}`);
	}
};
