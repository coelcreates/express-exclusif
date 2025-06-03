import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/supabase'

// These environment variables are automatically loaded from .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Check if environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  // In development, throw an error to help with debugging
  if (process.env.NODE_ENV === 'development') {
    throw new Error(
      'Missing Supabase environment variables. Please check your .env.local file.'
    )
  }
  
  // In production, log the error but don't crash
  console.error(
    'Missing Supabase environment variables. Authentication and data fetching will not work.'
  )
}

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(
  supabaseUrl || 'https://placeholder-url.supabase.co', // Fallback values to prevent runtime errors
  supabaseAnonKey || 'placeholder-key'
) 