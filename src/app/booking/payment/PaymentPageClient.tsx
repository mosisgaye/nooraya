'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Shield, Lock, CreditCard, Smartphone, AlertCircle } from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';
import { useAuthModal } from '@/contexts/AuthModalContext';
import PaymentModal from '@/components/payment/PaymentModal';
import { Flight } from '@/types';

export default function PaymentPageClient() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { openAuthModal } = useAuthModal();
  const [flight, setFlight] = useState<Flight | null>(null);
  interface PassengerData {
    title: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    nationality: string;
    passportNumber?: string;
    passportExpiry?: string;
    email?: string;
    phone?: string;
  }

  const [passengers, setPassengers] = useState<PassengerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [creatingBooking, setCreatingBooking] = useState(false);

  const createBooking = useCallback(async () => {
    if (!user || creatingBooking) return;
    
    setCreatingBooking(true);
    try {
      // Créer la réservation
      const searchParams = new URLSearchParams(window.location.search);
      const bookingData = {
        flight,
        userId: user.id,
        searchParams: {
          from: searchParams.get('from') || flight?.departure.city,
          to: searchParams.get('to') || flight?.arrival.city,
          departureDate: searchParams.get('date'),
          returnDate: searchParams.get('returnDate'),
          passengers: passengers.length.toString(),
          tripType: searchParams.get('tripType') || 'one-way'
        }
      };
      
      const response = await fetch('/api/bookings/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });

      const result = await response.json();
      
      if (response.ok && result.booking) {
        setBookingId(result.booking.id);
        
        // Sauvegarder les infos passagers
        await fetch(`/api/bookings/${result.booking.id}/passengers`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ passengers })
        });
        
        setShowPayment(true);
      } else {
        throw new Error(result.error || 'Erreur lors de la création de la réservation');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
      setCreatingBooking(false);
    }
  }, [user, creatingBooking, flight, passengers]);

  useEffect(() => {
    // Récupérer les données stockées
    const storedFlight = sessionStorage.getItem('selectedFlight');
    const storedPassengers = sessionStorage.getItem('passengers');
    
    if (storedFlight && storedPassengers) {
      setFlight(JSON.parse(storedFlight));
      setPassengers(JSON.parse(storedPassengers));
      setLoading(false);
    } else {
      // Si pas de données, rediriger
      router.push('/flights');
    }
  }, [router]);

  useEffect(() => {
    // Si l'utilisateur vient de se connecter, créer la réservation
    if (isAuthenticated && flight && passengers.length > 0 && !bookingId && !creatingBooking) {
      createBooking();
    }
  }, [isAuthenticated, flight, passengers, bookingId, creatingBooking, createBooking]);

  const handlePaymentClick = () => {
    if (!isAuthenticated) {
      // Ouvrir le modal de connexion
      openAuthModal();
    } else if (bookingId) {
      setShowPayment(true);
    } else {
      createBooking();
    }
  };

  const handlePaymentSuccess = (paymentId: string) => {
    // Nettoyer le sessionStorage
    sessionStorage.removeItem('selectedFlight');
    sessionStorage.removeItem('passengers');
    sessionStorage.removeItem('searchResults');
    
    // Rediriger vers la confirmation
    router.push(`/booking-confirmation/${bookingId}?payment=${paymentId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!flight || passengers.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Session expirée</p>
          <Link href="/" className="text-green-600 hover:underline">
            Retour à la recherche
          </Link>
        </div>
      </div>
    );
  }

  const totalPrice = flight.price * passengers.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec progression */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Retour
            </button>
            
            {/* Barre de progression */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  ✓
                </div>
                <span className="ml-2 text-sm text-gray-600">Sélection</span>
              </div>
              
              <div className="w-20 h-1 bg-green-600"></div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  ✓
                </div>
                <span className="ml-2 text-sm text-gray-600">Passagers</span>
              </div>
              
              <div className="w-20 h-1 bg-green-600"></div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  3
                </div>
                <span className="ml-2 text-sm font-medium text-gray-900">Paiement</span>
              </div>
              
              <div className="w-20 h-1 bg-gray-300"></div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
                  4
                </div>
                <span className="ml-2 text-sm text-gray-600">Confirmation</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Options de paiement */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-2xl font-bold mb-6">Finaliser votre réservation</h1>
              
              {/* Message si non connecté */}
              {!isAuthenticated && (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start">
                    <AlertCircle className="text-yellow-600 mr-2 flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <p className="font-medium text-yellow-800 mb-1">Connexion requise</p>
                      <p className="text-sm text-yellow-700">
                        Vous devez vous connecter ou créer un compte pour finaliser votre réservation.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Récapitulatif passagers */}
              <div className="mb-6">
                <h3 className="font-semibold mb-4">Passagers</h3>
                <div className="space-y-2">
                  {passengers.map((passenger, index) => (
                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-green-600 font-medium">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium">
                          {passenger.firstName} {passenger.lastName}
                        </p>
                        <p className="text-sm text-gray-600">
                          {passenger.title === 'MR' ? 'M.' : passenger.title === 'MS' ? 'Mme' : 'Mlle'} • 
                          Né(e) le {new Date(passenger.dateOfBirth).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Options de paiement */}
              <div className="mb-6">
                <h3 className="font-semibold mb-4">Moyens de paiement</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4 text-center">
                    <Smartphone className="mx-auto mb-2 text-orange-500" size={32} />
                    <p className="font-medium">Orange Money</p>
                    <p className="text-sm text-gray-600">Paiement mobile</p>
                  </div>
                  <div className="border rounded-lg p-4 text-center">
                    <Smartphone className="mx-auto mb-2 text-blue-500" size={32} />
                    <p className="font-medium">Wave</p>
                    <p className="text-sm text-gray-600">Paiement mobile</p>
                  </div>
                  <div className="border rounded-lg p-4 text-center">
                    <CreditCard className="mx-auto mb-2 text-green-600" size={32} />
                    <p className="font-medium">Carte bancaire</p>
                    <p className="text-sm text-gray-600">Visa, Mastercard</p>
                  </div>
                </div>
              </div>

              {/* Bouton de paiement */}
              <button
                onClick={handlePaymentClick}
                disabled={creatingBooking}
                className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center disabled:bg-gray-400"
              >
                {creatingBooking ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Préparation...
                  </>
                ) : isAuthenticated ? (
                  <>
                    <Lock className="mr-2" size={20} />
                    Procéder au paiement sécurisé
                  </>
                ) : (
                  <>
                    <Lock className="mr-2" size={20} />
                    Se connecter et payer
                  </>
                )}
              </button>

              {/* Sécurité */}
              <div className="mt-6 flex items-center justify-center text-sm text-gray-600">
                <Shield className="mr-2 text-green-600" size={16} />
                Paiement 100% sécurisé
              </div>
            </div>
          </div>

          {/* Résumé de la commande */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h3 className="text-lg font-semibold mb-4">Résumé de la commande</h3>
              
              {/* Vol */}
              <div className="mb-6">
                <div className="flex items-center mb-3">
                  <Image 
                    src={flight.logo || flight.airlineLogo || '/images/default-airline.svg'} 
                    alt={flight.airline}
                    width={40}
                    height={40}
                    className="object-contain mr-3"
                  />
                  <div>
                    <p className="font-medium">{flight.airline}</p>
                    <p className="text-sm text-gray-600">Vol {flight.flightNumber || flight.carrier}</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{flight.departure.city}</span>
                    <span>{flight.departure.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{flight.arrival.city}</span>
                    <span>{flight.arrival.time}</span>
                  </div>
                </div>
              </div>

              {/* Prix */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{passengers.length} passager{passengers.length > 1 ? 's' : ''}</span>
                  <span>{flight.price * passengers.length}€</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Taxes et frais</span>
                  <span>Inclus</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="text-2xl font-bold text-green-600">{totalPrice}€</span>
                  </div>
                </div>
              </div>

              {/* Conditions */}
              <div className="text-xs text-gray-500">
                <p className="mb-2">En procédant au paiement, vous acceptez nos conditions générales de vente.</p>
                <p>Les billets sont non remboursables et non modifiables.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de paiement */}
      {showPayment && bookingId && (
        <PaymentModal
          isOpen={true}
          onClose={() => setShowPayment(false)}
          bookingData={{
            id: bookingId,
            type: 'flight',
            amount: totalPrice,
            currency: flight.currency || 'EUR',
            description: `Vol ${flight.departure.city} - ${flight.arrival.city}`,
            details: { flight, passengers }
          }}
          onSuccess={handlePaymentSuccess}
          onError={(error) => {
            console.error('Payment error:', error);
            alert('Erreur lors du paiement. Veuillez réessayer.');
          }}
        />
      )}
    </div>
  );
}