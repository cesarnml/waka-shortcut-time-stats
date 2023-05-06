import { VERCEL_API_TOKEN } from '$env/static/private'
import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import type { AliasesResult } from '$src/types/vercel'

export const GET: RequestHandler = async ({ url }) => {
  const projectId = url.searchParams.get('projectId')

  const baseUrl = 'https://api.vercel.com'
  const resource = '/v4/aliases'
  const headers = {
    Authorization: `Bearer ${VERCEL_API_TOKEN}`,
    'Content-Type': 'application/json',
  }

  const response = await fetch(`${baseUrl}${resource}?projectId${projectId}&limit=100`, { headers })
  const aliasesResult: AliasesResult = await response.json()

  return json(aliasesResult)
}
