import { SHORTCUT_API_TOKEN } from '$env/static/private'
import { BaseUrl, RestResource, type DataContainer } from '$lib/constants'
import type { IterationSlim } from '$lib/generated/openapi/shortcut'
import { json, type RequestHandler } from '@sveltejs/kit'
import axios from 'axios'

export const GET: RequestHandler = async () => {
  const headers = {
    'Shortcut-Token': SHORTCUT_API_TOKEN,
  }
  const { data: iterations }: DataContainer<IterationSlim[]> = await axios.get(
    `${BaseUrl.Shortcut}${RestResource.Iterations}`,
    { headers },
  )
  return json(iterations)
}
