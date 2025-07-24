'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { SortAsc } from 'lucide-react';
import FlightCard from '@/components/cards/FlightCard';
import PaymentModal from '@/components/payment/PaymentModal';
import { FlightCardSkeletonGroup } from '@/components/flights/FlightCardSkeleton';
import FlightFiltersAdvanced from '@/components/flights/FlightFiltersAdvanced';
import { Flight } from '@/types';

interface Badge {
  type: 'best-price' | 'fastest' | 'direct' | 'popular';
  label: string;
}

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
  const [filters, setFilters] = useState<Record<string, unknown>>({});
  
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
              const firstSegment = outboundSegments[0]?.segment as Record<string, unknown>;
              const inboundSegments = itinerary.inbound?.sectorSegments || [];
              const lastSegmentData = inboundSegments.length > 0 ? 
                inboundSegments[inboundSegments.length - 1]?.segment as Record<string, unknown> : 
                outboundSegments[outboundSegments.length - 1]?.segment as Record<string, unknown>;
              
              if (!firstSegment || !lastSegmentData) {
                return null;
              }
              
              const totalStops = (outboundSegments.length - 1) + (inboundSegments.length > 0 ? inboundSegments.length - 1 : 0);
              const carrier = firstSegment.carrier as Record<string, unknown> | undefined || firstSegment.operatingCarrier as Record<string, unknown> | undefined;
              const airline = (carrier?.name as string | undefined) || 'Unknown Airline';
              const airlineCode = (carrier?.code as string | undefined) || '';
              const departureInfo = firstSegment.source as Record<string, unknown> | undefined;
              const arrivalInfo = lastSegmentData.destination as Record<string, unknown> | undefined;
              const duration = (firstSegment.duration as number | undefined) || 0;
              const departureCode = ((departureInfo?.station as Record<string, unknown> | undefined)?.code as string | undefined) || searchData.from || '';
              const arrivalCode = ((arrivalInfo?.station as Record<string, unknown> | undefined)?.code as string | undefined) || searchData.to || '';
              
              return {
                id: itinerary.id || `flight-${index}`,
                airline: airline,
                logo: airlineCode ? `https://images.kiwi.com/airlines/64/${airlineCode}.png` : '/placeholder-airline.png',
                departure: {
                  time: departureInfo?.localTime ? 
                    new Date(departureInfo.localTime as string).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) 
                    : '00:00',
                  airport: ((departureInfo?.station as Record<string, unknown> | undefined)?.name as string | undefined) || departureCode,
                  code: departureCode,
                  city: (((departureInfo?.station as Record<string, unknown> | undefined)?.city as Record<string, unknown> | undefined)?.name as string | undefined) || searchData.from || ''
                },
                arrival: {
                  time: arrivalInfo?.localTime ? 
                    new Date(arrivalInfo.localTime as string).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) 
                    : '00:00',
                  airport: ((arrivalInfo?.station as Record<string, unknown> | undefined)?.name as string | undefined) || arrivalCode,
                  code: arrivalCode,
                  city: (((arrivalInfo?.station as Record<string, unknown> | undefined)?.city as Record<string, unknown> | undefined)?.name as string | undefined) || searchData.to || ''
                },
                duration: duration ? 
                  `${Math.floor(duration / 60)}h ${duration % 60}m` 
                  : 'N/A',
                stops: totalStops,
                price: parseFloat(itinerary.price?.amount || '0'),
                currency: 'EUR',
                cabinClass: ((firstSegment.cabinClass as string | undefined) || searchData.cabinClass || 'economy') as 'economy' | 'premium' | 'business' | 'first',
                amenities: [],
                baggage: {
                  cabin: '7kg',
                  checked: '23kg'
                },
                availability: 10,
                carrier: airlineCode || 'XX',
                flightNumber: (firstSegment.flightNumber as string | undefined) || 'XX000',
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
      if ((filters.airlines as string[] | undefined)?.length && !(filters.airlines as string[]).includes(flight.carrier)) {
        return false;
      }
      
      // Filtre par alliance
      if ((filters.alliances as string[] | undefined)?.length) {
        const AIRLINE_ALLIANCES: Record<string, string[]> = {
          'Star Alliance': ['LH', 'UA', 'AC', 'SQ', 'NH', 'OS', 'LX', 'TG', 'TP', 'SN', 'MS', 'ET', 'SA', 'CM', 'CA'],
          'OneWorld': ['AA', 'BA', 'CX', 'QF', 'IB', 'JL', 'LA', 'MH', 'QR', 'RJ', 'S7', 'UL'],
          'SkyTeam': ['DL', 'AF', 'KL', 'AM', 'KE', 'CZ', 'OK', 'SV', 'RO', 'CI', 'MU', 'VN']
        };
        
        const belongsToSelectedAlliance = (filters.alliances as string[]).some((alliance: string) => 
          AIRLINE_ALLIANCES[alliance]?.includes(flight.carrier)
        );
        
        if (!belongsToSelectedAlliance) return false;
      }
      
      // Filtre par durée maximale
      if (filters.maxDuration as number | undefined) {
        const durationInHours = parseInt(flight.duration.split('h')[0]);
        if (durationInHours > (filters.maxDuration as number)) return false;
      }
      
      // Filtre par nombre d'escales
      if ((filters.maxStops as number | undefined) !== undefined && filters.maxStops !== -1) {
        if (flight.stops > (filters.maxStops as number)) return false;
      }
      
      // Filtre par heure de départ
      if ((filters.departureTime as string[] | undefined)?.length) {
        const hour = parseInt(flight.departure.time.split(':')[0]);
        const timeOfDay = hour < 6 ? 'night' : hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening';
        if (!(filters.departureTime as string[]).includes(timeOfDay)) return false;
      }
      
      // Filtre par heure d'arrivée
      if ((filters.arrivalTime as string[] | undefined)?.length) {
        const hour = parseInt(flight.arrival.time.split(':')[0]);
        const timeOfDay = hour < 6 ? 'night' : hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening';
        if (!(filters.arrivalTime as string[]).includes(timeOfDay)) return false;
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
      <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                {searchData.from} → {searchData.to}
              </h1>
              <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base text-emerald-100">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {searchData.departureDate}
                </span>
                <span className="text-emerald-300">•</span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {searchData.passengers} voyageur{Number(searchData.passengers) > 1 ? 's' : ''}
                </span>
                <span className="text-emerald-300">•</span>
                <span className="capitalize bg-white/20 px-3 py-1 rounded-full">
                  {searchData.cabinClass === 'economy' ? 'Économique' : searchData.cabinClass === 'business' ? 'Affaires' : 'Première'}
                </span>
              </div>
            </div>
            <Link
              href="/"
              className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full hover:bg-white/30 transition-all font-medium text-sm inline-flex items-center gap-2 w-full sm:w-auto justify-center border border-white/30"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Modifier la recherche
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Filters Sidebar - Hidden on mobile by default */}
          <div className="hidden lg:block lg:w-1/4">
            <FlightFiltersAdvanced
              filters={filters}
              onFilterChange={setFilters}
              availableAirlines={availableAirlines}
            />
          </div>

          {/* Results */}
          <div className="w-full lg:w-3/4">
            {/* Results Header */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {sortedFlights.length} vols disponibles
                  </h2>
                  {filters && Object.keys(filters).length > 0 && sortedFlights.length < flights.length && (
                    <p className="text-sm text-gray-500 mt-1">Filtres actifs : {Object.keys(filters).length} • {flights.length} vols au total</p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <button className="lg:hidden bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg text-sm font-medium border border-emerald-200 hover:bg-emerald-100 transition-colors flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                    Filtres
                  </button>
                  <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                    <SortAsc size={16} className="text-gray-500" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-transparent text-sm font-medium text-gray-700 focus:outline-none cursor-pointer"
                    >
                      <option value="price">Prix le plus bas</option>
                      <option value="duration">Plus rapide</option>
                      <option value="departure">Départ le plus tôt</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4 mb-4">
                  <p className="text-red-800 font-medium text-sm sm:text-base">Erreur</p>
                  <p className="text-red-600 text-xs sm:text-sm mt-1">{error}</p>
                  {(error.includes('API key missing') || error.includes('Configuration manquante')) && (
                    <div className="mt-3 p-2 sm:p-3 bg-red-100 rounded text-xs">
                      <p className="font-semibold text-red-800 mb-2">Pour l&apos;administrateur :</p>
                      <p className="text-red-700">Les variables d&apos;environnement suivantes doivent être configurées sur Vercel :</p>
                      <ul className="list-disc list-inside mt-1 text-red-700 space-y-1">
                        <li><code className="bg-red-200 px-1 rounded text-xs">RAPIDAPI_KEY</code> = 01da4a3c6amsh37ce35310ab8e77p10fdcajsn89d68f9c9df5</li>
                        <li><code className="bg-red-200 px-1 rounded text-xs">KIWI_API_HOST</code> = kiwi-com-cheap-flights.p.rapidapi.com</li>
                      </ul>
                      <p className="text-red-700 mt-2">
                        Allez dans Vercel → Settings → Environment Variables pour les ajouter.
                      </p>
                    </div>
                  )}
                </div>
              )}
              
              {flights.length === 0 && !error && (
                <div className="bg-white rounded-lg p-6 sm:p-8 text-center">
                  <p className="text-sm sm:text-base text-gray-600">Aucun vol trouvé pour cette recherche.</p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-2">Essayez de modifier vos critères de recherche.</p>
                </div>
              )}
              
              {sortedFlights.map((flight, index) => {
                // Déterminer les badges à afficher
                const isLowestPrice = index === 0 && sortBy === 'price';
                const isFastest = index === 0 && sortBy === 'duration';
                const isDirect = flight.stops === 0;
                const isPopular = flight.airline.includes('Air France') || flight.airline.includes('Emirates');
                
                return (
                  <FlightCard 
                    key={flight.id} 
                    flight={flight} 
                    onAddToComparison={() => {}}
                    isInComparison={false}
                    onSelect={handleSelectFlight}
                    badges={[
                      isLowestPrice && { type: 'best-price' as const, label: 'Meilleur prix' },
                      isFastest && { type: 'fastest' as const, label: 'Plus rapide' },
                      isDirect && { type: 'direct' as const, label: 'Vol direct' },
                      isPopular && { type: 'popular' as const, label: 'Populaire' }
                    ].filter((badge): badge is Badge => badge !== false)}
                  />
                );
              })}
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