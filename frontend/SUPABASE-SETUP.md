# Supabase Setup Guide

## Environment Variables

1. Create a `.env.local` file in the frontend directory with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

You can find these values in your Supabase dashboard under Project Settings > API.

## Using Supabase in Components

### Server Components (RSC)

```tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { Database } from '../types/supabase'

export default async function Page() {
  const supabase = createServerComponentClient<Database>({ cookies })
  
  // Fetch data
  const { data: products } = await supabase
    .from('products')
    .select('*')
    
  return (
    <div>
      {products?.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  )
}
```

### Client Components

```tsx
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import type { Database } from '../types/supabase'

export default function ClientComponent() {
  const [products, setProducts] = useState<Database['public']['Tables']['products']['Row'][]>([])
  
  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        
      if (error) {
        console.error('Error fetching products:', error)
        return
      }
      
      setProducts(data || [])
    }
    
    fetchProducts()
  }, [])
  
  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  )
}
```

## Utility Functions

We've created utility functions in `lib/supabase-utils.ts` for common operations:

```typescript
import { getProducts, getNailDesigns, getUserProfile } from '../lib/supabase-utils'

// Example usage:
const products = await getProducts()
```

## Database Types

The TypeScript types for the database are defined in `types/supabase.ts`. These types match the tables in your Supabase database and provide type safety when querying data.

## Next Steps

1. Install the Supabase Auth Helpers for Next.js:
   ```
   npm install @supabase/auth-helpers-nextjs
   ```

2. Set up authentication middleware for protected routes
3. Implement a sign-in and sign-up flow
4. Create API routes for client-side mutations 