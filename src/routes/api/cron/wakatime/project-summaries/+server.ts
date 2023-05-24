import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { ApiEndpoint, WakaApiRange, type DataContainer } from '$lib/constants'
import type { SummariesResult } from '$src/types/wakatime'
import dayjs from 'dayjs'
import { DateFormat } from '$lib/helpers/timeHelpers'
import type { Database } from '$lib/database.types'

type Project = Database['public']['Tables']['projects']['Row']
type ProjectSummaries = Database['public']['Tables']['project_summaries']['Row']

export const GET: RequestHandler = async ({ fetch, locals: { supabase } }) => {
  const yesterday = dayjs().subtract(1, 'd').format(DateFormat.Query)
  // @ts-expect-error tough type
  const { data: projects }: DataContainer<Project[] | null> = await supabase
    .from('projects')
    .select('*')
    .eq('is_tracked', true)

  if (projects) {
    const projectSummariesRequests = projects.map((project) => {
      return fetch(
        `${ApiEndpoint.Summaries}?range=${WakaApiRange.Yesterday}&project=${project.name}`,
      )
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
      const { data: existingProjectSummary }: DataContainer<ProjectSummaries | null> =
        await supabase
          .from('project_summaries')
          .select('*')
          .eq('project_id', project.id)
          .eq('date', yesterday)
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
