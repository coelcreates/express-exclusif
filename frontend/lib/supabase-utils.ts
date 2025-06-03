import { supabase } from './supabaseClient'
import type { Database } from '../types/supabase'

// Products
export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching products:', error)
    return []
  }
  
  return data
}

// Nail Designs
export async function getNailDesigns() {
  const { data, error } = await supabase
    .from('nail_designs')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching nail designs:', error)
    return []
  }
  
  return data
}

// Users
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()
  
  if (error) {
    console.error('Error fetching user profile:', error)
    return null
  }
  
  return data
}

// Custom Sets
export async function saveCustomSet(
  userId: string, 
  name: string, 
  nailLayout: Database['public']['Tables']['custom_sets']['Insert']['nail_layout']
) {
  const { data, error } = await supabase
    .from('custom_sets')
    .insert({
      user_id: userId,
      name,
      nail_layout: nailLayout
    })
    .select()
    .single()
  
  if (error) {
    console.error('Error saving custom set:', error)
    return null
  }
  
  return data
}

// Orders
export async function createOrder(
  userId: string,
  productIds: string[],
  totalPrice: number
) {
  const { data, error } = await supabase
    .from('orders')
    .insert({
      user_id: userId,
      product_ids: productIds,
      status: 'pending',
      total_price: totalPrice
    })
    .select()
    .single()
  
  if (error) {
    console.error('Error creating order:', error)
    return null
  }
  
  return data
}

// Subscriptions
export async function getUserSubscription(userId: string) {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()
  
  if (error) {
    if (error.code === 'PGRST116') {
      // No subscription found
      return null
    }
    console.error('Error fetching subscription:', error)
    return null
  }
  
  return data
} 