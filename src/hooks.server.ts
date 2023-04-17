import type { HandleServerError } from '@sveltejs/kit';
import crypto from 'crypto';
import * as Sentry from '@sentry/node';
import { PUBLIC_SENTRY_DSN } from '$env/static/public';

// Only emit errors in production
if (import.meta.env.PROD) {
	Sentry.init({
		dsn: PUBLIC_SENTRY_DSN,
		tracesSampleRate: 1.0
	});
}

export const handleError: HandleServerError = ({ error, event }) => {
	const errorId = crypto.randomUUID();

	// Only emit errors in production
	if (import.meta.env.PROD) {
		Sentry.captureException(error, {
			contexts: { sveltekit: { event, errorId } }
		});
	}

	return {
		message: 'An error occurred. I have spoken.',
		errorId
	};
};
