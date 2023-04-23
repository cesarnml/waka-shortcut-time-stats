import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals: { getSession } }) => {
  debugger
  return {
    session: await getSession(),
  }
}
