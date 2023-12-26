import dayjs from 'dayjs'
import type { RequestHandler } from './$types'
import { WAKA_API_KEY } from '$env/static/private'
import { json, error } from '@sveltejs/kit'
import { BaseUrl, RestResource, WakaSliceBy, type DataContainer } from '$lib/constants'
import type { DurationsResult } from '$src/types/wakatime'
import { DateFormat } from '$lib/helpers/timeHelpers'
import axios from 'axios'

export const GET: RequestHandler = async ({ url }) => {
  try {
    const today = dayjs().format(DateFormat.Query)
    const date = url.searchParams.get('date') ?? today
    const slice_by = url.searchParams.get('slice_by') ?? WakaSliceBy.None

    const { data: durationsResult }: DataContainer<DurationsResult> = await axios.get(
      `${BaseUrl.WakaTime}${RestResource.Durations}?api_key=${WAKA_API_KEY}&date=${date}&slice_by=${slice_by}`,
    )
    return json(durationsResult)
  } catch (err) {
    error(400, 'This is not the way.');
  }
}
