import { NextRequest, NextResponse } from 'next/server';
import { createClient as createAdminClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Booking API received:', body);
    
    const { flight, userId } = body;

    if (!flight || !userId) {
      console.error('Missing data:', { flight: !!flight, userId: !!userId });
      return NextResponse.json(
        { error: 'Données manquantes' },
        { status: 400 }
      );
    }

    // Utiliser le client admin pour bypasser RLS
    const supabaseAdmin = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );
    
    // Créer la réservation
    const { data: booking, error } = await supabaseAdmin
      .from('bookings')
      .insert({
        user_id: userId,
        booking_type: 'flight',
        status: 'pending',
        total_amount: flight.price,
        currency: flight.currency || 'XOF',
        flight_details: {
          flight,
          searchParams: body.searchParams
        },
        passenger_details: {
          count: parseInt(body.searchParams?.passengers || '1') || 1,
          type: 'adult'
        }
      })
      .select()
      .single();

    if (error) {
      console.error('Booking creation error:', error);
      console.error('Booking data was:', {
        user_id: userId,
        booking_type: 'flight',
        status: 'pending',
        total_amount: flight.price,
        currency: flight.currency || 'XOF'
      });
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ 
      success: true,
      booking 
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}