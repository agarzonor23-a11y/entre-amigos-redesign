
-- Create marketplace products table
CREATE TABLE public.marketplace_products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL DEFAULT 0,
  original_price NUMERIC,
  image_url TEXT,
  category TEXT NOT NULL DEFAULT 'general',
  badge TEXT,
  seller TEXT,
  location TEXT,
  stock INTEGER NOT NULL DEFAULT 0,
  features TEXT[],
  free_shipping BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.marketplace_products ENABLE ROW LEVEL SECURITY;

-- Anyone can read active products
CREATE POLICY "Anyone can read active products"
ON public.marketplace_products
FOR SELECT
USING (true);

-- Admins can insert products
CREATE POLICY "Admins can insert products"
ON public.marketplace_products
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Admins can update products
CREATE POLICY "Admins can update products"
ON public.marketplace_products
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can delete products
CREATE POLICY "Admins can delete products"
ON public.marketplace_products
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_marketplace_products_updated_at
BEFORE UPDATE ON public.marketplace_products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at();
