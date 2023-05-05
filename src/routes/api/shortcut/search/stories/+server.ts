import { SHORTCUT_API_TOKEN } from '$env/static/private'
import type { StorySearchResults } from '$lib/generated/openapi/shortcut'
import { json, type RequestHandler } from '@sveltejs/kit'

const BASE_URL = 'https://api.app.shortcut.com/api/v3'
const RESOURCE = '/search/stories'

export const GET: RequestHandler = async ({ fetch, url }) => {
  const query = url.searchParams.get('query')

  const response = await fetch(`${BASE_URL}${RESOURCE}?query=${query}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Shortcut-Token': SHORTCUT_API_TOKEN,
    },
  })
  const storySearchResults: StorySearchResults = await response.json()
  return json(storySearchResults)
}
