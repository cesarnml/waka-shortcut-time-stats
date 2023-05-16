import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { ApiEndpoint, WakaApiRange } from '$lib/constants'
import type { SummariesResult } from '$src/types/wakatime'

type Project = {
  id: string
  created_at: string
  updated_at: string
  name: string
}

export const GET: RequestHandler = async ({ fetch, locals: { supabase } }) => {
  const { data: projects }: { data: Project[] | null } = await supabase.from('projects').select('*')

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

    const projectSummariesResultsPayload = projectSummariesResultsWithDate.map(
      (projectSummaryResult) => {
        return supabase.from('project_summaries').insert(projectSummaryResult.data)
      },
    )

    const output = await Promise.all(projectSummariesResultsPayload)

    return json(output)
  }
  return json({ message: 'No projects found' })
}
