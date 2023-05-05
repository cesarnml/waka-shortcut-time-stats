import { VERCEL_API_TOKEN } from '$env/static/private'
import { json } from '@sveltejs/kit'
import type { RequestHandler } from '../$types'
import type { AliasesResult } from '$src/types/vercel'

export const GET: RequestHandler = async ({ params }) => {
  debugger
  const projectId = params.projectId
  console.log('projectId HERE:', projectId)
  debugger

  const baseUrl = 'https://api.vercel.com'
  const resource = '/v4/aliases'
  const headers = {
    Authorization: `Bearer ${VERCEL_API_TOKEN}`,
    'Content-Type': 'application/json',
  }
  debugger
  const response = await fetch(`${baseUrl}${resource}?projectId${projectId}`, { headers })
  debugger
  const aliasesResult: AliasesResult = await response.json()
  debugger
  console.log('aliasesResult:', aliasesResult)
  return json(aliasesResult)
}
