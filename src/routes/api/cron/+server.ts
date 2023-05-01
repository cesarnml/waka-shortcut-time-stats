import { json } from '@sveltejs/kit'
import type { SummariesResult } from '../wakatime/current/summaries/+server'
import type { RequestHandler } from './$types'

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
  const response = await fetch(`/api/wakatime/current/summaries?range=${WakaApiRange.Yesterday}`)
  const summariesResult: SummariesResult = await response.json()
  const data = summariesResult.data[0]
  const date = summariesResult.data[0].range.date

  const output = await supabase.from('summaries').insert({ ...data, date })
  console.log('summariesResult:', data, date)
  console.log('output:', output)

  return json({ message: 'ok' })
}
