import { WAKA_API_KEY } from '$env/static/private'
import { json } from '@sveltejs/kit'

export type CumulativeTotal = {
  decimal: string
  digital: string
  seconds: number
  text: string
}

export type DailyAverage = {
  days_including_holidays: number
  days_minus_holidays: number
  holidays: number
  seconds: number
  seconds_including_other_language: number
  text: string
  text_including_other_language: string
}

export type WakaCategory = {
  decimal: string
  digital: string
  hours: number
  minutes: number
  name: string
  percent: number
  seconds: number
  text: string
  total_seconds: number
}

export type WakaDependency = WakaCategory
export type WakaEditor = WakaCategory
export type WakaLanguage = WakaCategory
export type WakaMachine = WakaCategory & { machine_name_id: string }
export type WakaOperatingSystem = WakaCategory
export type WakaProjectSlim = WakaCategory & { color: string | null }

export type WakaRange = {
  date: string
  end: string
  start: string
  text: string
  timezone: string
}

export type GrandTotal = {
  decimal: string
  digital: string
  hours: number
  minutes: number
  text: string
  total_seconds: number
}

export type SummariesData = {
  categories: WakaCategory[]
  dependencies: WakaDependency[]
  editors: WakaEditor[]
  grand_total: GrandTotal
  languages: WakaLanguage[]
  machines: WakaMachine[]
  operating_systems: WakaOperatingSystem[]
  projects: WakaProjectSlim[]
  range: WakaRange
}

export type SummariesResult = {
  cumulative_total: CumulativeTotal
  daily_average: DailyAverage
  data: SummariesData[]
  end: string
  start: string
}

export const GET = async ({ fetch }) => {
  // TODO: Extend to match API ref: https://wakatime.com/developers#summaries
  const baseUrl = 'https://wakatime.com'
  const resource = '/api/v1/users/current/summaries'

  const response = await fetch(`${baseUrl}${resource}?range=Last 7 Days&api_key=${WAKA_API_KEY}`, {
    method: 'GET',
  })

  const summaries: SummariesData[] = await response.json()
  return json(summaries)
}
