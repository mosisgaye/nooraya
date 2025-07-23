import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import * as crypto from 'https://deno.land/std@0.177.0/crypto/mod.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface PayTechCallback {
  msg: string
  status: 'SUCCESS' | 'FAILLED'
  sha256Hash: string
  transaction: {
    phone: string
    amount: number
    codeService: string
    nameService: string
    commission: number
    transactionId: string
    sousServiceTransactionId?: string
    currentBalance: number
    balanceBeforeTransactionInit: number
    balanceAfterTransactionInit: number
    externalTransactionId: string
    callbackUrl: string
    errorType?: {
      message: string
      code: string
      codeService: string
      id: number
    }
    data?: any
  }
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get request body
    const body: PayTechCallback = await req.json()
    console.log('Received PayTech callback:', body)

    // Get environment variables
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const paytechApiKey = Deno.env.get('PAYTECH_API_KEY')!

    // Verify SHA256 hash
    const { transactionId, externalTransactionId } = body.transaction
    const expectedHash = await crypto.subtle.digest(
      'SHA-256',
      new TextEncoder().encode(`${transactionId}|${externalTransactionId}|${paytechApiKey}`)
    )
    const expectedHashHex = Array.from(new Uint8Array(expectedHash))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')

    if (expectedHashHex !== body.sha256Hash) {
      console.error('Invalid SHA256 hash')
      return new Response(
        JSON.stringify({ error: 'Invalid hash' }),
        { 
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Initialize Supabase client with service role
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Update payment status
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .update({
        status: body.status.toLowerCase() === 'success' ? 'success' : 'failed',
        paytech_transaction_id: transactionId,
        callback_data: body,
        error_message: body.transaction.errorType?.message || null,
        updated_at: new Date().toISOString()
      })
      .eq('paytech_external_id', externalTransactionId)
      .select()
      .single()

    // Log the callback
    await supabase
      .from('payment_logs')
      .insert({
        payment_id: payment?.id,
        action: 'callback_received',
        details: {
          status: body.status,
          transaction_id: transactionId,
          amount: body.transaction.amount,
          error: body.transaction.errorType
        }
      })

    if (paymentError) {
      console.error('Error updating payment:', paymentError)
      throw paymentError
    }

    // Update booking status if payment exists
    if (payment) {
      const bookingStatus = body.status.toLowerCase() === 'success' ? 'confirmed' : 'failed'
      
      const { error: bookingError } = await supabase
        .from('bookings')
        .update({
          status: bookingStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', payment.booking_id)

      if (bookingError) {
        console.error('Error updating booking:', bookingError)
      }

      // Log the transaction for audit
      console.log(`Payment ${externalTransactionId} processed with status: ${body.status}`)
      
      // Send notification email if success
      if (body.status.toLowerCase() === 'success' && payment.user_id) {
        // Get user email
        const { data: user } = await supabase
          .from('users')
          .select('email')
          .eq('id', payment.user_id)
          .single()
          
        if (user?.email) {
          // Log email notification (actual sending would be done by another service)
          await supabase
            .from('payment_logs')
            .insert({
              payment_id: payment.id,
              action: 'email_notification',
              details: {
                email: user.email,
                type: 'payment_success'
              }
            })
        }
      }
    }

    // Return success response (IMPORTANT: PayTech requires HTTP 200)
    return new Response(
      JSON.stringify({ success: true }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Error processing PayTech callback:', error)
    
    // Log critical error
    try {
      await supabase
        .from('payment_logs')
        .insert({
          action: 'callback_error',
          details: {
            error: error instanceof Error ? error.message : 'Unknown error',
            body: body
          }
        })
    } catch (logError) {
      console.error('Failed to log error:', logError)
    }
    
    // Still return 200 to prevent PayTech from retrying
    return new Response(
      JSON.stringify({ error: 'Internal error', success: false }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})