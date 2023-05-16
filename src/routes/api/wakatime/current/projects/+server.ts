import { WAKA_API_KEY } from '$env/static/private'
import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import type { WakaProjectResult } from '$src/types/wakatime'
import { BaseUrl, RestResource } from '$lib/constants'

export const GET: RequestHandler = async ({ fetch, url }) => {
  const q = url.searchParams.get('q') ?? ''
  const page = url.searchParams.get('page') ?? 1

  const response = await fetch(
    `${BaseUrl.WakaTime}${RestResource.Projects}?api_key=${WAKA_API_KEY}&page=${page}&q=${q}`,
  )

  const result: WakaProjectResult = await response.json()
  return json(result)
}
