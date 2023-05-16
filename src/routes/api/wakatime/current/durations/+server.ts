import dayjs from 'dayjs'
import type { RequestHandler } from './$types'
import { WAKA_API_KEY } from '$env/static/private'
import { json, error } from '@sveltejs/kit'
import { BaseUrl, RestResource, WakaSliceBy } from '$lib/constants'
import type { DurationsResult } from '$src/types/wakatime'

export const GET: RequestHandler = async ({ fetch, url }) => {
  const date = url.searchParams.get('date') ?? dayjs().format('YYYY-MM-DD')
  const slice_by = url.searchParams.get('slice_by') ?? WakaSliceBy.None

  try {
    const response = await fetch(
      `${BaseUrl.WakaTime}${RestResource.Durations}?api_key=${WAKA_API_KEY}&date=${date}&slice_by=${slice_by}`,
    )
    const result = (await response.json()) as DurationsResult
    return json(result)
  } catch (err) {
    throw error(400, 'This is the way')
  }
}
