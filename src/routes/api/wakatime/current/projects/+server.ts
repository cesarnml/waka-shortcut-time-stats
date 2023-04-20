import { WAKA_API_KEY } from '$env/static/private'
import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export type WakaSnippet = {
  content: string
  name: string
}

export type WakaBadgeSlim = {
  color: string
  created_at: string
  id: string
  left_text: string
  link: string
  project_id: string
  title: string
  url: string
  snippets: WakaSnippet[]
}

export type WakaBadge = WakaBadgeSlim & {
  provider: string
  repository: string
}

export type WakaRepository = {
  created_at: string
  default_branch: string
  description: string | null
  fork_count: number
  full_name: string
  homepage: string
  html_url: string
  id: string
  image_icon_url: string
  is_fork: boolean
  is_private: boolean
  last_synced_at: string | null
  modified_at: string
  name: string
  provider: string
  star_count: number
  url: string
  urlencoded_name: string
  wakatime_project_name: string
  watch_count: number
}

export type WakaProject = {
  color: string
  created_at: string
  has_public_url: boolean
  human_readable_last_heartbeat_at: string
  id: string
  last_heartbeat_at: string
  name: string
  url: string
  urlencoded_name: string
  badge: WakaBadgeSlim
  repository: WakaRepository
}

export type WakaProjectResult = {
  data: WakaProject[]
  next_page: number
  page: number
  prev_page: number
  total: number
  total_pages: number
}

export const GET: RequestHandler = async ({ fetch, url }) => {
  const q = url.searchParams.get('q') ?? ''
  const page = url.searchParams.get('page') ?? 1

  const baseUrl = 'https://wakatime.com'
  const resource = '/api/v1/users/current/projects'

  const response = await fetch(
    `${baseUrl}${resource}?api_key=${WAKA_API_KEY}&page=${page}&q=${q}`,
    {
      method: 'GET',
    },
  )

  const result: WakaProjectResult = await response.json()
  return json(result)
}
