import { WakaSliceBy } from '$lib/constants'
import type { DurationsResult, SummariesResult } from '$src/types/wakatime'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
  setHeaders({ 'Cache-Control': 'public, s-maxage=60,  max-age=60' })
  const [summariesResponse, durationsResponse, durationsByLanguageResponse] = await Promise.all([
    fetch('/api/wakatime/current/summaries'),
    fetch('/api/wakatime/current/durations'),
    fetch(`/api/wakatime/current/durations?slice_by=${WakaSliceBy.Language}`),
  ])

  const summaries = (await summariesResponse.json()) as SummariesResult
  const durations = (await durationsResponse.json()) as DurationsResult
  const durationsByLanguage = (await durationsByLanguageResponse.json()) as DurationsResult

  return { summaries, durations, durationsByLanguage }
}
