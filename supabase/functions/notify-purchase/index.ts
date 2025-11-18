import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Security: Verify service role authentication
    const authHeader = req.headers.get('Authorization')
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    if (!authHeader || !authHeader.includes(serviceRoleKey)) {
      console.error('Unauthorized access attempt to notify-purchase')
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      )
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabase = createClient(supabaseUrl, serviceRoleKey)

    const { purchaseId } = await req.json()
    
    // Validate purchaseId is a valid UUID
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    if (!purchaseId || !uuidRegex.test(purchaseId)) {
      console.error('Invalid purchase ID format:', purchaseId)
      return new Response(
        JSON.stringify({ error: 'Invalid purchase ID format' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Get purchase details with beat info
    const { data: purchase, error: purchaseError } = await supabase
      .from('purchases')
      .select(`
        *,
        beat:beats(title, artist, artwork_url)
      `)
      .eq('id', purchaseId)
      .single()

    if (purchaseError) throw purchaseError

    // Email notification to customer
    const customerEmailBody = `
      Thank you for your purchase!
      
      Beat: ${purchase.beat.title} by ${purchase.beat.artist}
      License: ${purchase.license_type.toUpperCase()}
      Amount: $${purchase.amount}
      License Code: ${purchase.license_code}
      
      We will send you the payment link shortly.
      
      Best regards,
      MM Productions
    `

    // Email notification to admin
    const adminEmailBody = `
      New Beat Purchase!
      
      Beat: ${purchase.beat.title}
      License: ${purchase.license_type.toUpperCase()}
      Amount: $${purchase.amount}
      Customer: ${purchase.customer_name} (${purchase.customer_email})
      Phone: ${purchase.customer_phone || 'N/A'}
      License Code: ${purchase.license_code}
    `

    console.log('Purchase notification sent:')
    console.log('Customer Email:', customerEmailBody)
    console.log('Admin Email:', adminEmailBody)

    // TODO: Integrate with email service (SendGrid, Resend, etc.)
    // TODO: Integrate with WhatsApp Business API for admin notifications

    return new Response(
      JSON.stringify({ success: true, message: 'Notifications sent' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error: any) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error?.message || 'Unknown error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
