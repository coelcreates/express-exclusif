export interface SupabaseError {
  code: string;
  details?: string;
  hint?: string;
  message: string;
}

export interface ApiError extends Error {
  statusCode?: number;
  details?: any;
  code?: string;
}

export function isSupabaseError(error: any): error is SupabaseError {
  return error && typeof error === 'object' && 'code' in error && 'message' in error;
} 