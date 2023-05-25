import type { SupaSummary } from '$src/app'
import type { PostgrestError } from '@supabase/supabase-js'
import { error, json, type RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ locals: { supabase } }) => {
  const {
    data: summaries,
    error: err,
  }: { data: SupaSummary[] | null; error: PostgrestError | null } = await supabase
    .from('summaries')
    .select('*')

  if (err) {
    throw error(500, err)
  }
  return json(summaries)
}
