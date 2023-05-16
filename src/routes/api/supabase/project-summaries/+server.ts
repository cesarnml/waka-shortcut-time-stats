import { WakaApiRange, WakaToShortcutApiRange } from '$lib/constants'
import { DateFormat } from '$lib/helpers/timeHelpers'
import type { SummariesResult } from '$src/types/wakatime'
import { error, json, type RequestHandler } from '@sveltejs/kit'
import dayjs from 'dayjs'

export const GET: RequestHandler = async ({ url, locals: { supabase } }) => {
  const start = url.searchParams.get('start') ?? ''
  const end = url.searchParams.get('end') ?? ''
  const project = url.searchParams.get('project') ?? ''
  let range = url.searchParams.get('range') ?? WakaApiRange.Last_7_Days_From_Yesterday

  // start and end take precedence over range
  if (start && end) {
    range = ''
  }

  const rangeStart = dayjs()
    .subtract(WakaToShortcutApiRange[range as keyof typeof WakaToShortcutApiRange], 'd')
    .format(DateFormat.Query)
  const rangeEnd =
    range === WakaApiRange.Yesterday || range === WakaApiRange.Last_7_Days_From_Yesterday
      ? dayjs().subtract(1, 'd').format(DateFormat.Query)
      : dayjs().format(DateFormat.Query)

  const { data: projectRecord } = await supabase
    .from('projects')
    .select('*')
    .eq('name', project)
    .single()

  console.log('projectRecord:', projectRecord)
  if (projectRecord) {
    const { data: summariesData } = await supabase
      .from('project_summaries')
      .select('*')
      .eq('project_id', projectRecord.id)
      .gte('date', rangeStart)
      .lte('date', rangeEnd)
      .order('date', { ascending: true })

    const summaries = {
      data: summariesData,
    } as SummariesResult

    console.log('summaries:', summaries.data.length)
    return json(summaries)
  }
  return error(404, 'Project not found')
}
