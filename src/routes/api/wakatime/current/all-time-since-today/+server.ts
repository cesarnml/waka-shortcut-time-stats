import { WAKA_API_KEY } from '$env/static/private'
import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { BaseUrl, RestResource, type DataContainer } from '$lib/constants'
import type { AllTimeSinceTodayData } from '$src/types/wakatime'
import axios from 'axios'

export const GET: RequestHandler = async () => {
  const { data }: DataContainer<AllTimeSinceTodayData> = await axios.get(
    `${BaseUrl.WakaTime}${RestResource.AllTime}?api_key=${WAKA_API_KEY}`,
  )

  return json(data)
}
