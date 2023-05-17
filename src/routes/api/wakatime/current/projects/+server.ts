import { WAKA_API_KEY } from '$env/static/private'
import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import type { WakaProjectResult } from '$src/types/wakatime'
import { BaseUrl, RestResource, type ToData } from '$lib/constants'
import axios from 'axios'

export const GET: RequestHandler = async ({ url }) => {
  const q = url.searchParams.get('q') ?? ''
  const page = url.searchParams.get('page') ?? 1

  const { data: result }: ToData<WakaProjectResult> = await axios.get(
    `${BaseUrl.WakaTime}${RestResource.Projects}?api_key=${WAKA_API_KEY}&page=${page}&q=${q}`,
  )

  return json(result)
}
