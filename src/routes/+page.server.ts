import { WakaSliceBy } from '$lib/constants'
import type { IterationSlim } from '$lib/generated/openapi/shortcut'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ fetch }) => {
  const [summariesResponse, durationsResponse, durationsByLanguageResponse, iterationsResponse] =
    await Promise.all([
      fetch('/api/wakatime/current/summaries'),
      fetch('/api/wakatime/current/durations'),
      fetch(`/api/wakatime/current/durations?slice_by=${WakaSliceBy.Language}`),
      fetch('/api/shortcut/iterations'),
    ])

  const summaries = (await summariesResponse.json()) as SummariesResult
  const durations = (await durationsResponse.json()) as DurationsResult
  const durationsByLanguage = (await durationsByLanguageResponse.json()) as DurationsResult
  const iterations = (await iterationsResponse.json()) as IterationSlim[]

  return { summaries, durations, durationsByLanguage, iterations }
}
