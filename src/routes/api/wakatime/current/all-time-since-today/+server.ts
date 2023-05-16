import { WAKA_API_KEY } from '$env/static/private'
import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { BaseUrl, RestResource } from '$lib/constants'

export type WakaFullRange = {
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
  range: WakaFullRange
  text: string
  timeout: number
  total_seconds: number
}

export const GET: RequestHandler = async ({ fetch }) => {
  const response = await fetch(`${BaseUrl.WakaTime}${RestResource.AllTime}?api_key=${WAKA_API_KEY}`)
  const { data }: { data: AllTimeSinceTodayData } = await response.json()

  return json(data)
}
