import dayjs from 'dayjs'
import type { RequestHandler } from './$types'
import { WAKA_API_KEY } from '$env/static/private'
import { json, error } from '@sveltejs/kit'

const WakaSliceBy = {
  None: '',
  Entity: 'entity',
  Language: 'language',
  Dependencies: 'dependencies',
  OS: 'os',
  Editor: 'editor',
  Machine: 'machine',
} as const

export type WakaDuration = {
  color: string | null
  duration: number
  project: string
  time: number
}

export type DurationsResult = {
  branches: string[]
  data: WakaDuration[]
  end: string
  start: string
  timezone: string
}

export const GET: RequestHandler = async ({ fetch, url }) => {
  // TODO: WakaDuration interface changes when slicing. Handle it.
  const baseUrl = 'https://wakatime.com'
  const resource = '/api/v1/users/current/durations'

  const date = url.searchParams.get('date') ?? dayjs().format('YYYY-MM-DD')
  const slice_by = url.searchParams.get('slice_by') ?? WakaSliceBy.None

  try {
    const response = await fetch(
      `${baseUrl}${resource}?api_key=${WAKA_API_KEY}&date=${date}&slice_by=${slice_by}`,
      {
        method: 'GET',
      },
    )
    const result = (await response.json()) as DurationsResult
    return json(result)
  } catch (err) {
    throw error(400, 'This is the way')
  }
}
