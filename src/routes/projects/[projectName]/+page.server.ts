import type { SummariesResult } from '$src/types/wakatime'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = (async ({ fetch, params }) => {
  const response = await fetch(`/api/wakatime/current/summaries?project=${params.projectName}`)
  const summaries: SummariesResult = await response.json()

  return { summaries }
}) satisfies PageServerLoad
