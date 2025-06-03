import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/supabase';
import type { Database } from '../types/database';
import { SupabaseError, isSupabaseError } from '../types/supabase-error';
import { ProductCreateBody, ProductUpdateBody } from '../types/request-types';

/**
 * Get all products
 * @route GET /api/products
 */
export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    res.status(200).json({
      success: true,
      count: data.length,
      data: data,
    });
  } catch (error) {
    if (isSupabaseError(error)) {
      next({
        message: `Supabase error: ${error.message}`,
        statusCode: 500,
        details: error,
      });
    } else {
      next(error);
    }
  }
};

/**
 * Get product by ID
 * @route GET /api/products/:id
 */
export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        res.status(404).json({
          success: false,
          message: 'Product not found',
        });
        return;
      }
      throw error;
    }

    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    if (isSupabaseError(error)) {
      next({
        message: `Supabase error: ${error.message}`,
        statusCode: 500,
        details: error,
      });
    } else {
      next(error);
    }
  }
};

/**
 * Create a new product
 * @route POST /api/products
 */
export const createProduct = async (
  req: Request<{}, {}, ProductCreateBody>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, price, type, design_image_url, tags } = req.body;

    // Validate input
    if (!name || price === undefined || !type || !design_image_url) {
      res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
      return;
    }

    const { data, error } = await supabase
      .from('products')
      .insert({
        name,
        price,
        type,
        design_image_url,
        tags: tags || [],
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    res.status(201).json({
      success: true,
      data: data,
    });
  } catch (error) {
    if (isSupabaseError(error)) {
      next({
        message: `Supabase error: ${error.message}`,
        statusCode: 500,
        details: error,
      });
    } else {
      next(error);
    }
  }
};

/**
 * Update a product
 * @route PUT /api/products/:id
 */
export const updateProduct = async (
  req: Request<{ id: string }, {}, ProductUpdateBody>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, price, type, design_image_url, tags } = req.body;

    // Check if product exists
    const { data: existingProduct, error: fetchError } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        res.status(404).json({
          success: false,
          message: 'Product not found',
        });
        return;
      }
      throw fetchError;
    }

    // Update product
    const { data, error } = await supabase
      .from('products')
      .update({
        name: name ?? existingProduct.name,
        price: price ?? existingProduct.price,
        type: type ?? existingProduct.type,
        design_image_url: design_image_url ?? existingProduct.design_image_url,
        tags: tags ?? existingProduct.tags,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    if (isSupabaseError(error)) {
      next({
        message: `Supabase error: ${error.message}`,
        statusCode: 500,
        details: error,
      });
    } else {
      next(error);
    }
  }
};

/**
 * Delete a product
 * @route DELETE /api/products/:id
 */
export const deleteProduct = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    // Check if product exists
    const { data: existingProduct, error: fetchError } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        res.status(404).json({
          success: false,
          message: 'Product not found',
        });
        return;
      }
      throw fetchError;
    }

    // Delete product
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    if (isSupabaseError(error)) {
      next({
        message: `Supabase error: ${error.message}`,
        statusCode: 500,
        details: error,
      });
    } else {
      next(error);
    }
  }
}; 