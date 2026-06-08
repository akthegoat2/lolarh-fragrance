-- LOLARH FRAGRANCE & SKINCARE - Supabase Database Schema
-- Run this in your Supabase SQL Editor

-- 1. Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  price DECIMAL(10, 2) NOT NULL,
  rating DECIMAL(2, 1) DEFAULT 0,
  category TEXT NOT NULL CHECK (category IN ('Fragrance', 'Skincare', 'Set')),
  image_url TEXT DEFAULT '',
  in_stock BOOLEAN DEFAULT true,
  is_editors_choice BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create storage bucket for product images
-- Run this in Supabase Storage dashboard or via SQL:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true);

-- 3. Set up Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow public read access (for the shop)
CREATE POLICY "Allow public read" ON products
  FOR SELECT USING (true);

-- Allow authenticated users full access (for admin dashboard)
CREATE POLICY "Allow authenticated insert" ON products
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update" ON products
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete" ON products
  FOR DELETE USING (auth.role() = 'authenticated');

-- 4. Storage bucket policy (make sure product-images bucket is public)
-- In Supabase Dashboard: Storage > product-images > Policies > make public
-- Or run:
CREATE POLICY "Allow public read images" ON storage.objects
  FOR SELECT USING (bucket_id = 'product-images');

CREATE POLICY "Allow authenticated upload images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');
