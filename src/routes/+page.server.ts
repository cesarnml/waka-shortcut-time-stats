import type { IterationSlim } from '$lib/generated/openapi/shortcut'
import type { AllTimeSinceTodayData } from './api/wakatime/current/all-time-since-today/+server'
import type { SummariesResponse } from './api/wakatime/current/summaries/+server'

export const load = async ({ fetch }) => {
  const response = await fetch('/api/wakatime/current/all-time-since-today')
  const allTimeSinceToday = (await response.json()) as AllTimeSinceTodayData
  const summariesResponse = await fetch('/api/wakatime/current/summaries')
  const summaries = (await summariesResponse.json()) as SummariesResponse
  const iterationsResponse = await fetch('/api/shortcut/iterations')
  const iterations = (await iterationsResponse.json()) as IterationSlim[]
  return { allTimeSinceToday, summaries, iterations }
}
