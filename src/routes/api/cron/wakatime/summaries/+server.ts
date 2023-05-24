import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { ApiEndpoint, WakaApiRange, type DataContainer } from '$lib/constants'
import type { SummariesResult } from '$src/types/wakatime'
import type { Database } from '$lib/database.types'

type Summary = Database['public']['Tables']['summaries']['Row']

export const GET: RequestHandler = async ({ fetch, locals: { supabase } }) => {
  const response = await fetch(`${ApiEndpoint.Summaries}?&range=${WakaApiRange.Yesterday}`)
  const summariesResult: SummariesResult = await response.json()
  const summaries = summariesResult.data
  const summariesWithDate = summaries.map((summary) => ({ ...summary, date: summary.range.date }))

  const { data: existingSummary }: DataContainer<Summary | null> = await supabase
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
