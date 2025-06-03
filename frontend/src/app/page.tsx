import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { Database } from '../../types/supabase'
import ClientDataDisplay from './components/ClientDataDisplay'

export default async function Home() {
  // Create a Supabase client for server components
  const supabase = createServerComponentClient<Database>({ cookies })
  
  // Fetch data in parallel
  const [usersPromise, productsPromise, designsPromise] = await Promise.allSettled([
    supabase.from('users').select('*'),
    supabase.from('products').select('*'),
    supabase.from('nail_designs').select('*')
  ])
  
  // Process results
  const users = usersPromise.status === 'fulfilled' ? usersPromise.value.data || [] : []
  const products = productsPromise.status === 'fulfilled' ? productsPromise.value.data || [] : []
  const designs = designsPromise.status === 'fulfilled' ? designsPromise.value.data || [] : []
  
  // Check for errors
  const errors = [
    usersPromise.status === 'rejected' ? usersPromise.reason : null,
    productsPromise.status === 'rejected' ? productsPromise.reason : null,
    designsPromise.status === 'rejected' ? designsPromise.reason : null
  ].filter(Boolean)
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Exclusive Nails Dashboard</h1>
      
      {errors.length > 0 && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <h2 className="text-lg font-semibold text-red-600 mb-2">Errors</h2>
          <ul className="list-disc pl-5 text-red-600">
            {errors.map((error, index) => (
              <li key={index}>{String(error)}</li>
            ))}
          </ul>
        </div>
      )}
      
      <ClientDataDisplay 
        users={users} 
        products={products} 
        designs={designs} 
      />
    </div>
  )
}
