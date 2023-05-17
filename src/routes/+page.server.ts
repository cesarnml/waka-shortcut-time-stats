import { ApiEndpoint, WakaApiRange, WakaSliceBy } from '$lib/constants'
import type { DurationsResult, SummariesResult } from '$src/types/wakatime'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ fetch, setHeaders, url }) => {
  const range = url.searchParams.get('range') ?? WakaApiRange.Last_7_Days_From_Yesterday
  setHeaders({ 'Cache-Control': 'public, s-maxage=60,  max-age=60' })
  const [summariesResponse, durationsResponse, durationsByLanguageResponse] = await Promise.all([
    fetch(`${ApiEndpoint.SupabaseSummaries}?range=${range}`),
    fetch(ApiEndpoint.Durations),
    fetch(`${ApiEndpoint.Durations}?slice_by=${WakaSliceBy.Language}`),
  ])

  const summaries = (await summariesResponse.json()) as SummariesResult
  const durations = (await durationsResponse.json()) as DurationsResult
  const durationsByLanguage = (await durationsByLanguageResponse.json()) as DurationsResult

  return { summaries, durations, durationsByLanguage }
}
