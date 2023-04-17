import { WAKA_API_KEY } from '$env/static/private'
import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export type WakaTimeRange = {
  end: string
  end_date: string
  end_text: string
  start: string
  start_date: string
  start_text: string
  timezone: string
}

export type AllTimeSinceTodayData = {
  decimal: string
  digital: string
  is_up_to_date: boolean
  percent_calculated: number
  range: WakaTimeRange
  text: string
  timeout: number
  total_seconds: number
}

export const GET: RequestHandler = async ({ fetch }) => {
  const baseUrl = 'https://wakatime.com/api/v1'
  const resource = '/users/current/all_time_since_today'

  const response = await fetch(`${baseUrl}${resource}?api_key=${WAKA_API_KEY}`, {
    method: 'GET',
  })
  const { data }: { data: AllTimeSinceTodayData } = await response.json()

  return json(data)
}
