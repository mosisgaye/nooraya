'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Filter, SortAsc } from 'lucide-react';
import FlightCard from '@/components/cards/FlightCard';
import PaymentModal from '@/components/payment/PaymentModal';
import { FlightCardSkeletonGroup } from '@/components/flights/FlightCardSkeleton';
import FlightFiltersAdvanced from '@/components/flights/FlightFiltersAdvanced';
import { Flight } from '@/types';

export default function FlightResultsClient() {
  return <FlightResultsContent />;
}

function LoadingFlights() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <div className="h-8 bg-gray-200 rounded w-64 animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
            </div>
            <div className="h-10 bg-gray-200 rounded w-40 animate-pulse"></div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 h-96 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-24 mb-4"></div>
              <div className="space-y-3">
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="mb-4 flex justify-between items-center">
              <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded w-48 animate-pulse"></div>
            </div>
            <FlightCardSkeletonGroup />
          </div>
        </div>
      </div>
    </div>
  );
}

function FlightResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('price');
  const [error, setError] = useState<string | null>(null);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [filters, setFilters] = useState<any>({});
  
  // Récupérer les paramètres de recherche
  const searchData = {
    from: searchParams.get('from') || '',
    to: searchParams.get('to') || '',
    departureDate: searchParams.get('departureDate') || '',
    returnDate: searchParams.get('returnDate') || '',
    passengers: searchParams.get('passengers') || '1',
    cabinClass: searchParams.get('cabinClass') || 'economy',
    tripType: searchParams.get('tripType') || 'round-trip',
  };

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        setLoading(true);
        
        const adults = searchParams.get('adults') || '1';
        const children = searchParams.get('children') || '0';
        const infants = searchParams.get('infants') || '0';
        
        const requestBody = {
          from: searchData.from,
          to: searchData.to,
          departureDate: searchData.departureDate,
          returnDate: searchData.returnDate,
          adults: parseInt(adults),
          children: parseInt(children),
          infants: parseInt(infants),
          cabinClass: searchData.cabinClass || 'economy',
          tripType: searchData.tripType || 'round-trip'
        };
        
        const response = await fetch('/api/flights/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody)
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('API Error Response:', errorText);
          let errorMessage = 'Erreur lors de la recherche des vols';
          let debugInfo = null;
          
          try {
            const errorJson = JSON.parse(errorText);
            errorMessage = errorJson.error || errorMessage;
            debugInfo = errorJson.debug || errorJson.details;
            
            // Special handling for missing API key
            if (errorMessage.includes('API key missing')) {
              errorMessage = 'Configuration manquante : Les variables d\'environnement ne sont pas configurées sur le serveur';
            }
          } catch {
            // If not JSON, use the raw text
            errorMessage = errorText || errorMessage;
          }
          
          console.error('Flight search failed:', { errorMessage, debugInfo });
          throw new Error(errorMessage);
        }
        
        const result = await response.json();
        
        if (result.success && result.data?.itineraries && result.data.itineraries.length > 0) {
          // Transformer les données Kiwi en format Flight
          interface KiwiItinerary {
            id?: string;
            price?: { amount?: string };
            outbound?: { sectorSegments?: Array<{ segment?: unknown }> };
            inbound?: { sectorSegments?: Array<{ segment?: unknown }> };
          }

          const transformedFlights = result.data.itineraries.map((itinerary: KiwiItinerary, index: number) => {
            try {
              const outboundSegments = itinerary.outbound?.sectorSegments || [];
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const firstSegment = outboundSegments[0]?.segment as any;
              const inboundSegments = itinerary.inbound?.sectorSegments || [];
              const lastSegmentData = inboundSegments.length > 0 ? 
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                inboundSegments[inboundSegments.length - 1]?.segment as any : 
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                outboundSegments[outboundSegments.length - 1]?.segment as any;
              
              if (!firstSegment || !lastSegmentData) {
                return null;
              }
              
              const totalStops = (outboundSegments.length - 1) + (inboundSegments.length > 0 ? inboundSegments.length - 1 : 0);
              const carrier = firstSegment.carrier || firstSegment.operatingCarrier;
              const airline = carrier?.name || 'Unknown Airline';
              const airlineCode = carrier?.code || '';
              const departureInfo = firstSegment.source;
              const arrivalInfo = lastSegmentData.destination;
              const duration = firstSegment.duration || 0;
              const departureCode = departureInfo?.station?.code || searchData.from || '';
              const arrivalCode = arrivalInfo?.station?.code || searchData.to || '';
              
              return {
                id: itinerary.id || `flight-${index}`,
                airline: airline,
                logo: airlineCode ? `https://images.kiwi.com/airlines/64/${airlineCode}.png` : '/placeholder-airline.png',
                departure: {
                  time: departureInfo?.localTime ? 
                    new Date(departureInfo.localTime).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) 
                    : '00:00',
                  airport: departureInfo?.station?.name || departureCode,
                  code: departureCode,
                  city: departureInfo?.station?.city?.name || searchData.from || ''
                },
                arrival: {
                  time: arrivalInfo?.localTime ? 
                    new Date(arrivalInfo.localTime).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) 
                    : '00:00',
                  airport: arrivalInfo?.station?.name || arrivalCode,
                  code: arrivalCode,
                  city: arrivalInfo?.station?.city?.name || searchData.to || ''
                },
                duration: duration ? 
                  `${Math.floor(duration / 60)}h ${duration % 60}m` 
                  : 'N/A',
                stops: totalStops,
                price: parseFloat(itinerary.price?.amount || '0'),
                currency: 'EUR',
                cabinClass: (firstSegment.cabinClass || searchData.cabinClass || 'economy') as 'economy' | 'premium' | 'business' | 'first',
                amenities: [],
                baggage: {
                  cabin: '7kg',
                  checked: '23kg'
                },
                availability: 10,
                carrier: airlineCode || 'XX',
                flightNumber: firstSegment.flightNumber || 'XX000',
                airlineLogo: airlineCode ? `https://images.kiwi.com/airlines/64/${airlineCode}.png` : '/placeholder-airline.png'
              };
            } catch (error) {
              console.error('Error transforming itinerary:', error);
              return null;
            }
          }).filter(Boolean);
          
          setFlights(transformedFlights);
        } else {
          setFlights([]);
        }
      } catch (error) {
        console.error('Erreur:', error);
        setFlights([]);
        setError(error instanceof Error ? error.message : 'Une erreur inattendue s\'est produite');
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [searchParams, searchData.from, searchData.to, searchData.departureDate, searchData.returnDate, searchData.cabinClass, searchData.tripType]);

  // Calculer les compagnies disponibles
  const availableAirlines = React.useMemo(() => {
    const airlineMap = new Map<string, { code: string; name: string; count: number }>();
    
    flights.forEach(flight => {
      const code = flight.carrier;
      if (!airlineMap.has(code)) {
        airlineMap.set(code, {
          code,
          name: flight.airline,
          count: 1
        });
      } else {
        const airline = airlineMap.get(code)!;
        airline.count++;
      }
    });
    
    return Array.from(airlineMap.values()).sort((a, b) => b.count - a.count);
  }, [flights]);

  // Appliquer les filtres
  const filteredFlights = React.useMemo(() => {
    return flights.filter(flight => {
      // Filtre par compagnie
      if (filters.airlines?.length > 0 && !filters.airlines.includes(flight.carrier)) {
        return false;
      }
      
      // Filtre par alliance
      if (filters.alliances?.length > 0) {
        const AIRLINE_ALLIANCES: Record<string, string[]> = {
          'Star Alliance': ['LH', 'UA', 'AC', 'SQ', 'NH', 'OS', 'LX', 'TG', 'TP', 'SN', 'MS', 'ET', 'SA', 'CM', 'CA'],
          'OneWorld': ['AA', 'BA', 'CX', 'QF', 'IB', 'JL', 'LA', 'MH', 'QR', 'RJ', 'S7', 'UL'],
          'SkyTeam': ['DL', 'AF', 'KL', 'AM', 'KE', 'CZ', 'OK', 'SV', 'RO', 'CI', 'MU', 'VN']
        };
        
        const belongsToSelectedAlliance = filters.alliances.some((alliance: string) => 
          AIRLINE_ALLIANCES[alliance]?.includes(flight.carrier)
        );
        
        if (!belongsToSelectedAlliance) return false;
      }
      
      // Filtre par durée maximale
      if (filters.maxDuration) {
        const durationInHours = parseInt(flight.duration.split('h')[0]);
        if (durationInHours > filters.maxDuration) return false;
      }
      
      // Filtre par nombre d'escales
      if (filters.maxStops !== undefined && filters.maxStops !== -1) {
        if (flight.stops > filters.maxStops) return false;
      }
      
      // Filtre par heure de départ
      if (filters.departureTime?.length > 0) {
        const hour = parseInt(flight.departure.time.split(':')[0]);
        const timeOfDay = hour < 6 ? 'night' : hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening';
        if (!filters.departureTime.includes(timeOfDay)) return false;
      }
      
      // Filtre par heure d'arrivée
      if (filters.arrivalTime?.length > 0) {
        const hour = parseInt(flight.arrival.time.split(':')[0]);
        const timeOfDay = hour < 6 ? 'night' : hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening';
        if (!filters.arrivalTime.includes(timeOfDay)) return false;
      }
      
      return true;
    });
  }, [flights, filters]);

  const sortedFlights = [...filteredFlights].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'duration':
        return parseInt(a.duration) - parseInt(b.duration);
      case 'departure':
        return a.departure.time.localeCompare(b.departure.time);
      default:
        return 0;
    }
  });

  const handleSelectFlight = (flight: Flight) => {
    console.log('Sélection du vol:', flight);
    
    // Définir le vol sélectionné et ouvrir le modal de paiement
    setSelectedFlight(flight);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = (paymentId: string) => {
    console.log('Paiement réussi:', paymentId);
    // Rediriger vers la page de confirmation ou afficher un message de succès
    router.push(`/booking/confirmation?paymentId=${paymentId}`);
  };

  const handlePaymentError = (error: string) => {
    console.error('Erreur de paiement:', error);
    // Afficher l'erreur à l'utilisateur
    setError(error);
  };


  if (loading) {
    return <LoadingFlights />;
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Search Summary */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl font-bold text-gray-900">
                {searchData.from} → {searchData.to}
              </h1>
              <p className="text-gray-600">
                {searchData.departureDate} • {searchData.passengers} voyageur{Number(searchData.passengers) > 1 ? 's' : ''} • {searchData.cabinClass}
              </p>
            </div>
            <Link
              href="/"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              Modifier la recherche
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <FlightFiltersAdvanced
              filters={filters}
              onFilterChange={setFilters}
              availableAirlines={availableAirlines}
            />
          </div>

          {/* Results */}
          <div className="lg:w-3/4">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-gray-600">
                {sortedFlights.length} vols trouvés
                {filters && Object.keys(filters).length > 0 && sortedFlights.length < flights.length && (
                  <span className="text-sm text-gray-500"> (sur {flights.length} au total)</span>
                )}
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <SortAsc size={16} />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="price">Prix (croissant)</option>
                    <option value="duration">Durée</option>
                    <option value="departure">Heure de départ</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <p className="text-red-800 font-medium">Erreur</p>
                  <p className="text-red-600 text-sm mt-1">{error}</p>
                  {(error.includes('API key missing') || error.includes('Configuration manquante')) && (
                    <div className="mt-3 p-3 bg-red-100 rounded text-xs">
                      <p className="font-semibold text-red-800 mb-2">Pour l&apos;administrateur :</p>
                      <p className="text-red-700">Les variables d&apos;environnement suivantes doivent être configurées sur Vercel :</p>
                      <ul className="list-disc list-inside mt-1 text-red-700 space-y-1">
                        <li><code className="bg-red-200 px-1 rounded">RAPIDAPI_KEY</code> = 01da4a3c6amsh37ce35310ab8e77p10fdcajsn89d68f9c9df5</li>
                        <li><code className="bg-red-200 px-1 rounded">KIWI_API_HOST</code> = kiwi-com-cheap-flights.p.rapidapi.com</li>
                      </ul>
                      <p className="text-red-700 mt-2">
                        Allez dans Vercel → Settings → Environment Variables pour les ajouter.
                      </p>
                    </div>
                  )}
                </div>
              )}
              
              {flights.length === 0 && !error && (
                <div className="bg-white rounded-lg p-8 text-center">
                  <p className="text-gray-600">Aucun vol trouvé pour cette recherche.</p>
                  <p className="text-sm text-gray-500 mt-2">Essayez de modifier vos critères de recherche.</p>
                </div>
              )}
              
              {sortedFlights.map((flight) => (
                <FlightCard 
                  key={flight.id} 
                  flight={flight} 
                  onAddToComparison={() => {}}
                  isInComparison={false}
                  onSelect={handleSelectFlight}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {selectedFlight && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => {
            setShowPaymentModal(false);
            setSelectedFlight(null);
          }}
          bookingData={{
            id: selectedFlight.id,
            type: 'flight',
            amount: selectedFlight.price,
            currency: selectedFlight.currency,
            description: `Vol ${selectedFlight.departure.code} → ${selectedFlight.arrival.code}`,
            details: {
              flight: selectedFlight,
              passengers: []
            }
          }}
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
        />
      )}

    </div>
  );
}