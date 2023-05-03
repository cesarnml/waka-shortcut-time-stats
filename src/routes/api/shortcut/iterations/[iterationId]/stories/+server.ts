import { SHORTCUT_API_TOKEN } from '$env/static/private'
import type { StorySlim } from '$lib/generated/openapi/shortcut'
import { json } from '@sveltejs/kit'

const BASE_URL = 'https://api.app.shortcut.com/api'
const VERSION = '/v3'

export const GET = async ({ fetch, params }) => {
  const RESOURCE = `/iterations/${params.iterationId}/stories`

  const response = await fetch(`${BASE_URL}${VERSION}${RESOURCE}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Shortcut-Token': SHORTCUT_API_TOKEN,
    },
  })
  const stories: StorySlim[] = await response.json()
  return json(stories)
}
