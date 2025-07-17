'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Filter, SortAsc, Bell, Map, BarChart3 } from 'lucide-react';
import dynamic from 'next/dynamic';
import FlightCard from '@/components/cards/FlightCard';
import { Flight } from '@/types';

// Dynamic imports pour les composants lourds
const AdvancedFilters = dynamic(() => import('@/components/search/AdvancedFilters'), { 
  loading: () => <div>Chargement...</div> 
});
const ComparisonPanel = dynamic(() => import('@/components/cards/ComparisonPanel'), { 
  loading: () => <div>Chargement...</div> 
});
const PriceAlerts = dynamic(() => import('@/components/search/PriceAlerts'), { 
  loading: () => <div>Chargement...</div> 
});
const FlexibleSearch = dynamic(() => import('@/components/search/FlexibleSearch'), { 
  loading: () => <div>Chargement...</div> 
});
const InteractiveMap = dynamic(() => import('@/components/ui/InteractiveMap'), { 
  loading: () => <div>Chargement...</div> 
});


interface ComparisonItem {
  id: string;
  type: "flight" | "hotel";
  data: Flight;
}

// Interface pour les filtres (alignée avec AdvancedFilters)
interface FilterState {
  priceRange: [number, number];
  stops?: number[];
  airlines?: string[];
  departureTime?: string[];
  arrivalTime?: string[];
  duration?: [number, number];
  airports?: string[];
  stars?: number[];
  rating?: number;
  amenities?: string[];
  propertyTypes?: string[];
  districts?: string[];
  guestRating?: number;
}

// Composant principal avec Suspense
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
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('price');
  
  // État des filtres avec le bon type
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 2000],
    stops: [],
    airlines: [],
    departureTime: [],
    arrivalTime: [],
    duration: [0, 24],
    airports: []
  });
  
  // États pour les nouvelles fonctionnalités
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [comparisonItems, setComparisonItems] = useState<ComparisonItem[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [showPriceAlerts, setShowPriceAlerts] = useState(false);
  const [showFlexibleSearch, setShowFlexibleSearch] = useState(false);
  const [showMap, setShowMap] = useState(false);

  // Récupérer les paramètres de recherche
  const searchData = {
    from: searchParams.get('from') || undefined,
    to: searchParams.get('to') || undefined,
    departureDate: searchParams.get('departureDate') || undefined,
    returnDate: searchParams.get('returnDate') || undefined,
    passengers: searchParams.get('passengers') || undefined,
    cabinClass: searchParams.get('cabinClass') || undefined,
    tripType: searchParams.get('tripType') || undefined,
    destination: undefined,
    flexible: false
  };

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        setLoading(true);
        
        // Construire l'URL avec les paramètres de recherche
        const queryParams = new URLSearchParams();
        if (searchData.from) queryParams.append('from', searchData.from);
        if (searchData.to) queryParams.append('to', searchData.to);
        if (searchData.departureDate) queryParams.append('departureDate', searchData.departureDate);
        if (searchData.returnDate) queryParams.append('returnDate', searchData.returnDate);
        if (searchData.passengers) queryParams.append('passengers', searchData.passengers);
        if (searchData.cabinClass) queryParams.append('cabinClass', searchData.cabinClass);
        
        const response = await fetch(`/api/flights?${queryParams.toString()}`);
        
        if (!response.ok) {
          throw new Error('Erreur lors de la recherche des vols');
        }
        
        const data = await response.json();
        
        // Si pas de résultats de l'API, utiliser les données mockées
        if (!data.flights || data.flights.length === 0) {
          setFlights(mockFlights);
        } else {
          setFlights(data.flights);
        }
      } catch (error) {
        console.error('Erreur:', error);
        // En cas d'erreur, utiliser les données mockées
        setFlights(mockFlights);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [searchData.from, searchData.to, searchData.departureDate, searchData.returnDate, searchData.passengers, searchData.cabinClass]);

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

  const addToComparison = (flight: Flight) => {
    if (comparisonItems.length < 4 && !comparisonItems.find(item => item.id === flight.id)) {
      setComparisonItems([...comparisonItems, { id: flight.id, type: 'flight', data: flight }]);
    }
  };

  const removeFromComparison = (id: string) => {
    setComparisonItems(comparisonItems.filter(item => item.id !== id));
  };

  const mapLocations = [
    {
      id: '1',
      name: 'Aéroport Charles de Gaulle',
      type: 'airport' as const,
      lat: 49.0097,
      lng: 2.5479,
      description: 'Principal aéroport de Paris'
    },
    {
      id: '2',
      name: 'Aéroport d\'Orly',
      type: 'airport' as const,
      lat: 48.7233,
      lng: 2.3794,
      description: 'Deuxième aéroport de Paris'
    }
  ];

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
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowFlexibleSearch(true)}
                className="bg-green-100 text-green-700 px-4 py-2 rounded-lg hover:bg-green-200 transition-colors text-sm"
              >
                <BarChart3 className="inline mr-1" size={16} />
                Dates flexibles
              </button>
              <button
                onClick={() => setShowPriceAlerts(true)}
                className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-lg hover:bg-yellow-200 transition-colors text-sm"
              >
                <Bell className="inline mr-1" size={16} />
                Alerte prix
              </button>
              <button
                onClick={() => setShowMap(true)}
                className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-200 transition-colors text-sm"
              >
                <Map className="inline mr-1" size={16} />
                Carte
              </button>
              <Link
                href="/flights"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                Modifier la recherche
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Filter className="mr-2" size={20} />
                  Filtres
                </h3>
                <button
                  onClick={() => setShowAdvancedFilters(true)}
                  className="text-green-600 hover:text-green-700 text-sm"
                >
                  Avancés
                </button>
              </div>
              
              {/* Sort Options */}
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

              {/* Quick Filters */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Escales
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="radio" name="stops" value="all" className="mr-2" defaultChecked />
                    Toutes
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="stops" value="direct" className="mr-2" />
                    Vol direct
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="stops" value="1" className="mr-2" />
                    1 escale
                  </label>
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prix (€)
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              </div>
            </div>

            {/* Comparison Panel Toggle */}
            {comparisonItems.length > 0 && (
              <div className="mt-4 bg-green-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Comparaison</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                    {comparisonItems.length}
                  </span>
                </div>
                <button
                  onClick={() => setShowComparison(true)}
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Comparer
                </button>
              </div>
            )}
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
              {sortedFlights.map((flight) => (
                <FlightCard 
                  key={flight.id} 
                  flight={flight} 
                  onAddToComparison={addToComparison}
                  isInComparison={comparisonItems.some(item => item.id === flight.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showAdvancedFilters && (
        <AdvancedFilters
          type="flights"
          isOpen={showAdvancedFilters}
          onClose={() => setShowAdvancedFilters(false)}
          onApplyFilters={setFilters}
          currentFilters={filters}
        />
      )}

      {showComparison && (
        <ComparisonPanel
          items={comparisonItems}
          onRemoveItem={removeFromComparison}
          onClearAll={() => setComparisonItems([])}
          isOpen={showComparison}
          onClose={() => setShowComparison(false)}
        />
      )}

      {showPriceAlerts && (
        <PriceAlerts
          isOpen={showPriceAlerts}
          onClose={() => setShowPriceAlerts(false)}
          searchData={{
            type: 'flight',
            from: searchData.from,
            to: searchData.to,
            currentPrice: sortedFlights[0]?.price
          }}
        />
      )}

      {showFlexibleSearch && (
        <FlexibleSearch
          isOpen={showFlexibleSearch}
          onClose={() => setShowFlexibleSearch(false)}
          onSearch={(data) => console.log('Flexible search:', data)}
          initialData={searchData}
        />
      )}

      {showMap && (
        <InteractiveMap
          isOpen={showMap}
          onClose={() => setShowMap(false)}
          center={{ lat: 48.8566, lng: 2.3522 }}
          locations={mapLocations}
        />
      )}
    </div>
  );
}

const mockFlights: Flight[] = [
  {
    id: '1',
    airline: 'Air France',
    logo: 'https://images.pexels.com/photos/912050/pexels-photo-912050.jpeg?w=32&h=32',
    departure: { time: '08:30', airport: 'Charles de Gaulle', code: 'CDG', city: 'Paris' },
    arrival: { time: '10:45', airport: 'Heathrow', code: 'LHR', city: 'London' },
    duration: '2h 15m',
    stops: 0,
    price: 189,
    currency: 'EUR',
    cabinClass: 'economy',
    amenities: ['wifi', 'meal'],
    baggage: { cabin: '8kg', checked: '23kg' },
    availability: 5,
    carrier: 'Air France',
    flightNumber: 'AF1234'
  },
  {
    id: '2',
    airline: 'British Airways',
    logo: 'https://images.pexels.com/photos/912050/pexels-photo-912050.jpeg?w=32&h=32',
    departure: { time: '14:20', airport: 'Charles de Gaulle', code: 'CDG', city: 'Paris' },
    arrival: { time: '16:35', airport: 'Heathrow', code: 'LHR', city: 'London' },
    duration: '2h 15m',
    stops: 0,
    price: 225,
    currency: 'EUR',
    cabinClass: 'economy',
    amenities: ['wifi', 'entertainment'],
    baggage: { cabin: '8kg', checked: '23kg' },
    availability: 3,
    carrier: 'British Airways',
    flightNumber: 'BA1234'
  },
  {
    id: '3',
    airline: 'Lufthansa',
    logo: 'https://images.pexels.com/photos/912050/pexels-photo-912050.jpeg?w=32&h=32',
    departure: { time: '11:15', airport: 'Charles de Gaulle', code: 'CDG', city: 'Paris' },
    arrival: { time: '15:30', airport: 'Heathrow', code: 'LHR', city: 'London' },
    duration: '4h 15m',
    stops: 1,
    price: 156,
    currency: 'EUR',
    cabinClass: 'economy',
    amenities: ['wifi'],
    baggage: { cabin: '8kg', checked: '23kg' },
    availability: 8,
    carrier: 'Lufthansa',
    flightNumber: 'LH1234'
  },
  {
    id: '4',
    airline: 'KLM',
    logo: 'https://images.pexels.com/photos/912050/pexels-photo-912050.jpeg?w=32&h=32',
    departure: { time: '18:45', airport: 'Charles de Gaulle', code: 'CDG', city: 'Paris' },
    arrival: { time: '21:00', airport: 'Heathrow', code: 'LHR', city: 'London' },
    duration: '2h 15m',
    stops: 0,
    price: 198,
    currency: 'EUR',
    cabinClass: 'economy',
    amenities: ['wifi', 'meal', 'entertainment'],
    baggage: { cabin: '8kg', checked: '23kg' },
    availability: 12,
    carrier: 'KLM',
    flightNumber: 'KL1234'
  }
];