import type { WakaProjectResult } from '$src/types/wakatime'
import type { PageServerLoad } from './$types'
import { ApiEndpoint } from '$lib/constants'

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
  setHeaders({ 'Cache-Control': 'public, s-maxage=60,  max-age=60' })

  const response = await fetch(ApiEndpoint.Projects)
  const result: WakaProjectResult = await response.json()
  return { projectsResult: result }
}
