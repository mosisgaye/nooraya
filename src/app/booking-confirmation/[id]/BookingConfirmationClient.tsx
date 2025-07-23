'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Download, Send, Printer, MapPin, Clock, User } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface BookingDetails {
  id: string;
  booking_type: string;
  status: string;
  total_amount: number;
  currency: string;
  flight_details: {
    flight: {
      airline?: string;
      flightNumber?: string;
      cabinClass?: string;
      departure: {
        city: string;
        airport: string;
        time: string;
      };
      arrival: {
        city: string;
        airport: string;
        time: string;
      };
      duration: string;
      stops: number;
    };
    searchParams: {
      departureDate: string;
      returnDate?: string;
    };
  };
  passenger_details: Array<{
    firstName: string;
    lastName: string;
    dateOfBirth?: string;
  }>;
  created_at: string;
  payments?: Array<{
    id: string;
    amount: number;
    status: string;
    payment_method: string;
  }>;
}

export default function BookingConfirmationClient({ bookingId }: { bookingId: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const paymentId = searchParams.get('payment');

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const supabase = createClient();
        
        // Récupérer les détails de la réservation
        const { data, error } = await supabase
          .from('bookings')
          .select(`
            *,
            payments (
              id,
              amount,
              status,
              payment_method
            )
          `)
          .eq('id', bookingId)
          .single();

        if (error || !data) {
          console.error('Error fetching booking:', error);
          router.push('/');
          return;
        }

        setBooking(data);
        
        // Envoyer l'email de confirmation si paiement réussi
        if (paymentId && data.status === 'confirmed') {
          try {
            await fetch('/api/emails/booking-confirmation', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ bookingId, paymentId })
            });
          } catch {
            console.log('Could not send email');
          }
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId, paymentId, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Réservation introuvable</p>
          <Link href="/" className="text-green-600 hover:underline mt-2 inline-block">
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    );
  }

  const flight = booking.flight_details?.flight;
  const bookingRef = booking.id.slice(0, 8).toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Success Message */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <CheckCircle className="text-green-600 mr-3" size={32} />
            <h1 className="text-2xl font-bold text-green-800">Réservation Confirmée !</h1>
          </div>
          <p className="text-green-700 mb-2">
            Votre réservation a été confirmée avec succès. Un email de confirmation a été envoyé.
          </p>
          <p className="text-lg font-semibold text-green-800">
            Référence de réservation : {bookingRef}
          </p>
        </div>

        {/* Booking Details */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold mb-6">Détails du Vol</h2>
          
          {flight && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b">
                <div>
                  <p className="text-sm text-gray-600">Compagnie aérienne</p>
                  <p className="font-semibold">{flight.airline}</p>
                  {flight.flightNumber && (
                    <p className="text-sm text-gray-600">Vol {flight.flightNumber}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Classe</p>
                  <p className="font-semibold capitalize">{flight.cabinClass}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="flex items-center text-gray-600 mb-1">
                    <MapPin size={16} className="mr-2" />
                    <span className="text-sm">Départ</span>
                  </div>
                  <p className="font-semibold">{flight.departure.city}</p>
                  <p className="text-sm text-gray-600">{flight.departure.airport}</p>
                  <div className="flex items-center mt-2">
                    <Clock size={14} className="mr-1 text-gray-500" />
                    <span className="text-sm">{flight.departure.time}</span>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Durée</p>
                    <p className="font-semibold">{flight.duration}</p>
                    <p className="text-sm text-gray-600">
                      {flight.stops === 0 ? 'Direct' : `${flight.stops} escale${flight.stops > 1 ? 's' : ''}`}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center text-gray-600 mb-1">
                    <MapPin size={16} className="mr-2" />
                    <span className="text-sm">Arrivée</span>
                  </div>
                  <p className="font-semibold">{flight.arrival.city}</p>
                  <p className="text-sm text-gray-600">{flight.arrival.airport}</p>
                  <div className="flex items-center mt-2">
                    <Clock size={14} className="mr-1 text-gray-500" />
                    <span className="text-sm">{flight.arrival.time}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <p className="text-sm text-gray-600">Date de départ</p>
                  <p className="font-semibold">
                    {new Date(booking.flight_details.searchParams.departureDate).toLocaleDateString('fr-FR', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                {booking.flight_details.searchParams.returnDate && (
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Date de retour</p>
                    <p className="font-semibold">
                      {new Date(booking.flight_details.searchParams.returnDate).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Passenger Details */}
        {booking.passenger_details && Array.isArray(booking.passenger_details) && booking.passenger_details.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Passagers</h2>
            <div className="space-y-3">
              {booking.passenger_details.map((passenger, index) => (
                <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <User className="text-gray-600 mr-3" size={20} />
                  <div>
                    <p className="font-semibold">
                      {passenger.firstName} {passenger.lastName}
                    </p>
                    {passenger.dateOfBirth && (
                      <p className="text-sm text-gray-600">
                        Né(e) le {new Date(passenger.dateOfBirth).toLocaleDateString('fr-FR')}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Payment Summary */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Résumé du Paiement</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Montant total</span>
              <span className="font-bold text-xl text-green-600">
                {booking.total_amount.toLocaleString('fr-FR')} {booking.currency}
              </span>
            </div>
            {booking.payments && booking.payments[0] && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Méthode de paiement</span>
                <span className="capitalize">{booking.payments[0].payment_method.replace('_', ' ')}</span>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Download className="mr-2" size={20} />
              Télécharger le billet
            </button>
            <button className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Send className="mr-2" size={20} />
              Envoyer par email
            </button>
            <button className="flex items-center justify-center px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
              <Printer className="mr-2" size={20} />
              Imprimer
            </button>
          </div>
        </div>

        {/* Important Information */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-6">
          <h3 className="font-bold text-yellow-800 mb-3">Informations Importantes</h3>
          <ul className="space-y-2 text-sm text-yellow-700">
            <li>• Présentez-vous à l&apos;aéroport au moins 2 heures avant le départ</li>
            <li>• Munissez-vous de votre passeport ou carte d&apos;identité valide</li>
            <li>• Vérifiez les exigences de visa pour votre destination</li>
            <li>• Conservez cette référence de réservation : {bookingRef}</li>
          </ul>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-center space-x-4">
          <Link
            href="/profile/bookings"
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Mes réservations
          </Link>
          <Link
            href="/"
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Nouvelle recherche
          </Link>
        </div>
      </div>
    </div>
  );
}