-- ============================================================
-- GNT Migration 002 — Add slug to products
-- Run this AFTER the base migration
-- ============================================================

ALTER TABLE products ADD COLUMN IF NOT EXISTS slug TEXT;
CREATE UNIQUE INDEX IF NOT EXISTS idx_products_slug ON products(slug);

-- Generate slugs for existing products
UPDATE products
SET slug = LOWER(REGEXP_REPLACE(TRIM(title), '[^a-zA-Z0-9]+', '-', 'g'))
WHERE slug IS NULL;
