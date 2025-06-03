export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          subscription_tier: string | null
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          subscription_tier?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          subscription_tier?: string | null
          created_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          price: number
          type: string
          design_image_url: string
          tags: string[]
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          price: number
          type: string
          design_image_url: string
          tags?: string[]
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          price?: number
          type?: string
          design_image_url?: string
          tags?: string[]
          created_at?: string
        }
      }
      nail_designs: {
        Row: {
          id: string
          name: string
          design_type: string
          image_url: string
          creator_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          design_type: string
          image_url: string
          creator_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          design_type?: string
          image_url?: string
          creator_id?: string | null
          created_at?: string
        }
      }
      custom_sets: {
        Row: {
          id: string
          user_id: string
          name: string
          nail_layout: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          nail_layout: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          nail_layout?: Json
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          product_ids: string[]
          status: string
          total_price: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          product_ids: string[]
          status: string
          total_price: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          product_ids?: string[]
          status?: string
          total_price?: number
          created_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          tier: string
          start_date: string
          end_date: string | null
          stripe_customer_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          tier: string
          start_date: string
          end_date?: string | null
          stripe_customer_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          tier?: string
          start_date?: string
          end_date?: string | null
          stripe_customer_id?: string
          created_at?: string
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
  }
} 