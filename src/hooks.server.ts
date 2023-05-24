import crypto from 'crypto'
import * as Sentry from '@sentry/node'
import {
  PUBLIC_SENTRY_DSN,
  PUBLIC_SUPABASE_ANON_KEY,
  PUBLIC_SUPABASE_URL,
} from '$env/static/public'
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit'
import { redirect, type Handle, type HandleServerError } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
  // Only emit sentry errors in production
  if (import.meta.env.PROD) {
    Sentry.init({
      dsn: PUBLIC_SENTRY_DSN,
      tracesSampleRate: 1.0,
    })
  }

  // Create supabase server client (consider making more powerful once we have row level security up)
  event.locals.supabase = createSupabaseServerClient({
    supabaseUrl: PUBLIC_SUPABASE_URL,
    supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
    event,
  })

  event.locals.getSession = async () => {
    const {
      data: { session },
    } = await event.locals.supabase.auth.getSession()
    return session
  }

  event.locals.getProfile = async () => {
    const session = await event.locals.getSession()
    const { data: profile } = await event.locals.supabase
      .from('profiles')
      .select('*')
      .eq('id', session?.user.id)
      .single()
    return profile
  }

  const profile = await event.locals.getProfile()

  console.log(
    '🚀 Request: ',
    event.url.pathname,
    event.cookies.get('sb-auth-token')?.slice(0, 9) ? '✅' : '⚠️',
    profile?.email ? '👍' : '🛑',
    profile?.range,
  )

  if (!profile && event.url.pathname === '/account') {
    throw redirect(303, '/login')
  }

  const response = await resolve(event, {
    /**
     * There´s an issue with `filterSerializedResponseHeaders` not working when using `sequence`
     *
     * https://github.com/sveltejs/kit/issues/8061
     */
    filterSerializedResponseHeaders(name: any) {
      return name === 'content-range'
    },
  })

  return response
}

export const handleError: HandleServerError = ({ error, event }) => {
  const errorId = crypto.randomUUID()

  // Only emit errors in production
  if (import.meta.env.PROD) {
    Sentry.captureException(error, {
      contexts: { sveltekit: { event, errorId } },
    })
  }

  if (error instanceof Error && import.meta.env.DEV) {
    return {
      errorId,
      name: error.name,
      message: error.message,
      stack: error.stack,
    }
  }

  return {
    message: 'A server error occurred. I have spoken.',
    errorId,
  }
}
