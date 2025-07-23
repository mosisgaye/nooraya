'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Filter, SortAsc } from 'lucide-react';
import FlightCard from '@/components/cards/FlightCard';
import { Flight } from '@/types';

export default function FlightResultsClient() {
  return (
    <Suspense fallback={<LoadingFlights />}>
      <FlightResultsContent />
    </Suspense>
  );
}

function LoadingFlights() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p className="text-lg text-gray-600">Recherche des meilleurs vols...</p>
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
          throw new Error('Erreur lors de la recherche des vols');
        }
        
        const result = await response.json();
        
        if (result.success && result.data?.itineraries && result.data.itineraries.length > 0) {
          // Transformer les données Kiwi en format Flight
          const transformedFlights = result.data.itineraries.map((itinerary: any, index: number) => {
            try {
              const outboundSegments = itinerary.outbound?.sectorSegments || [];
              const firstSegment = outboundSegments[0]?.segment;
              const inboundSegments = itinerary.inbound?.sectorSegments || [];
              const lastSegmentData = inboundSegments.length > 0 ? 
                inboundSegments[inboundSegments.length - 1]?.segment : 
                outboundSegments[outboundSegments.length - 1]?.segment;
              
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
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [searchParams, searchData.from, searchData.to, searchData.departureDate, searchData.returnDate, searchData.cabinClass, searchData.tripType]);

  const sortedFlights = [...flights].sort((a, b) => {
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
    
    // Stocker les résultats de recherche pour les récupérer dans la page de détails
    const currentFlights = sortedFlights;
    sessionStorage.setItem('searchResults', JSON.stringify(currentFlights));
    console.log('Flights stockés dans sessionStorage');
    
    // Construire l'URL avec les paramètres de recherche
    const params = new URLSearchParams({
      date: searchData.departureDate,
      returnDate: searchData.returnDate || '',
      passengers: searchData.passengers,
      tripType: searchData.tripType,
      from: searchData.from,
      to: searchData.to
    });
    
    const url = `/flight-details/${flight.id}?${params.toString()}`;
    console.log('Redirection vers:', url);
    
    // Rediriger vers la page de détails du vol
    router.push(url);
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
              href="/flights"
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
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold flex items-center mb-4">
                <Filter className="mr-2" size={20} />
                Filtres
              </h3>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trier par
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="price">Prix (croissant)</option>
                  <option value="duration">Durée</option>
                  <option value="departure">Heure de départ</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:w-3/4">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-gray-600">
                {flights.length} vols trouvés
              </p>
              <div className="flex items-center space-x-2">
                <SortAsc size={16} />
                <span className="text-sm text-gray-600">Triés par prix</span>
              </div>
            </div>

            <div className="space-y-4">
              {flights.length === 0 && (
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

    </div>
  );
}