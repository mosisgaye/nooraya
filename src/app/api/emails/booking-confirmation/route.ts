import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { bookingConfirmationTemplate } from '@/lib/email/templates/booking-confirmation';

export async function POST(request: NextRequest) {
  try {
    const { bookingId, paymentId } = await request.json();
    
    const supabase = await createClient();
    
    // Récupérer les détails de la réservation
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .select(`
        *,
        users (
          email,
          first_name,
          last_name
        ),
        payments (
          amount,
          currency,
          status
        )
      `)
      .eq('id', bookingId)
      .single();

    if (bookingError || !booking) {
      return NextResponse.json(
        { error: 'Réservation introuvable' },
        { status: 404 }
      );
    }

    const flight = booking.flight_details?.flight;
    const user = booking.users;
    const payment = booking.payments?.[0];

    if (!flight || !user || !payment) {
      return NextResponse.json(
        { error: 'Données incomplètes' },
        { status: 400 }
      );
    }

    // Préparer les données pour le template
    const emailData = {
      name: `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.email,
      bookingRef: booking.id.slice(0, 8).toUpperCase(),
      flight: {
        from: flight.departure.city,
        to: flight.arrival.city,
        date: new Date(booking.flight_details.searchParams.departureDate).toLocaleDateString('fr-FR', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        time: flight.departure.time,
        airline: flight.airline,
        flightNumber: flight.flightNumber
      },
      amount: payment.amount,
      currency: payment.currency
    };

    const htmlContent = bookingConfirmationTemplate(emailData);

    // Ici, intégrer avec votre service d'email (SendGrid, Resend, etc.)
    // Pour l'instant, on simule l'envoi
    console.log('Email would be sent to:', user.email);
    console.log('Email content preview:', emailData);

    // Si vous utilisez Resend :
    /*
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'Nooraya Voyages <noreply@noorayavoyages.com>',
      to: user.email,
      subject: `Confirmation de réservation - Vol ${emailData.flight.from} → ${emailData.flight.to}`,
      html: htmlContent
    });
    */

    return NextResponse.json({ 
      success: true,
      message: 'Email de confirmation envoyé'
    });

  } catch (error) {
    console.error('Email confirmation error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi de l\'email' },
      { status: 500 }
    );
  }
}