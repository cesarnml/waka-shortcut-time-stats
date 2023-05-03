import type { IterationSlim } from '$lib/generated/openapi/shortcut'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ fetch }) => {
  const response = await fetch('/api/shortcut/iterations')
  const iterations: IterationSlim[] = await response.json()
  return { iterations }
}
