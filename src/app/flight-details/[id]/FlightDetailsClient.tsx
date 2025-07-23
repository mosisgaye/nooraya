'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, 
  Plane, 
  Clock, 
  Users, 
  Luggage, 
  Shield,
  Check,
  AlertCircle,
  Calendar,
  ChevronRight
} from 'lucide-react';
import { Flight } from '@/types';

interface FlightDetailsClientProps {
  flightId: string;
}

export default function FlightDetailsClient({ flightId }: FlightDetailsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [flight, setFlight] = useState<Flight | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Récupérer les données du vol depuis sessionStorage ou l'API
  useEffect(() => {
    const loadFlight = () => {
      try {
        // Essayer de récupérer depuis sessionStorage
        const storedFlights = sessionStorage.getItem('searchResults');
        if (storedFlights) {
          const flights = JSON.parse(storedFlights);
          const foundFlight = flights.find((f: Flight) => f.id === flightId);
          if (foundFlight) {
            setFlight(foundFlight);
            setLoading(false);
            return;
          }
        }
        
        // Si pas trouvé, rediriger vers la recherche
        router.push('/flights');
      } catch (error) {
        console.error('Error loading flight:', error);
        router.push('/flights');
      }
    };

    loadFlight();
  }, [flightId, router]);

  const handleContinue = () => {
    // Stocker les infos du vol sélectionné
    sessionStorage.setItem('selectedFlight', JSON.stringify(flight));
    
    // Aller à la page de réservation (passagers)
    router.push(`/booking/passengers?flight=${flightId}`);
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
          <p className="text-gray-600 mb-4">Vol introuvable</p>
          <Link href="/" className="text-green-600 hover:underline">
            Retour à la recherche
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Retour aux résultats
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Détails du vol - Colonne principale */}
          <div className="lg:col-span-2 space-y-6">
            {/* Vol sélectionné */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-2xl font-bold mb-6">Détails du vol</h1>
              
              {/* Compagnie aérienne */}
              <div className="flex items-center mb-6 pb-6 border-b">
                <Image 
                  src={flight.logo || flight.airlineLogo || '/images/default-airline.svg'} 
                  alt={flight.airline}
                  width={64}
                  height={64}
                  className="object-contain mr-4"
                />
                <div>
                  <h2 className="text-xl font-semibold">{flight.airline}</h2>
                  <p className="text-gray-600">Vol {flight.flightNumber || flight.carrier}</p>
                </div>
              </div>

              {/* Itinéraire */}
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <Calendar className="text-gray-400 mr-2" size={20} />
                      <span className="text-gray-600">
                        {new Date(searchParams.get('date') || '').toLocaleDateString('fr-FR', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      {/* Départ */}
                      <div>
                        <p className="text-3xl font-bold mb-1">{flight.departure.time}</p>
                        <p className="font-semibold">{flight.departure.code}</p>
                        <p className="text-gray-600">{flight.departure.city}</p>
                        <p className="text-sm text-gray-500">{flight.departure.airport}</p>
                      </div>

                      {/* Durée */}
                      <div className="flex flex-col items-center justify-center">
                        <Clock className="text-gray-400 mb-2" size={20} />
                        <p className="font-semibold">{flight.duration}</p>
                        <div className="flex items-center mt-2">
                          <div className="h-px bg-gray-300 w-20"></div>
                          <Plane className="mx-2 text-gray-400" size={16} />
                          <div className="h-px bg-gray-300 w-20"></div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                          {flight.stops === 0 ? 'Vol direct' : `${flight.stops} escale${flight.stops > 1 ? 's' : ''}`}
                        </p>
                      </div>

                      {/* Arrivée */}
                      <div className="text-right">
                        <p className="text-3xl font-bold mb-1">{flight.arrival.time}</p>
                        <p className="font-semibold">{flight.arrival.code}</p>
                        <p className="text-gray-600">{flight.arrival.city}</p>
                        <p className="text-sm text-gray-500">{flight.arrival.airport}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Informations sur le vol */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Informations sur le vol</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Bagages */}
                <div>
                  <div className="flex items-center mb-3">
                    <Luggage className="text-gray-600 mr-2" size={20} />
                    <span className="font-medium">Bagages inclus</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Check className="text-green-600 mr-2" size={16} />
                      <span>Bagage à main : {flight.baggage.cabin}</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="text-green-600 mr-2" size={16} />
                      <span>Bagage en soute : {flight.baggage.checked}</span>
                    </div>
                  </div>
                </div>

                {/* Classe */}
                <div>
                  <div className="flex items-center mb-3">
                    <Users className="text-gray-600 mr-2" size={20} />
                    <span className="font-medium">Classe et confort</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Check className="text-green-600 mr-2" size={16} />
                      <span className="capitalize">{flight.cabinClass}</span>
                    </div>
                    {flight.amenities && flight.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center">
                        <Check className="text-green-600 mr-2" size={16} />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Conditions */}
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex items-start">
                <AlertCircle className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                <div className="text-sm text-blue-800">
                  <p className="font-semibold mb-2">Conditions importantes</p>
                  <ul className="space-y-1">
                    <li>• Les horaires de vol peuvent être modifiés par la compagnie</li>
                    <li>• Présentez-vous à l&apos;aéroport au moins 2h avant le départ</li>
                    <li>• Vérifiez les exigences de visa pour votre destination</li>
                    <li>• Assurez-vous que votre passeport est valide</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Résumé et prix - Colonne latérale */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h3 className="text-lg font-semibold mb-4">Résumé de la sélection</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Type de voyage</span>
                  <span className="font-medium">
                    {searchParams.get('tripType') === 'round-trip' ? 'Aller-retour' : 'Aller simple'}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Passagers</span>
                  <span className="font-medium">{searchParams.get('passengers') || '1'}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Classe</span>
                  <span className="font-medium capitalize">{flight.cabinClass}</span>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-end">
                  <span className="text-gray-600">Prix par personne</span>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-green-600">{flight.price}€</p>
                    <p className="text-sm text-gray-500">Taxes incluses</p>
                  </div>
                </div>
              </div>

              {/* Garanties */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm">
                  <Shield className="text-green-600 mr-2" size={16} />
                  <span>Réservation sécurisée</span>
                </div>
                <div className="flex items-center text-sm">
                  <Check className="text-green-600 mr-2" size={16} />
                  <span>Meilleur prix garanti</span>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="text-green-600 mr-2" size={16} />
                  <span>Service client 24/7</span>
                </div>
              </div>

              <button
                onClick={handleContinue}
                className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center"
              >
                Continuer
                <ChevronRight className="ml-2" size={20} />
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                En continuant, vous acceptez nos conditions générales
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}