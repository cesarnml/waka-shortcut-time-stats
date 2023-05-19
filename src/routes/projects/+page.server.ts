import type { WakaProjectResult } from '$src/types/wakatime'
import type { PageServerLoad } from './$types'
import { ApiEndpoint, type DataContainer } from '$lib/constants'

type SupabaseProject = {
  id: string
  created_at: string
  updated_at: string
  name: string
  color: string | null
}

export const load: PageServerLoad = async ({ fetch, setHeaders, locals: { supabase } }) => {
  setHeaders({ 'Cache-Control': 'public, s-maxage=60,  max-age=60' })

  const response = await fetch(ApiEndpoint.Projects)
  const result: WakaProjectResult = await response.json()
  const { data: trackedProjects }: DataContainer<SupabaseProject[] | null> = await supabase
    .from('projects')
    .select('*')
  return { projectsResult: result, trackedProjects }
}
