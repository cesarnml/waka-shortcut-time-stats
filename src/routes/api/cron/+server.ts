import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import type { SummariesResult } from '../wakatime/current/summaries/+server'
import { WakaApiRange } from '$lib/constants'

export const GET: RequestHandler = async ({ fetch, locals: { supabase } }) => {
  const response = await fetch(`/api/wakatime/current/summaries?range=${WakaApiRange.Yesterday}`)
  const summariesResult: SummariesResult = await response.json()
  const data = summariesResult.data[0]
  const date = summariesResult.data[0].range.date

  const output = await supabase.from('summaries').insert({ ...data, date })
  console.log('summariesResult:', data, date)
  console.log('output:', output)

  return json({ message: 'ok' })
}
