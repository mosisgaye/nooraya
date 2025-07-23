'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import PassengerForm from '@/components/booking/PassengerForm';
import { Flight } from '@/types';

export default function PassengersPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [flight, setFlight] = useState<Flight | null>(null);
  const [loading, setLoading] = useState(true);
  const passengerCount = parseInt(searchParams.get('passengers') || '1');

  useEffect(() => {
    // Récupérer le vol sélectionné
    const storedFlight = sessionStorage.getItem('selectedFlight');
    if (storedFlight) {
      setFlight(JSON.parse(storedFlight));
      setLoading(false);
    } else {
      // Si pas de vol, rediriger
      router.push('/flights');
    }
  }, [router]);

  interface Passenger {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    passportNumber?: string;
    passportExpiry?: string;
    nationality?: string;
    gender: 'M' | 'F';
    type: 'adult' | 'child' | 'infant';
  }

  const handleSubmit = (passengers: Passenger[]) => {
    // Stocker les infos passagers
    sessionStorage.setItem('passengers', JSON.stringify(passengers));
    
    // Aller à la page de paiement
    router.push('/booking/payment');
  };

  const handleBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!flight) {
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec progression */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Retour
            </button>
            
            {/* Barre de progression */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <span className="ml-2 text-sm font-medium text-gray-900">Sélection</span>
              </div>
              
              <div className="w-20 h-1 bg-green-600"></div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <span className="ml-2 text-sm font-medium text-gray-900">Passagers</span>
              </div>
              
              <div className="w-20 h-1 bg-gray-300"></div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
                  3
                </div>
                <span className="ml-2 text-sm text-gray-600">Paiement</span>
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
          {/* Formulaire passagers */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-2xl font-bold mb-6">Informations des passagers</h1>
              
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start">
                  <AlertCircle className="text-blue-600 mr-2 flex-shrink-0 mt-0.5" size={20} />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Informations importantes</p>
                    <ul className="space-y-1">
                      <li>• Les noms doivent correspondre exactement à ceux sur les passeports</li>
                      <li>• Vérifiez la validité de vos documents de voyage</li>
                      <li>• Les informations ne pourront pas être modifiées après le paiement</li>
                    </ul>
                  </div>
                </div>
              </div>

              <PassengerForm
                passengerCount={passengerCount}
                onSubmit={handleSubmit}
                onBack={handleBack}
              />
            </div>
          </div>

          {/* Résumé du vol */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h3 className="text-lg font-semibold mb-4">Résumé du vol</h3>
              
              <div className="space-y-4">
                {/* Vol */}
                <div>
                  <div className="flex items-center mb-2">
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
                  
                  <div className="mt-3 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Départ</span>
                      <span className="font-medium">{flight.departure.city} ({flight.departure.code})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Arrivée</span>
                      <span className="font-medium">{flight.arrival.city} ({flight.arrival.code})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Durée</span>
                      <span className="font-medium">{flight.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Classe</span>
                      <span className="font-medium capitalize">{flight.cabinClass}</span>
                    </div>
                  </div>
                </div>

                {/* Prix */}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-gray-600">Prix par personne</span>
                    <span className="font-semibold">{flight.price}€</span>
                  </div>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-gray-600">Nombre de passagers</span>
                    <span className="font-semibold">{passengerCount}</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-2 border-t">
                    <span className="font-semibold">Total</span>
                    <span className="text-2xl font-bold text-green-600">
                      {flight.price * passengerCount}€
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}