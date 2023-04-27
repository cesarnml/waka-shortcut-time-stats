import type { IterationSlim } from '$lib/generated/openapi/shortcut'
import type { PageServerLoad } from './$types'
import type { AllTimeSinceTodayData } from './api/wakatime/current/all-time-since-today/+server'
import type { DurationsResult } from './api/wakatime/current/durations/+server'
import type { WakaProjectResult } from './api/wakatime/current/projects/+server'
import type { SummariesResult } from './api/wakatime/current/summaries/+server'

const WakaSliceBy = {
  None: '',
  Entity: 'entity',
  Language: 'language',
  Dependencies: 'dependencies',
  OS: 'os',
  Editor: 'editor',
  Machine: 'machine',
} as const

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
