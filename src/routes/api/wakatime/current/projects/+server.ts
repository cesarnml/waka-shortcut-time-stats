import { WAKA_API_KEY } from '$env/static/private'
import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ fetch, url }) => {
  const q = url.searchParams.get('q') ?? ''
  const page = url.searchParams.get('page') ?? 1

  const baseUrl = 'https://wakatime.com'
  const resource = '/api/v1/users/current/projects'

  const response = await fetch(
    `${baseUrl}${resource}?api_key=${WAKA_API_KEY}&page=${page}&q=${q}`,
    {
      method: 'GET',
    },
  )

  const result: WakaProjectResult = await response.json()
  return json(result)
}
