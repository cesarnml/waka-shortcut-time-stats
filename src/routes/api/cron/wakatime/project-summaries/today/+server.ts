import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { ApiEndpoint, WakaApiRange } from '$lib/constants'
import type { SummariesResult } from '$src/types/wakatime'
import dayjs from 'dayjs'
import { DateFormat } from '$lib/helpers/timeHelpers'

type Project = {
  id: string
  created_at: string
  updated_at: string
  name: string
  color: string
}

export const GET: RequestHandler = async ({ fetch, locals: { supabase } }) => {
  const today = dayjs().format(DateFormat.Query)
  const { data: projects }: { data: Project[] | null } = await supabase.from('projects').select('*')

  if (projects) {
    const projectSummariesRequests = projects.map((project) => {
      return fetch(`${ApiEndpoint.Summaries}?range=${WakaApiRange.Today}&project=${project.name}`)
    })

    const responses = await Promise.all(projectSummariesRequests)
    const projectSummariesResults: SummariesResult[] = await Promise.all(
      responses.map((response) => response.json()),
    )

    const projectSummariesResultsWithDate = projectSummariesResults.map(
      (projectSummaryResult, index) => {
        projectSummaryResult.data = projectSummaryResult.data.map((summary) => ({
          ...summary,
          date: summary.range.date,
          project_id: projects[index].id,
        }))
        return projectSummaryResult
      },
    )

    const createOrUpdateRequests = []

    for (const [idx, project] of projects.entries()) {
      const { data: existingProjectSummary } = await supabase
        .from('project_summaries')
        .select('*')
        .eq('project_id', project.id)
        .eq('date', today)
        .single()
      if (existingProjectSummary) {
        createOrUpdateRequests.push(
          supabase
            .from('project_summaries')
            .update(projectSummariesResultsWithDate[idx].data)
            .eq('id', existingProjectSummary.id),
        )
      } else {
        createOrUpdateRequests.push(
          supabase.from('project_summaries').insert(projectSummariesResultsWithDate[idx].data),
        )
      }
    }

    const output = await Promise.all(createOrUpdateRequests)

    return json(output)
  }
  return json({ message: 'No projects found' })
}
