'use client'

import { useState } from 'react'
import type { Database } from '../../../types/supabase'

type User = Database['public']['Tables']['users']['Row']
type Product = Database['public']['Tables']['products']['Row']
type NailDesign = Database['public']['Tables']['nail_designs']['Row']

interface ClientDataDisplayProps {
  users: User[]
  products: Product[]
  designs: NailDesign[]
}

const formatDate = (dateStr: string): string => {
  try {
    return new Date(dateStr).toLocaleDateString();
  } catch (error) {
    console.error('Error parsing date:', error);
    return dateStr; // Return the original string if parsing fails
  }
};

export default function ClientDataDisplay({ users, products, designs }: ClientDataDisplayProps) {
  const [activeTab, setActiveTab] = useState<'users' | 'products' | 'designs'>('users')
  
  return (
    <div>
      {/* Tab Navigation */}
      <div className="flex border-b mb-6">
        <button 
          className={`px-4 py-2 ${activeTab === 'users' ? 'border-b-2 border-blue-500 font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveTab('users')}
        >
          Users ({users.length})
        </button>
        <button 
          className={`px-4 py-2 ${activeTab === 'products' ? 'border-b-2 border-blue-500 font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveTab('products')}
        >
          Products ({products.length})
        </button>
        <button 
          className={`px-4 py-2 ${activeTab === 'designs' ? 'border-b-2 border-blue-500 font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveTab('designs')}
        >
          Nail Designs ({designs.length})
        </button>
      </div>
      
      {/* Users Table */}
      {activeTab === 'users' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Users</h2>
          {users.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscription</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.subscription_tier || 'Free'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(user.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-4 bg-gray-50 rounded-lg">
              <p>No users found</p>
            </div>
          )}
        </div>
      )}
      
      {/* Products Table */}
      {activeTab === 'products' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Products</h2>
          {products.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tags</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.tags && product.tags.join(', ')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-4 bg-gray-50 rounded-lg">
              <p>No products found</p>
            </div>
          )}
        </div>
      )}
      
      {/* Nail Designs Table */}
      {activeTab === 'designs' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Nail Designs</h2>
          {designs.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Creator</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {designs.map((design) => (
                    <tr key={design.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{design.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{design.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{design.design_type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{design.creator_id || 'System'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <a 
                          href={design.image_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          View
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-4 bg-gray-50 rounded-lg">
              <p>No nail designs found</p>
            </div>
          )}
        </div>
      )}
      
      {/* Debug Data */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-medium mb-2">Debug Data</h3>
        <details>
          <summary className="cursor-pointer text-blue-500">Show raw data</summary>
          <div className="mt-4 overflow-auto">
            <h4 className="font-medium">Users</h4>
            <pre className="bg-gray-100 p-2 rounded text-sm">{JSON.stringify(users, null, 2)}</pre>
            
            <h4 className="font-medium mt-4">Products</h4>
            <pre className="bg-gray-100 p-2 rounded text-sm">{JSON.stringify(products, null, 2)}</pre>
            
            <h4 className="font-medium mt-4">Designs</h4>
            <pre className="bg-gray-100 p-2 rounded text-sm">{JSON.stringify(designs, null, 2)}</pre>
          </div>
        </details>
      </div>
    </div>
  )
} 