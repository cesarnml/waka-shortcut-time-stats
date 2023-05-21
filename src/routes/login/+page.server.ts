import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals: { getSession, supabase } }) => {
  const session = await getSession()
  if (session) {
    const { user } = session

    const { data: profile } = await supabase
      .from('profiles')
      .select()
      .eq('email', user.email)
      .single()

    if (!profile) {
      await supabase.from('profiles').insert({})
    }
  }

  // if the user is already logged in return them to the account page
  if (session) {
    throw redirect(303, '/account')
  }
}
