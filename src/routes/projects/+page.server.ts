import type { WakaProjectResult } from '$src/types/wakatime'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
  setHeaders({ 'Cache-Control': 'public, s-maxage=60,  max-age=60' })

  const response = await fetch('/api/wakatime/current/projects')
  const result: WakaProjectResult = await response.json()
  return { projectsResult: result }
}
