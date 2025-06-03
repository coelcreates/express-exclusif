'use client'

import { useEffect, useState } from 'react'
import { api } from '../../lib/api'
import ClientDataDisplay from './components/ClientDataDisplay'

export default function ApiExamplePage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState({
    users: [],
    products: [],
    designs: []
  })

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        setError(null)
        
        // Fetch data in parallel using the API client
        const [users, products, designs] = await Promise.all([
          api.users.getAll(),
          api.products.getAll(),
          api.nailDesigns.getAll()
        ])
        
        setData({ users, products, designs })
      } catch (err) {
        console.error('Error fetching data:', err)
        setError('Failed to load data from the backend API')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div className="p-8">Loading data from backend API...</div>
  }

  if (error) {
    return <div className="p-8 text-red-500">{error}</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">API Integration Example</h1>
      <p className="mb-4">This page fetches data from the Express backend API instead of directly from Supabase.</p>
      
      <ClientDataDisplay 
        users={data.users} 
        products={data.products}
        designs={data.designs}
      />
    </div>
  )
} 