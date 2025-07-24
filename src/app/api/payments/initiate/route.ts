import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { paytechClient, PAYTECH_SERVICES } from '@/lib/paytech/client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { bookingId, paymentMethod, phone, amount, bookingType } = body;

    // Valider les données
    if (!bookingId || !paymentMethod || !phone || !amount) {
      return NextResponse.json(
        { error: 'Données manquantes' },
        { status: 400 }
      );
    }

    // Mapper la méthode de paiement au code service Intech
    const serviceCodeMap: Record<string, string> = {
      'orange_money': PAYTECH_SERVICES.ORANGE_CASH_IN,
      'wave': PAYTECH_SERVICES.WAVE_CASH_IN,
      'card': PAYTECH_SERVICES.CARD_PAYMENT
    };

    const codeService = serviceCodeMap[paymentMethod];
    if (!codeService) {
      return NextResponse.json(
        { error: 'Méthode de paiement non supportée' },
        { status: 400 }
      );
    }

    // Créer un ID de transaction externe unique
    const externalTransactionId = `NV-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Préparer les données pour l'API Intech
    const transactionData = {
      phone,
      amount,
      codeService,
      externalTransactionId,
      data: {
        bookingId,
        bookingType,
        paymentMethod
      }
    };

    console.log('Envoi à Intech API:', transactionData);

    // Appeler l'API Intech via le client
    const response = await paytechClient.createPayment(transactionData);

    console.log('Réponse Intech:', response);

    if (!response.success) {
      throw new Error(response.msg || 'Erreur lors de l\'initiation du paiement');
    }

    // Sauvegarder le paiement dans la base de données
    const supabase = await createClient();
    
    const { error: dbError } = await supabase
      .from('payments')
      .insert({
        id: externalTransactionId,
        booking_id: bookingId,
        amount,
        currency: 'XOF',
        payment_method: paymentMethod,
        phone,
        status: 'pending',
        paytech_external_id: externalTransactionId,
        paytech_response: response.data,
        created_at: new Date().toISOString()
      });

    if (dbError) {
      console.error('Erreur DB:', dbError);
      // Ne pas faire échouer la requête si la DB a un problème
    }

    // Retourner la réponse appropriée selon la méthode de paiement
    const responseData: any = {
      success: true,
      paymentId: externalTransactionId,
      message: 'Paiement initié avec succès'
    };

    // Pour les paiements par carte, rediriger vers une page de paiement
    if (paymentMethod === 'card') {
      responseData.redirect_url = `${process.env.NEXT_PUBLIC_APP_URL}/payment/card?id=${externalTransactionId}`;
    }

    // Pour les paiements mobiles, informer l'utilisateur de valider sur son téléphone
    if (paymentMethod === 'orange_money' || paymentMethod === 'wave') {
      responseData.requiresValidation = true;
      responseData.validationMessage = `Veuillez valider le paiement sur votre téléphone ${paymentMethod === 'orange_money' ? 'Orange Money' : 'Wave'}`;
    }

    return NextResponse.json(responseData);

  } catch (error) {
    console.error('Erreur initiation paiement:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erreur lors de l\'initiation du paiement' },
      { status: 500 }
    );
  }
}