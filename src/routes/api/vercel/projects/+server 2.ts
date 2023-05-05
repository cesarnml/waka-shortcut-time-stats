import { VERCEL_API_TOKEN } from '$env/static/private'
import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import type { ProjectsResult } from '$src/types/vercel'

export const GET: RequestHandler = async () => {
  const baseUrl = 'https://api.vercel.com'
  const resource = '/v9/projects'
  const headers = {
    Authorization: `Bearer ${VERCEL_API_TOKEN}`,
    'Content-Type': 'application/json',
  }
  const response = await fetch(`${baseUrl}${resource}`, { headers })
  const projectResult: ProjectsResult = await response.json()
  return json(projectResult)
}
