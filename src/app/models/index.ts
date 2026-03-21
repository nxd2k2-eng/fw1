export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: 'team_leader' | 'employee';
}

export interface Category { id: number; name: string; }
export interface Brand    { id: number; name: string; logo_url?: string; }

export interface ProductVariant {
  id: number;
  product_id: number;
  size: string;
  color: string;
  sku: string;
  stock: number;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  sale_price?: number;
  thumbnail_url?: string;
  category: string;
  brand: string;
  total_stock: number;
  is_active: boolean;
  variants?: ProductVariant[];
  images?: { image_url: string }[];
}

export interface PagedResult<T> {
  items: T[];
  pagination: { total: number; page: number; limit: number; pages: number };
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface OrderItem {
  variant_id: number;
  quantity: number;
  unit_price?: number;
  subtotal?: number;
  product_name?: string;
  size?: string;
  color?: string;
}

export interface CreateOrderRequest {
  customer: { full_name: string; phone: string; email?: string; address?: string };
  items: { variant_id: number; quantity: number }[];
  payment_method: 'cash' | 'bank_transfer' | 'cod';
  note?: string;
  coupon_code?: string;
}
