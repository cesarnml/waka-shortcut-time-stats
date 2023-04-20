import type { IterationSlim } from '$lib/generated/openapi/shortcut'
import type { AllTimeSinceTodayData } from './api/wakatime/current/all-time-since-today/+server'
import type { WakaProjectResult } from './api/wakatime/current/projects/+server'
import type { SummariesResult } from './api/wakatime/current/summaries/+server'

export const load = async ({ fetch }) => {
  const [allTimeResponse, summariesResponse, projectsResponse, iterationsResponse] =
    await Promise.all([
      fetch('/api/wakatime/current/all-time-since-today'),
      fetch('/api/wakatime/current/summaries'),
      fetch('/api/wakatime/current/projects'),
      fetch('/api/shortcut/iterations'),
    ])

  const allTimeSinceToday = (await allTimeResponse.json()) as AllTimeSinceTodayData
  const summaries = (await summariesResponse.json()) as SummariesResult
  const projects = (await projectsResponse.json()) as WakaProjectResult
  const iterations = (await iterationsResponse.json()) as IterationSlim[]
  return { allTimeSinceToday, summaries, projects, iterations }
}
