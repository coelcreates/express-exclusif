import type { Database } from '../types/supabase';

// Types
type User = Database['public']['Tables']['users']['Row'];
type Product = Database['public']['Tables']['products']['Row'];
type NailDesign = Database['public']['Tables']['nail_designs']['Row'];
type CustomSet = Database['public']['Tables']['custom_sets']['Row'];
type Order = Database['public']['Tables']['orders']['Row'];
type Subscription = Database['public']['Tables']['subscriptions']['Row'];

// Base API URL (defaulting to local development URL if not specified)
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Error handling
class ApiError extends Error {
  status: number;
  data?: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

// Helper function to handle API responses
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(
      errorData.message || `API request failed with status ${response.status}`,
      response.status,
      errorData
    );
  }
  return response.json();
}

// Base fetch with error handling
async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const url = `${API_URL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    return handleResponse<T>(response);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      error instanceof Error ? error.message : 'Unknown error occurred',
      500
    );
  }
}

// Products API
export const productsApi = {
  getAll: async (): Promise<Product[]> => {
    const response = await fetchApi<{ data: Product[] }>('/products');
    return response.data;
  },

  getById: async (id: string): Promise<Product> => {
    const response = await fetchApi<{ data: Product }>(`/products/${id}`);
    return response.data;
  },

  create: async (product: Omit<Product, 'id' | 'created_at'>): Promise<Product> => {
    const response = await fetchApi<{ data: Product }>('/products', {
      method: 'POST',
      body: JSON.stringify(product),
    });
    return response.data;
  },

  update: async (id: string, product: Partial<Product>): Promise<Product> => {
    const response = await fetchApi<{ data: Product }>(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
    });
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await fetchApi<{ success: boolean }>(`/products/${id}`, {
      method: 'DELETE',
    });
  },
};

// Users API
export const usersApi = {
  getAll: async (): Promise<User[]> => {
    const response = await fetchApi<{ data: User[] }>('/users');
    return response.data;
  },

  getById: async (id: string): Promise<User> => {
    const response = await fetchApi<{ data: User }>(`/users/${id}`);
    return response.data;
  },
};

// Nail Designs API
export const nailDesignsApi = {
  getAll: async (): Promise<NailDesign[]> => {
    const response = await fetchApi<{ data: NailDesign[] }>('/nail-designs');
    return response.data;
  },

  getById: async (id: string): Promise<NailDesign> => {
    const response = await fetchApi<{ data: NailDesign }>(`/nail-designs/${id}`);
    return response.data;
  },
};

// Export all APIs
export const api = {
  products: productsApi,
  users: usersApi,
  nailDesigns: nailDesignsApi,
}; 