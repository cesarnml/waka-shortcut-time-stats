import type { HandleClientError } from '@sveltejs/kit'
import * as Sentry from '@sentry/svelte'
import { PUBLIC_SENTRY_DSN } from '$env/static/public'

if (import.meta.env.PROD) {
  Sentry.init({
    dsn: PUBLIC_SENTRY_DSN, // can be hardcoded
    integrations: [
      new Sentry.BrowserTracing(), // Detail trace stack
      new Sentry.Replay({
        // Visual replay of errors (cool!)
        maskAllInputs: true, // respect user privacy on replays
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
    tracesSampleRate: 1.0, // lower settings if swamped with errors
    replaysSessionSampleRate: 1.0,
    replaysOnErrorSampleRate: 1.0,
  })
}

export const handleError: HandleClientError = ({ error, event }) => {
  const errorId = crypto.randomUUID() // add unique errorId for easy reference

  // Only emit errors in production
  if (import.meta.env.PROD) {
    Sentry.captureException(error, {
      contexts: { sveltekit: { event, errorId } },
    })
  }

  return {
    message: 'An error occurred. I have spoken.',
    errorId,
  }
}
