import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { WakaApiRange } from '$lib/constants'
import type { SummariesResult } from '$src/types/wakatime'

export const GET: RequestHandler = async ({ fetch, locals: { supabase } }) => {
  const response = await fetch(`/api/wakatime/current/summaries?&range=${WakaApiRange.Yesterday}`)
  const summariesResult: SummariesResult = await response.json()
  const summaries = summariesResult.data
  const summariesWithDate = summaries.map((summary) => ({ ...summary, date: summary.range.date }))
  console.log('summariesWithDate:', summariesWithDate)

  const output = await supabase.from('summaries').insert(summariesWithDate)
  console.log('output:', output)

  return json(output)
}
