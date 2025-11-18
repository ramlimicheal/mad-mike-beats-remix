-- Create booking_slots table for admin to manage available time slots
CREATE TABLE public.booking_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_available BOOLEAN NOT NULL DEFAULT true,
  session_type TEXT NOT NULL CHECK (session_type IN ('mix_mastering', 'live_call')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(date, start_time, session_type)
);

-- Create bookings table for customer bookings
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slot_id UUID NOT NULL REFERENCES public.booking_slots(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  session_type TEXT NOT NULL CHECK (session_type IN ('mix_mastering', 'live_call')),
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  booking_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  CONSTRAINT customer_name_length CHECK (char_length(customer_name) <= 100),
  CONSTRAINT customer_email_length CHECK (char_length(customer_email) <= 255),
  CONSTRAINT customer_phone_length CHECK (customer_phone IS NULL OR char_length(customer_phone) <= 20),
  CONSTRAINT notes_length CHECK (notes IS NULL OR char_length(notes) <= 500)
);

-- Enable RLS
ALTER TABLE public.booking_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for booking_slots
CREATE POLICY "Anyone can view available slots"
ON public.booking_slots
FOR SELECT
USING (is_available = true OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage booking slots"
ON public.booking_slots
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for bookings
CREATE POLICY "Anyone can create bookings"
ON public.bookings
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Customers can view their own bookings"
ON public.bookings
FOR SELECT
USING (
  customer_email = (SELECT email FROM auth.users WHERE id = auth.uid())
  OR has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can manage all bookings"
ON public.bookings
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create indexes for performance
CREATE INDEX idx_booking_slots_date ON public.booking_slots(date);
CREATE INDEX idx_booking_slots_available ON public.booking_slots(is_available);
CREATE INDEX idx_bookings_customer_email ON public.bookings(customer_email);
CREATE INDEX idx_bookings_slot_id ON public.bookings(slot_id);
CREATE INDEX idx_bookings_status ON public.bookings(status);