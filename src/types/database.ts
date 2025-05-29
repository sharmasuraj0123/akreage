export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string
          avatar: string | null
          bio: string | null
          wallet_address: string | null
          followers: number
          following: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          avatar?: string | null
          bio?: string | null
          wallet_address?: string | null
          followers?: number
          following?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          avatar?: string | null
          bio?: string | null
          wallet_address?: string | null
          followers?: number
          following?: number
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          name: string
          description: string | null
          image: string | null
          images: string[] | null
          developer_id: string | null
          owner_id: string | null
          location: string | null
          property_type: string | null
          price: number | null
          min_investment: number
          funding_goal: number
          funding_raised: number
          funding_deadline: string | null
          expected_return: number | null
          token_symbol: string
          nft_contract_address: string | null
          properties_count: number
          progress: number
          status: string
          duration: number | null
          start_date: string | null
          likes: number
          investor_count: number
          approved: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          image?: string | null
          images?: string[] | null
          developer_id?: string | null
          owner_id?: string | null
          location?: string | null
          property_type?: string | null
          price?: number | null
          min_investment?: number
          funding_goal: number
          funding_raised?: number
          funding_deadline?: string | null
          expected_return?: number | null
          token_symbol?: string
          nft_contract_address?: string | null
          properties_count?: number
          progress?: number
          status?: string
          duration?: number | null
          start_date?: string | null
          likes?: number
          investor_count?: number
          approved?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          image?: string | null
          images?: string[] | null
          developer_id?: string | null
          owner_id?: string | null
          location?: string | null
          property_type?: string | null
          price?: number | null
          min_investment?: number
          funding_goal?: number
          funding_raised?: number
          funding_deadline?: string | null
          expected_return?: number | null
          token_symbol?: string
          nft_contract_address?: string | null
          properties_count?: number
          progress?: number
          status?: string
          duration?: number | null
          start_date?: string | null
          likes?: number
          investor_count?: number
          approved?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      milestones: {
        Row: {
          id: string
          title: string
          date: string | null
          status: string | null
          description: string | null
          project_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          date?: string | null
          status?: string | null
          description?: string | null
          project_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          date?: string | null
          status?: string | null
          description?: string | null
          project_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      documents: {
        Row: {
          id: string
          name: string
          url: string
          type: string | null
          uploaded_at: string | null
          project_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          url: string
          type?: string | null
          uploaded_at?: string | null
          project_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          url?: string
          type?: string | null
          uploaded_at?: string | null
          project_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      user_project_likes: {
        Row: {
          id: string
          user_id: string | null
          project_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          project_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          project_id?: string | null
          created_at?: string
        }
      }
      ausd_token: {
        Row: {
          id: string
          name: string
          symbol: string
          decimals: number
          address: string
          logo_uri: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          symbol: string
          decimals: number
          address: string
          logo_uri?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          symbol?: string
          decimals?: number
          address?: string
          logo_uri?: string | null
          created_at?: string
          updated_at?: string
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
} 