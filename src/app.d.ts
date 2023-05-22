import { SupabaseClient, Session } from '@supabase/supabase-js'

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    interface Error {
      name?: string
      stack?: string
      errorId?: string
    }
    interface Locals {
      supabase: SupabaseClient
      getSession(): Promise<Session | null>
      getProfile(): Promise<Record<string, any> | null>
    }
    interface PageData {
      session: Session | null
    }
    // interface Platform {}
  }
}

export {}
