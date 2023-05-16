import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { ApiEndpoint, WakaApiRange } from '$lib/constants'
import type { SummariesResult } from '$src/types/wakatime'

export const GET: RequestHandler = async ({ fetch, locals: { supabase } }) => {
  const response = await fetch(`${ApiEndpoint.Summaries}?&range=${WakaApiRange.Yesterday}`)
  const summariesResult: SummariesResult = await response.json()
  const summaries = summariesResult.data
  const summariesWithDate = summaries.map((summary) => ({ ...summary, date: summary.range.date }))

  const { data: existingSummary } = await supabase
    .from('summaries')
    .select('*')
    .eq('date', summariesWithDate[0].date)
    .single()

  if (existingSummary) {
    const output = await supabase
      .from('summaries')
      .update(summariesWithDate)
      .eq('date', summariesWithDate[0].date)
    return json(output)
  } else {
    const output = await supabase.from('summaries').insert(summariesWithDate)
    return json(output)
  }
}
