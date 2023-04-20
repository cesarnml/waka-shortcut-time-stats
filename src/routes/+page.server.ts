import type { IterationSlim } from '$lib/generated/openapi/shortcut'
import type { AllTimeSinceTodayData } from './api/wakatime/current/all-time-since-today/+server'
import type { DurationsResult } from './api/wakatime/current/durations/+server'
import type { WakaProjectResult } from './api/wakatime/current/projects/+server'
import type { SummariesResult } from './api/wakatime/current/summaries/+server'

export const load = async ({ fetch }) => {
  const [
    allTimeResponse,
    summariesResponse,
    projectsResponse,
    durationsResponse,
    iterationsResponse,
  ] = await Promise.all([
    fetch('/api/wakatime/current/all-time-since-today'),
    fetch('/api/wakatime/current/summaries'),
    fetch('/api/wakatime/current/projects'),
    fetch('/api/wakatime/current/durations'),
    fetch('/api/shortcut/iterations'),
  ])

  const allTimeSinceToday = (await allTimeResponse.json()) as AllTimeSinceTodayData
  const summaries = (await summariesResponse.json()) as SummariesResult
  const projects = (await projectsResponse.json()) as WakaProjectResult
  const durations = (await durationsResponse.json()) as DurationsResult
  const iterations = (await iterationsResponse.json()) as IterationSlim[]

  return { allTimeSinceToday, summaries, projects, durations, iterations }
}
