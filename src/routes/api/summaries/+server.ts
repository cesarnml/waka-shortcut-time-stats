import type { Database } from '$lib/database.types'
import type { PostgrestError } from '@supabase/supabase-js'
import { json, type RequestHandler, error } from '@sveltejs/kit'

type Summary = Database['public']['Tables']['summaries']['Row']

export const GET: RequestHandler = async ({ locals: { supabase } }) => {
  const { data: summaries, error: err }: { data: Summary[] | null; error: PostgrestError | null } =
    await supabase.from('summaries').select('*')

  if (err) {
    throw error(500, err)
  }
  return json(summaries)
}
