import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ request }) => {
  const payload = await request.json()

  console.log('payload:', payload)

  return json(payload)
}
