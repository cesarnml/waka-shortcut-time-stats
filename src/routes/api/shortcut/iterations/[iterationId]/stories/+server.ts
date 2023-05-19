import { SHORTCUT_API_TOKEN } from '$env/static/private'
import { BaseUrl, RestResource, type DataContainer } from '$lib/constants'
import type { StorySlim } from '$lib/generated/openapi/shortcut'
import { json, type RequestHandler } from '@sveltejs/kit'
import axios from 'axios'

export const GET: RequestHandler = async ({ params }) => {
  const headers = {
    'Shortcut-Token': SHORTCUT_API_TOKEN,
  }

  const { data: stories }: DataContainer<StorySlim[]> = await axios.get(
    `${BaseUrl.Shortcut}${RestResource.IterationStories(params.iterationId ?? '')}`,
    {
      headers,
    },
  )
  return json(stories)
}
