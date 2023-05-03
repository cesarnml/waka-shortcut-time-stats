import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import type { SummariesResult } from '$src/routes/api/wakatime/current/summaries/+server'
import { WAKA_API_KEY } from '$env/static/private'

const WakaApiRange = {
  Today: 'Today',
  Yesterday: 'Yesterday',
  Last_7_Days: 'Last 7 Days',
  Last_7_Days_From_Yesterday: 'Last 7 Days From Yesterday',
  Last_14_Days: 'Last 14 Days',
  Last_30_Days: 'Last 30 Days',
  This_Week: 'This Week',
  This_Month: 'This Month',
  Last_Month: 'Last Month',
} as const

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
