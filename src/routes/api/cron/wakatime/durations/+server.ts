import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import dayjs from 'dayjs'
import type { DurationsResult } from '$src/types/wakatime'

export const GET: RequestHandler = async ({ fetch, locals: { supabase } }) => {
  const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD')

  const response = await fetch(`/api/wakatime/current/durations?date=${yesterday}`)
  const durationsResult: DurationsResult = await response.json()

  const { data: existingDuration } = await supabase
    .from('durations')
    .select('*')
    .eq('date', yesterday)
    .single()

  if (existingDuration) {
    const output = await supabase
      .from('durations')
      .update({ data: durationsResult.data })
      .eq('date', yesterday)
    return json(output)
  } else {
    const output = await supabase
      .from('durations')
      .insert({ data: durationsResult.data, date: yesterday })
    return json(output)
  }
}
