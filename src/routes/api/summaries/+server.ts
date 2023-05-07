import { json, type RequestHandler, error } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ locals: { supabase } }) => {
  const { data: summaries, error: err } = await supabase.from('summaries').select('*')

  if (err) {
    throw error(500, err)
  }
  return json(summaries)
}
