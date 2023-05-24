export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      durations: {
        Row: {
          created_at: string | null
          data: Json | null
          date: string
          id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          data?: Json | null
          date: string
          id?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          data?: Json | null
          date?: string
          id?: string
          updated_at?: string | null
        }
      }
      durations_by_language: {
        Row: {
          created_at: string | null
          data: Json | null
          date: string
          id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          data?: Json | null
          date: string
          id?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          data?: Json | null
          date?: string
          id?: string
          updated_at?: string | null
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          id: string
          isPro: boolean | null
          name: string | null
          range: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          id: string
          isPro?: boolean | null
          name?: string | null
          range?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          isPro?: boolean | null
          name?: string | null
          range?: string | null
          updated_at?: string | null
        }
      }
      project_summaries: {
        Row: {
          branches: Json | null
          categories: Json | null
          created_at: string | null
          date: string | null
          dependencies: Json | null
          editors: Json | null
          entities: Json | null
          grand_total: Json | null
          id: string
          languages: Json | null
          machines: Json | null
          operating_systems: Json | null
          project_id: string
          range: Json | null
          updated_at: string | null
        }
        Insert: {
          branches?: Json | null
          categories?: Json | null
          created_at?: string | null
          date?: string | null
          dependencies?: Json | null
          editors?: Json | null
          entities?: Json | null
          grand_total?: Json | null
          id?: string
          languages?: Json | null
          machines?: Json | null
          operating_systems?: Json | null
          project_id: string
          range?: Json | null
          updated_at?: string | null
        }
        Update: {
          branches?: Json | null
          categories?: Json | null
          created_at?: string | null
          date?: string | null
          dependencies?: Json | null
          editors?: Json | null
          entities?: Json | null
          grand_total?: Json | null
          id?: string
          languages?: Json | null
          machines?: Json | null
          operating_systems?: Json | null
          project_id?: string
          range?: Json | null
          updated_at?: string | null
        }
      }
      projects: {
        Row: {
          color: string | null
          created_at: string | null
          id: string
          is_tracked: boolean | null
          name: string | null
          updated_at: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          id?: string
          is_tracked?: boolean | null
          name?: string | null
          updated_at?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          id?: string
          is_tracked?: boolean | null
          name?: string | null
          updated_at?: string | null
        }
      }
      summaries: {
        Row: {
          categories: Json | null
          created_at: string | null
          date: string
          dependencies: Json | null
          editors: Json | null
          grand_total: Json | null
          id: string
          languages: Json | null
          machines: Json | null
          operating_systems: Json | null
          projects: Json | null
          range: Json | null
          updated_at: string | null
        }
        Insert: {
          categories?: Json | null
          created_at?: string | null
          date: string
          dependencies?: Json | null
          editors?: Json | null
          grand_total?: Json | null
          id?: string
          languages?: Json | null
          machines?: Json | null
          operating_systems?: Json | null
          projects?: Json | null
          range?: Json | null
          updated_at?: string | null
        }
        Update: {
          categories?: Json | null
          created_at?: string | null
          date?: string
          dependencies?: Json | null
          editors?: Json | null
          grand_total?: Json | null
          id?: string
          languages?: Json | null
          machines?: Json | null
          operating_systems?: Json | null
          projects?: Json | null
          range?: Json | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

