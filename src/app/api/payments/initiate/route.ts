import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const PAYTECH_API_URL = 'https://api.paytech.sn/payment/request';
const PAYTECH_API_KEY = process.env.PAYTECH_API_KEY;
const PAYTECH_API_SECRET = process.env.PAYTECH_API_SECRET;

export async function POST(request: NextRequest) {
  try {
    // Vérifier que les clés API sont configurées
    if (!PAYTECH_API_KEY || !PAYTECH_API_SECRET) {
      console.error('PayTech API credentials not configured');
      return NextResponse.json(
        { error: 'Configuration PayTech manquante. Veuillez configurer les variables d\'environnement.' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { bookingId, paymentMethod, phone, amount, bookingType } = body;

    // Valider les données
    if (!bookingId || !paymentMethod || !phone || !amount) {
      return NextResponse.json(
        { error: 'Données manquantes' },
        { status: 400 }
      );
    }

    // Créer un ID de paiement unique
    const paymentId = `PAY-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Préparer les données pour PayTech
    const paytechData = {
      item_name: `Réservation ${bookingType} - ${bookingId}`,
      item_price: amount,
      currency: 'XOF',
      ref_command: paymentId,
      command_name: `Réservation ${bookingType}`,
      env: 'test', // Changer en 'prod' pour la production
      ipn_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.noorayavoyage.com'}/api/payments/webhook`,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.noorayavoyage.com'}/booking/confirmation?paymentId=${paymentId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.noorayavoyage.com'}/flight-results`,
      custom_field: JSON.stringify({
        bookingId,
        bookingType,
        paymentMethod,
        phone
      })
    };

    // Headers pour PayTech
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'API_KEY': PAYTECH_API_KEY,
      'API_SECRET': PAYTECH_API_SECRET
    };

    console.log('Envoi à PayTech:', paytechData);

    // Appeler l'API PayTech
    const response = await fetch(PAYTECH_API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(paytechData)
    });

    const responseData = await response.json();
    console.log('Réponse PayTech:', responseData);

    if (!response.ok || !responseData.success) {
      throw new Error(responseData.message || 'Erreur PayTech');
    }

    // Sauvegarder le paiement dans la base de données
    const supabase = await createClient();
    
    const { error: dbError } = await supabase
      .from('payments')
      .insert({
        id: paymentId,
        booking_id: bookingId,
        amount,
        currency: 'XOF',
        payment_method: paymentMethod,
        phone,
        status: 'pending',
        paytech_token: responseData.token,
        paytech_response: responseData,
        created_at: new Date().toISOString()
      });

    if (dbError) {
      console.error('Erreur DB:', dbError);
      // Ne pas faire échouer la requête si la DB a un problème
    }

    // Pour le mode test, simuler un succès après quelques secondes
    if (paytechData.env === 'test') {
      setTimeout(async () => {
        try {
          await supabase
            .from('payments')
            .update({ status: 'success', updated_at: new Date().toISOString() })
            .eq('id', paymentId);
        } catch (error) {
          console.error('Erreur mise à jour statut:', error);
        }
      }, 5000); // Simuler un succès après 5 secondes
    }

    return NextResponse.json({
      success: true,
      paymentId,
      token: responseData.token,
      redirect_url: responseData.redirect_url,
      message: 'Paiement initié avec succès'
    });

  } catch (error) {
    console.error('Erreur initiation paiement:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erreur lors de l\'initiation du paiement' },
      { status: 500 }
    );
  }
}