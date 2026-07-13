export type UserRole = 'buyer' | 'seller' | 'admin';

export type ProductCategory = 'software' | 'templates' | 'ebooks' | 'game_keys' | 'courses' | 'music' | 'other';

export type ProductStatus = 'draft' | 'active' | 'suspended';

export type OrderStatus = 'pending' | 'completed' | 'failed' | 'refunded';

export type PayoutStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  role: UserRole;
  mpesa_phone: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface Product {
  id: string;
  seller_id: string;
  title: string;
  slug: string;
  description: string | null;
  category: ProductCategory;
  price: number;
  file_url: string;
  cover_image_url: string | null;
  status: ProductStatus;
  total_sales: number;
  created_at: string;
}

export interface Order {
  id: string;
  buyer_id: string | null;
  product_id: string;
  seller_id: string;
  amount_paid: number;
  gnt_commission: number;
  seller_earnings: number;
  mpesa_phone: string;
  mpesa_checkout_request_id: string | null;
  mpesa_transaction_code: string | null;
  status: OrderStatus;
  download_token: string;
  download_expires_at: string;
  created_at: string;
}

export interface Payout {
  id: string;
  seller_id: string;
  amount: number;
  mpesa_phone: string;
  status: PayoutStatus;
  mpesa_transaction_id: string | null;
  created_at: string;
}

export interface WalletBalance {
  id: string;
  seller_id: string;
  available_balance: number;
  pending_balance: number;
  total_earned: number;
  updated_at: string;
}

export interface CheckoutRequest {
  productId: string;
  buyerPhone: string;
  buyerEmail?: string;
}

export interface CheckoutResponse {
  orderId: string;
  checkoutRequestId: string;
  message: string;
}

export interface OrderStatusResponse {
  status: OrderStatus;
  mpesa_transaction_code: string | null;
}

export interface DashboardResponse {
  wallet_balance: {
    available: number;
    pending: number;
  };
  total_sales: number;
  recent_orders: Order[];
  top_products: (Product & { sale_count: number })[];
  total_earned: number;
}

export interface WithdrawRequest {
  amount: number;
}

export interface WithdrawResponse {
  message: string;
}

export interface UploadResponse {
  productId: string;
  status: ProductStatus;
}

export interface MpesaCallbackItem {
  Name: string;
  Value?: string | number;
}

export interface MpesaCallbackPayload {
  Body: {
    stkCallback: {
      MerchantRequestID: string;
      CheckoutRequestID: string;
      ResultCode: number;
      ResultDesc: string;
      CallbackMetadata?: {
        Item: MpesaCallbackItem[];
      };
    };
  };
}

export interface MpesaB2CResultParameter {
  Key: string;
  Value: string | number;
}

export interface MpesaB2CCallbackPayload {
  Result: {
    ResultType: number;
    ResultCode: number;
    ResultDesc: string;
    OriginatorConversationID: string;
    ConversationID: string;
    TransactionID: string;
    ResultParameters?: {
      ResultParameter: MpesaB2CResultParameter[];
    };
  };
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  'software',
  'templates',
  'ebooks',
  'game_keys',
  'courses',
  'music',
  'other',
];

export const GNT_COMMISSION_RATE = 0.25;
