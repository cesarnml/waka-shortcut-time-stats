import type { AliasesResult, ProjectsResult } from '$src/types/vercel'
import type { SummariesResult } from '$src/types/wakatime'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ fetch, params }) => {
  const responses = await Promise.all([
    fetch(`/api/wakatime/current/summaries?project=${params.projectName}`),
    fetch(`/api/vercel/projects`),
  ])

  const [summaries, projects] = (await Promise.all(responses.map((r) => r.json()))) as [
    SummariesResult,
    ProjectsResult,
  ]
  const projectId = projects.projects.find((project) => project.link.repo === params.projectName)
    ?.id as string
  console.log('projectIeeed:', projectId)

  debugger
  const response = await fetch(`/api/vercel/aliases/${projectId}`)
  debugger
  const aliases = (await response.json()) as AliasesResult
  console.log('nang:', projectId)
  debugger

  return { summaries, aliases }
}
