-- Fix Issue #1: Allow customers to view their own purchases
-- This enables customers to retrieve license codes and view purchase history

CREATE POLICY "Customers can view own purchases by email" 
ON public.purchases
FOR SELECT
USING (
  customer_email = (SELECT email FROM auth.users WHERE id = auth.uid())
  OR has_role(auth.uid(), 'admin'::app_role)
);

-- Add database constraints for input validation (Issue #2)
ALTER TABLE public.purchases
ADD CONSTRAINT customer_name_length CHECK (char_length(customer_name) <= 100),
ADD CONSTRAINT customer_email_length CHECK (char_length(customer_email) <= 255),
ADD CONSTRAINT customer_phone_length CHECK (customer_phone IS NULL OR char_length(customer_phone) <= 20);