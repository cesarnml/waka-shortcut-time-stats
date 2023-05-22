import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { Url } from '$lib/constants'

export const load: PageServerLoad = async ({ locals: { getSession } }) => {
  const session = await getSession()

  // if the user is already logged in return them to the account page
  if (session) {
    throw redirect(303, Url.Account)
  }
}
