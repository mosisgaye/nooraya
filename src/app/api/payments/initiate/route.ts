import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { PayTechClient, PAYTECH_SERVICES } from '@/lib/paytech/client';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      bookingId,
      paymentMethod,
      phone,
      amount,
      bookingType, // 'flight', 'hotel', 'package'
      bookingData
    } = body;

    // Validate required fields
    if (!bookingId || !paymentMethod || !phone || !amount) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Validate phone number format (9 digits)
    const phoneRegex = /^[0-9]{9}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: 'Le numéro de téléphone doit contenir 9 chiffres' },
        { status: 400 }
      );
    }

    // Validate amount (minimum 100 FCFA)
    if (amount < 100) {
      return NextResponse.json(
        { error: 'Le montant minimum est de 100 FCFA' },
        { status: 400 }
      );
    }

    // Check for duplicate payments in the last 5 minutes
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    const { data: recentPayments } = await supabase
      .from('payments')
      .select('id')
      .eq('booking_id', bookingId)
      .eq('amount', amount)
      .gte('created_at', fiveMinutesAgo)
      .in('status', ['pending', 'success']);

    if (recentPayments && recentPayments.length > 0) {
      return NextResponse.json(
        { error: 'Un paiement est déjà en cours pour cette réservation' },
        { status: 400 }
      );
    }

    // Map payment method to PayTech service code
    const serviceCodeMap: Record<string, string> = {
      'orange_money': PAYTECH_SERVICES.ORANGE_CASH_OUT,
      'wave': PAYTECH_SERVICES.WAVE_CASH_OUT,
      'card': PAYTECH_SERVICES.CARD_PAYMENT
    };

    const codeService = serviceCodeMap[paymentMethod];
    if (!codeService) {
      return NextResponse.json(
        { error: 'Méthode de paiement invalide' },
        { status: 400 }
      );
    }

    // Generate external transaction ID
    const externalTransactionId = `NOORAYA_${bookingType.toUpperCase()}_${Date.now()}_${bookingId}`;

    // Create payment record in database
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .insert({
        booking_id: bookingId,
        user_id: user.id,
        amount: amount,
        currency: 'XOF',
        payment_method: paymentMethod,
        status: 'pending',
        paytech_external_id: externalTransactionId,
        metadata: {
          phone,
          bookingType,
          bookingData
        }
      })
      .select()
      .single();

    if (paymentError) {
      console.error('Error creating payment record:', paymentError);
      return NextResponse.json(
        { error: 'Erreur lors de la création du paiement' },
        { status: 500 }
      );
    }

    // Log payment attempt
    await supabase
      .from('payment_logs')
      .insert({
        payment_id: payment.id,
        action: 'initiate',
        details: {
          phone,
          amount,
          payment_method: paymentMethod,
          service_code: codeService
        }
      });

    // Initialize PayTech client
    const paytechClient = new PayTechClient({
      apiKey: process.env.PAYTECH_API_KEY!,
      secretKey: process.env.PAYTECH_SECRET_KEY!,
      apiUrl: process.env.PAYTECH_API_URL!,
      callbackUrl: process.env.PAYTECH_CALLBACK_URL!
    });

    // Create PayTech transaction
    const paytechResponse = await paytechClient.createPayment({
      phone,
      amount,
      codeService,
      externalTransactionId,
      data: {
        userId: user.id,
        bookingId,
        paymentId: payment.id
      }
    });

    if (!paytechResponse.success) {
      // Update payment status to failed
      await supabase
        .from('payments')
        .update({
          status: 'failed',
          error_message: paytechResponse.msg
        })
        .eq('id', payment.id);

      // Log failed attempt
      await supabase
        .from('payment_logs')
        .insert({
          payment_id: payment.id,
          action: 'failed',
          details: {
            error: paytechResponse.msg,
            response: paytechResponse
          }
        });

      return NextResponse.json(
        { error: paytechResponse.msg || 'Échec de l\'initiation du paiement' },
        { status: 400 }
      );
    }

    // Update payment with PayTech transaction ID
    await supabase
      .from('payments')
      .update({
        paytech_transaction_id: paytechResponse.data?.transactionId
      })
      .eq('id', payment.id);

    // Send WhatsApp notification if enabled
    if (process.env.ENABLE_WHATSAPP_NOTIFICATIONS === 'true') {
      const message = `🛫 Nooraya Voyages\n\nVotre paiement de ${amount} FCFA est en cours de traitement.\n\nRéférence: ${externalTransactionId}\n\nVeuillez valider le paiement sur votre téléphone.`;
      
      await paytechClient.createPayment({
        phone,
        amount: 0, // WhatsApp messages are free
        codeService: PAYTECH_SERVICES.WHATSAPP,
        externalTransactionId: `WA_${externalTransactionId}`,
        data: { message }
      });
    }

    return NextResponse.json({
      success: true,
      paymentId: payment.id,
      externalTransactionId,
      transactionId: paytechResponse.data?.transactionId,
      message: 'Paiement initié. Veuillez valider sur votre téléphone.'
    });

  } catch (error) {
    console.error('Payment initiation error:', error);
    
    // Log critical error
    if (process.env.NODE_ENV === 'production') {
      try {
        const errorSupabase = await createClient();
        await errorSupabase
          .from('payment_logs')
          .insert({
            action: 'critical_error',
            details: {
              error: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined
          }
        });
      } catch {
        // Ignore logging error
      }
    }

    return NextResponse.json(
      { error: 'Erreur serveur. Veuillez réessayer.' },
      { status: 500 }
    );
  }
}