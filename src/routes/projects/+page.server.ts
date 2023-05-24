import type { WakaProjectResult } from '$src/types/wakatime'
import type { PageServerLoad } from './$types'
import { ApiEndpoint, type DataContainer } from '$lib/constants'
import type { Database } from '$lib/database.types'

type Project = Database['public']['Tables']['projects']['Row']

export const load: PageServerLoad = async ({ fetch, locals: { supabase }, depends }) => {
  depends('supabase:projects')
  const response = await fetch(ApiEndpoint.Projects)
  const wakaProjects: WakaProjectResult = await response.json()
  const { data: supaProjects }: DataContainer<Project[] | null> = await supabase
    .from('projects')
    .select('*')
  return { wakaProjects, supaProjects }
}
