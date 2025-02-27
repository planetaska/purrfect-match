import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types'; //'@sveltejs/kit'; //

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const type = data.get('type');
		const zip = data.get('zipcode');
		const size = data.get('size');
        const gender = data.get('age');
		const age = data.get('size');
        const children = data.get('children');
        const dogs = data.get('dogs');
        const cats = data.get('cats');

		console.log(`type: ${type}, zip: ${zip}, size: ${size}, gender: ${gender}
            children: ${children}, dogs: ${dogs}, cats: ${cats}, age: ${age}`);
    }
};