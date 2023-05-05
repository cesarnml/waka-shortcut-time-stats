import { json } from '@sveltejs/kit'
import dayjs from 'dayjs'
import type { RequestHandler } from './$types'
import { WakaSliceBy } from '$lib/constants'
import type { DurationsResult } from '$src/types/wakatime'

export const GET: RequestHandler = async ({ fetch, locals: { supabase } }) => {
  const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD')

  const response = await fetch(
    `/api/wakatime/current/durations?date=${yesterday}&slice_by=${WakaSliceBy.Language}`,
  )
  const durationsResult: DurationsResult = await response.json()
  console.log('durationsResult:', durationsResult)

  const output = await supabase
    .from('durations_by_language')
    .insert({ data: durationsResult.data, date: yesterday })
  console.log('output:', output)
  return json(output)
}
