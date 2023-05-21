import { ApiEndpoint, WakaApiRange } from '$lib/constants'
import type { SummariesResult } from '$src/types/wakatime'
import type { PageServerLoad } from './$types'
import type { SupabaseDuration } from './api/supabase/durations/+server'

export const load: PageServerLoad = async ({
  fetch,
  setHeaders,
  url,
  locals: { getSession, supabase },
}) => {
  let range = url.searchParams.get('range') ?? WakaApiRange.Last_7_Days_From_Yesterday

  const session = await getSession()
  if (session) {
    const { user } = session
    const { data: profile } = await supabase
      .from('profiles')
      .select()
      .eq('email', user.email)
      .single()

    if (!profile) {
      // create new profile record
      await supabase.from('profiles').insert({
        email: user.email,
        avatar_url: user.user_metadata.avatar_url,
        user_id: user.id,
        name: user.user_metadata.name,
        date_range: url.searchParams.get('range') ?? WakaApiRange.Last_7_Days_From_Yesterday,
      })
    } else {
      range = profile.date_range
    }
  }

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
