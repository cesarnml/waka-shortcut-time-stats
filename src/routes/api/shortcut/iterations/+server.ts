import { SHORTCUT_API_TOKEN } from '$env/static/private'
import type { IterationSlim } from '$lib/generated/openapi/shortcut'
import { json } from '@sveltejs/kit'

const BASE_URL = 'https://api.app.shortcut.com/api'
const VERSION = '/v3'
const RESOURCE = '/iterations'

export const GET = async ({ fetch }) => {
  const response = await fetch(`${BASE_URL}${VERSION}${RESOURCE}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Shortcut-Token': SHORTCUT_API_TOKEN,
    },
  })
  const iterations: IterationSlim[] = await response.json()
  return json(iterations)
}
