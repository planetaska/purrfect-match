import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types'; //'@sveltejs/kit'; //

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const type = data.get('type');
		const zip = data.get('zipcode');
		const size = data.getAll('size');
		const gender = data.getAll('gender');
		const age = data.getAll('age');
		const children = data.get('children');
		const dogs = data.get('dogs');
		const cats = data.get('cats');

		console.log(`type: ${type}, size: ${size.join(', ')}, gender: ${gender.join(', ')}
            children: ${children}, dogs: ${dogs}, cats: ${cats}, age: ${age.join(', ')}`);
    }
};