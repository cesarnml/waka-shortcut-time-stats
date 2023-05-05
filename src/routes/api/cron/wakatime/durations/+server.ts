import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import dayjs from 'dayjs'

export const GET: RequestHandler = async ({ fetch, locals: { supabase } }) => {
  const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD')

  const response = await fetch(`/api/wakatime/current/durations?date=${yesterday}`)
  const durationsResult: DurationsResult = await response.json()
  console.log('durationsResult:', durationsResult)

  const output = await supabase
    .from('durations')
    .insert({ data: durationsResult.data, date: yesterday })
  console.log('output:', output)
  return json(output)
}
