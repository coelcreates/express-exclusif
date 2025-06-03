import { Database } from './database';

// Product types
export type ProductCreateBody = {
  name: string;
  price: number;
  type: string;
  design_image_url: string;
  tags?: string[];
};

export type ProductUpdateBody = Partial<ProductCreateBody>;

// User types
export type UserCreateBody = {
  email: string;
  subscription_tier?: string | null;
};

export type UserUpdateBody = Partial<UserCreateBody>;

// Nail Design types
export type NailDesignCreateBody = {
  name: string;
  design_type: string;
  image_url: string;
  creator_id?: string | null;
};

export type NailDesignUpdateBody = Partial<NailDesignCreateBody>;

// Custom Set types
export type CustomSetCreateBody = {
  user_id: string;
  name: string;
  nail_layout: Database['public']['Tables']['custom_sets']['Insert']['nail_layout'];
};

export type CustomSetUpdateBody = Partial<CustomSetCreateBody>;

// Order types
export type OrderCreateBody = {
  user_id: string;
  product_ids: string[];
  status: string;
  total_price: number;
};

export type OrderUpdateBody = Partial<OrderCreateBody>;

// Subscription types
export type SubscriptionCreateBody = {
  user_id: string;
  tier: string;
  start_date: string;
  end_date?: string | null;
  stripe_customer_id: string;
};

export type SubscriptionUpdateBody = Partial<SubscriptionCreateBody>; 