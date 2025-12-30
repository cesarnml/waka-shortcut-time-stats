import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'
import { createBrowserClient, isBrowser, parse } from '@supabase/ssr'
import type { LayoutLoad } from './$types'
import type { Database } from '$lib/database.types'

export const load: LayoutLoad = async ({ fetch, data, depends, url }) => {
  depends('supabase:auth')

  const supabase = createBrowserClient<Database>(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    global: {
      fetch,
    },
    cookies: {
      get(key) {
        if (!isBrowser()) {
          return JSON.stringify(data.session)
        }
        const cookie = parse(document.cookie)
        return cookie[key]
      },
    },
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session?.user.id)
    .single()

  const { data: projects } = await supabase.from('projects').select('*')

  return { supabase, session, profile, projects, pathname: url.pathname }
}
