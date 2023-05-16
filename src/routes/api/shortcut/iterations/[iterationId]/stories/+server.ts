import { SHORTCUT_API_TOKEN } from '$env/static/private'
import { BaseUrl, RestResource } from '$lib/constants'
import type { StorySlim } from '$lib/generated/openapi/shortcut'
import { json, type RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ fetch, params }) => {
  const response = await fetch(
    `${BaseUrl.Shortcut}${RestResource.IterationStories(params.iterationId ?? '')}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Shortcut-Token': SHORTCUT_API_TOKEN,
      },
    },
  )
  const stories: StorySlim[] = await response.json()
  return json(stories)
}
