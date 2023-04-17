import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const payload = request.json();

	console.log('payload:', payload);

	return json(payload);
};
