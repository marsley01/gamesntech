-- ============================================================
-- GAMESNTECH (GNT) — Complete Supabase Schema Migration
-- Run this in your Supabase SQL Editor
-- ============================================================

-- 0. ENUMS
CREATE TYPE user_role AS ENUM ('buyer', 'seller', 'admin');
CREATE TYPE product_category AS ENUM ('software', 'templates', 'ebooks', 'game_keys', 'courses', 'music', 'other');
CREATE TYPE product_status AS ENUM ('draft', 'active', 'suspended');
CREATE TYPE order_status AS ENUM ('pending', 'completed', 'failed', 'refunded');
CREATE TYPE payout_status AS ENUM ('pending', 'processing', 'completed', 'failed');

-- 1. PROFILES
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  role user_role NOT NULL DEFAULT 'buyer',
  mpesa_phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, role)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.email,
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'buyer')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 2. PRODUCTS
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category product_category NOT NULL,
  price INTEGER NOT NULL CHECK (price >= 0),
  file_url TEXT NOT NULL,
  cover_image_url TEXT,
  status product_status NOT NULL DEFAULT 'draft',
  total_sales INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_products_seller ON products(seller_id);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_category ON products(category);

-- 3. ORDERS
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  seller_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  amount_paid INTEGER NOT NULL CHECK (amount_paid >= 0),
  gnt_commission INTEGER NOT NULL CHECK (gnt_commission >= 0),
  seller_earnings INTEGER NOT NULL CHECK (seller_earnings >= 0),
  mpesa_phone TEXT NOT NULL,
  mpesa_checkout_request_id TEXT,
  mpesa_transaction_code TEXT,
  status order_status NOT NULL DEFAULT 'pending',
  download_token UUID NOT NULL DEFAULT gen_random_uuid(),
  download_expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_orders_buyer ON orders(buyer_id);
CREATE INDEX idx_orders_seller ON orders(seller_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_checkout_request ON orders(mpesa_checkout_request_id);
CREATE UNIQUE INDEX idx_orders_download_token ON orders(download_token);

-- 4. PAYOUTS
CREATE TABLE payouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL CHECK (amount >= 0),
  mpesa_phone TEXT NOT NULL,
  status payout_status NOT NULL DEFAULT 'pending',
  mpesa_transaction_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_payouts_seller ON payouts(seller_id);

-- 5. WALLET BALANCES
CREATE TABLE wallet_balances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  available_balance INTEGER NOT NULL DEFAULT 0 CHECK (available_balance >= 0),
  pending_balance INTEGER NOT NULL DEFAULT 0 CHECK (pending_balance >= 0),
  total_earned INTEGER NOT NULL DEFAULT 0 CHECK (total_earned >= 0),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX idx_wallet_seller ON wallet_balances(seller_id);

-- Auto-create wallet_balance when profile with role 'seller' is created
CREATE OR REPLACE FUNCTION public.handle_new_seller_wallet()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.role = 'seller' THEN
    INSERT INTO public.wallet_balances (seller_id)
    VALUES (NEW.id)
    ON CONFLICT (seller_id) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_profile_seller_wallet
  AFTER INSERT OR UPDATE OF role ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_seller_wallet();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallet_balances ENABLE ROW LEVEL SECURITY;

-- PROFILES: users can read own profile; admins full access
CREATE POLICY "Users view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins full access profiles"
  ON profiles FOR ALL
  USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'))
  WITH CHECK (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));

-- PRODUCTS: sellers manage own; buyers can see active only; admins full
CREATE POLICY "Sellers insert own products"
  ON products FOR INSERT
  WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Sellers view own products"
  ON products FOR SELECT
  USING (auth.uid() = seller_id OR status = 'active' OR auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));

CREATE POLICY "Sellers update own products"
  ON products FOR UPDATE
  USING (auth.uid() = seller_id);

CREATE POLICY "Sellers delete own products"
  ON products FOR DELETE
  USING (auth.uid() = seller_id);

CREATE POLICY "Admins full access products"
  ON products FOR ALL
  USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'))
  WITH CHECK (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));

-- ORDERS: buyer sees own; seller sees orders for own products; admins full
CREATE POLICY "Buyers view own orders"
  ON orders FOR SELECT
  USING (auth.uid() = buyer_id);

CREATE POLICY "Sellers view own orders"
  ON orders FOR SELECT
  USING (auth.uid() = seller_id);

CREATE POLICY "Admins full access orders"
  ON orders FOR ALL
  USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'))
  WITH CHECK (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));

-- PAYOUTS: sellers see own; admins full
CREATE POLICY "Sellers view own payouts"
  ON payouts FOR SELECT
  USING (auth.uid() = seller_id);

CREATE POLICY "Admins full access payouts"
  ON payouts FOR ALL
  USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'))
  WITH CHECK (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));

-- WALLET BALANCES: seller sees own; admins full
CREATE POLICY "Sellers view own wallet"
  ON wallet_balances FOR SELECT
  USING (auth.uid() = seller_id);

CREATE POLICY "Admins full access wallet"
  ON wallet_balances FOR ALL
  USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'))
  WITH CHECK (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));

-- ============================================================
-- STORAGE: gnt-products bucket
-- ============================================================

INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('gnt-products', 'gnt-products', false, 524288000)
ON CONFLICT (id) DO NOTHING;

-- Private bucket: only signed URLs allowed
CREATE POLICY "Sellers upload to gnt-products"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'gnt-products'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = 'sellers'
    AND (storage.foldername(name))[2] = auth.uid()::text
  );

CREATE POLICY "Sellers view own files"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'gnt-products'
    AND (storage.foldername(name))[1] = 'sellers'
    AND (storage.foldername(name))[2] = auth.uid()::text
  );

CREATE POLICY "Admins full access storage"
  ON storage.objects FOR ALL
  USING (
    bucket_id = 'gnt-products'
    AND auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
  )
  WITH CHECK (
    bucket_id = 'gnt-products'
    AND auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
  );

-- ============================================================
-- HELPER FUNCTIONS
-- ============================================================

CREATE OR REPLACE FUNCTION increment_product_sales(product_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE products
  SET total_sales = total_sales + 1
  WHERE id = product_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
