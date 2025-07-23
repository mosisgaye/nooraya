import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    
    // Get payment status
    const { data: payment, error } = await supabase
      .from('payments')
      .select('id, status, error_message, booking_id, amount')
      .eq('id', params.id)
      .single();

    if (error || !payment) {
      return NextResponse.json(
        { error: 'Paiement introuvable' },
        { status: 404 }
      );
    }

    // Get booking status
    const { data: booking } = await supabase
      .from('bookings')
      .select('status')
      .eq('id', payment.booking_id)
      .single();

    return NextResponse.json({
      status: payment.status,
      bookingStatus: booking?.status,
      error: payment.error_message,
      amount: payment.amount
    });

  } catch (error) {
    console.error('Payment status error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la vérification du statut' },
      { status: 500 }
    );
  }
}