import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals: { getSession, getProfile } }) => {
  const session = await getSession()
  const profile = await getProfile()

  return {
    session,
    profile,
  }
}
