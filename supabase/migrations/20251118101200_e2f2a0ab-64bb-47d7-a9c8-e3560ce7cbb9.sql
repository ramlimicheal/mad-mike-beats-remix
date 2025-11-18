-- Create enum for app roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table for admin management
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, role)
);

-- Create beats table
CREATE TABLE public.beats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  artist TEXT DEFAULT 'Mad Mike',
  bpm INTEGER NOT NULL,
  key TEXT NOT NULL,
  genre TEXT NOT NULL,
  mood TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  artwork_url TEXT NOT NULL,
  audio_url TEXT,
  soundcloud_url TEXT,
  price_basic INTEGER NOT NULL,
  price_premium INTEGER NOT NULL,
  price_exclusive INTEGER NOT NULL,
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create purchases table
CREATE TABLE public.purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  beat_id UUID REFERENCES public.beats(id) ON DELETE CASCADE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  license_type TEXT NOT NULL CHECK (license_type IN ('basic', 'premium', 'exclusive')),
  amount INTEGER NOT NULL,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed')),
  license_code TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.beats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS Policies for user_roles (admins can manage)
CREATE POLICY "Admins can view all user roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage user roles"
  ON public.user_roles FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for beats
CREATE POLICY "Anyone can view active beats"
  ON public.beats FOR SELECT
  USING (is_active = TRUE OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert beats"
  ON public.beats FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update beats"
  ON public.beats FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete beats"
  ON public.beats FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for purchases
CREATE POLICY "Admins can view all purchases"
  ON public.purchases FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can create purchases"
  ON public.purchases FOR INSERT
  WITH CHECK (TRUE);

CREATE POLICY "Admins can update purchases"
  ON public.purchases FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('beat-audio', 'beat-audio', TRUE, 52428800, ARRAY['audio/mpeg', 'audio/mp3']),
  ('beat-artwork', 'beat-artwork', TRUE, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp']);

-- Storage policies for beat-audio
CREATE POLICY "Public can view audio files"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'beat-audio');

CREATE POLICY "Admins can upload audio files"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'beat-audio' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update audio files"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'beat-audio' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete audio files"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'beat-audio' AND public.has_role(auth.uid(), 'admin'));

-- Storage policies for beat-artwork
CREATE POLICY "Public can view artwork files"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'beat-artwork');

CREATE POLICY "Admins can upload artwork files"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'beat-artwork' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update artwork files"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'beat-artwork' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete artwork files"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'beat-artwork' AND public.has_role(auth.uid(), 'admin'));

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Trigger for beats updated_at
CREATE TRIGGER update_beats_updated_at
  BEFORE UPDATE ON public.beats
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

-- Generate unique license codes
CREATE OR REPLACE FUNCTION public.generate_license_code()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN UPPER(SUBSTRING(MD5(RANDOM()::TEXT || CLOCK_TIMESTAMP()::TEXT) FROM 1 FOR 16));
END;
$$;

-- Trigger to auto-generate license codes
CREATE OR REPLACE FUNCTION public.set_license_code()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.license_code IS NULL THEN
    NEW.license_code = public.generate_license_code();
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_purchase_license_code
  BEFORE INSERT ON public.purchases
  FOR EACH ROW
  EXECUTE FUNCTION public.set_license_code();