import { ApiEndpoint, WakaApiRange } from '$lib/constants'
import type { SummariesResult } from '$src/types/wakatime'
import type { PageServerLoad } from './$types'
import type { SupabaseDuration } from './api/supabase/durations/+server'

export const load: PageServerLoad = async ({ fetch, setHeaders, url }) => {
  const range = url.searchParams.get('range') ?? WakaApiRange.Last_7_Days_From_Yesterday
  setHeaders({ 'Cache-Control': 'public, s-maxage=60,  max-age=60' })
  const [summariesResponse, durationsResponse, durationsByLanguageResponse] = await Promise.all([
    fetch(`${ApiEndpoint.SupabaseSummaries}?range=${range}`),
    fetch(ApiEndpoint.SupabaseDurations),
    fetch(ApiEndpoint.SupabaseDurationsByLanguage),
  ])

  const summaries = (await summariesResponse.json()) as SummariesResult
  const durations = (await durationsResponse.json()) as SupabaseDuration
  const durationsByLanguage = (await durationsByLanguageResponse.json()) as SupabaseDuration

  return { summaries, durations, durationsByLanguage }
}
