import { NextRequest, NextResponse } from 'next/server';
import { createClient as createAdminClient } from '@supabase/supabase-js';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { passengers } = await request.json();
    
    if (!passengers || !Array.isArray(passengers)) {
      return NextResponse.json(
        { error: 'Données passagers invalides' },
        { status: 400 }
      );
    }

    // Utiliser le client admin
    const supabaseAdmin = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Mettre à jour la réservation avec les infos passagers
    const { data, error } = await supabaseAdmin
      .from('bookings')
      .update({
        passenger_details: passengers,
        updated_at: new Date().toISOString()
      })
      .eq('id', params.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating passengers:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, booking: data });

  } catch (error) {
    console.error('Passengers update error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}