import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals: { getSession, getProfile } }) => {
  const [session, profile] = await Promise.all([getSession(), getProfile()])

  return {
    session,
    profile,
  }
}
