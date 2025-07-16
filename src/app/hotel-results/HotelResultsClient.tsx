'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Filter, SortAsc, Star, Bell, Map, Calendar } from 'lucide-react';
import dynamic from 'next/dynamic';
import HotelCard from '@/components/cards/HotelCard';
import { Hotel } from '@/types';

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
const InteractiveMap = dynamic(() => import('@/components/ui/InteractiveMap'), { 
  loading: () => <div>Chargement...</div> 
});


interface ComparisonItem {
  id: string;
  type: "flight" | "hotel";
  data: Hotel;
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
export default function HotelResultsClient() {
  return (
    <Suspense fallback={<LoadingHotels />}>
      <HotelResultsContent />
    </Suspense>
  );
}

function LoadingHotels() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-600 mx-auto mb-4"></div>
        <p className="text-lg text-gray-600">Recherche des meilleurs hôtels...</p>
      </div>
    </div>
  );
}

function HotelResultsContent() {
  const searchParams = useSearchParams();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('price');
  
  // État des filtres avec le bon type
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 1000],
    stars: [],
    rating: 0,
    amenities: [],
    propertyTypes: [],
    districts: [],
    guestRating: 0
  });
  
  // États pour les nouvelles fonctionnalités
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [comparisonItems, setComparisonItems] = useState<ComparisonItem[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [showPriceAlerts, setShowPriceAlerts] = useState(false);
  const [showMap, setShowMap] = useState(false);

  // Récupérer les paramètres de recherche
  const searchData = {
    destination: searchParams.get('destination'),
    checkIn: searchParams.get('checkIn'),
    checkOut: searchParams.get('checkOut'),
    rooms: searchParams.get('rooms'),
    adults: searchParams.get('adults'),
    children: searchParams.get('children')
  };

  useEffect(() => {
    // Simulate API call with mock data
    setTimeout(() => {
      setHotels(mockHotels);
      setLoading(false);
    }, 1500);
  }, []);

  const sortedHotels = [...hotels].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'rating':
        return b.rating - a.rating;
      case 'stars':
        return b.stars - a.stars;
      case 'distance':
        return parseFloat(a.distance) - parseFloat(b.distance);
      default:
        return 0;
    }
  });

  const addToComparison = (hotel: Hotel) => {
    if (comparisonItems.length < 4 && !comparisonItems.find(item => item.id === hotel.id)) {
      setComparisonItems([...comparisonItems, { id: hotel.id, type: 'hotel', data: hotel }]);
    }
  };

  const removeFromComparison = (id: string) => {
    setComparisonItems(comparisonItems.filter(item => item.id !== id));
  };

  const mapLocations = hotels.map(hotel => ({
    id: hotel.id,
    name: hotel.name,
    type: 'hotel' as const,
    lat: 48.8566 + (Math.random() - 0.5) * 0.1,
    lng: 2.3522 + (Math.random() - 0.5) * 0.1,
    price: hotel.price,
    rating: hotel.rating,
    image: hotel.mainImage,
    description: `${hotel.stars} étoiles • ${hotel.amenities.length} équipements`
  }));

  if (loading) {
    return <LoadingHotels />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Summary */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl font-bold text-gray-900">
                Hôtels à {searchData.destination}
              </h1>
              <p className="text-gray-600">
                <Calendar className="inline-block mr-1" size={16} />
                {searchData.checkIn} - {searchData.checkOut} • 
                {searchData.rooms} chambre{Number(searchData.rooms) > 1 ? 's' : ''} • 
                {searchData.adults} adulte{Number(searchData.adults) > 1 ? 's' : ''}
                {searchData.children && Number(searchData.children) > 0 ? `, ${searchData.children} enfant${Number(searchData.children) > 1 ? 's' : ''}` : ''}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
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
                href="/hotels"
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm"
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
                  className="text-emerald-600 hover:text-emerald-700 text-sm"
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
                  <option value="rating">Note (décroissant)</option>
                  <option value="stars">Étoiles (décroissant)</option>
                  <option value="distance">Distance</option>
                </select>
              </div>

              {/* Quick Filters */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre d&apos;étoiles
                </label>
                <div className="space-y-2">
                  {[5, 4, 3, 2].map(star => (
                    <label key={star} className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <div className="flex items-center">
                        {[...Array(star)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prix par nuit (€)
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

              {/* Amenities */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Équipements
                </label>
                <div className="space-y-2">
                  <label className="flex items-center text-sm">
                    <input type="checkbox" className="mr-2" />
                    Wi-Fi gratuit
                  </label>
                  <label className="flex items-center text-sm">
                    <input type="checkbox" className="mr-2" />
                    Parking
                  </label>
                  <label className="flex items-center text-sm">
                    <input type="checkbox" className="mr-2" />
                    Piscine
                  </label>
                  <label className="flex items-center text-sm">
                    <input type="checkbox" className="mr-2" />
                    Salle de sport
                  </label>
                </div>
              </div>
            </div>

            {/* Comparison Panel Toggle */}
            {comparisonItems.length > 0 && (
              <div className="mt-4 bg-emerald-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Comparaison</span>
                  <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs">
                    {comparisonItems.length}
                  </span>
                </div>
                <button
                  onClick={() => setShowComparison(true)}
                  className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors"
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
                {hotels.length} hôtels trouvés
              </p>
              <div className="flex items-center space-x-2">
                <SortAsc size={16} />
                <span className="text-sm text-gray-600">Triés par {sortBy === 'price' ? 'prix' : sortBy === 'rating' ? 'note' : sortBy}</span>
              </div>
            </div>

            <div className="space-y-4">
              {sortedHotels.map((hotel) => (
                <HotelCard 
                  key={hotel.id} 
                  hotel={hotel} 
                  onAddToComparison={addToComparison}
                  isInComparison={comparisonItems.some(item => item.id === hotel.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showAdvancedFilters && (
        <AdvancedFilters
          type="hotels"
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
            type: 'hotel',
            destination: searchData.destination,
            currentPrice: sortedHotels[0]?.price
          }}
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

const mockHotels: Hotel[] = [
  {
    id: '1',
    name: 'Hôtel Plaza Athénée',
    images: ['https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg'],
    mainImage: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
    location: {
      address: '25 Avenue Montaigne',
      city: 'Paris 8ème',
      country: 'France',
      coordinates: { lat: 48.8654, lng: 2.3066 }
    },
    stars: 5,
    rating: 9.2,
    reviews: 1847,
    price: 450,
    currency: 'EUR',
    description: 'Luxueux hôtel palace situé avenue Montaigne',
    distance: '2.5 km',
    amenities: [
      { id: '1', name: 'wifi', category: 'basic' },
      { id: '2', name: 'parking', category: 'comfort' },
      { id: '3', name: 'restaurant', category: 'basic' },
      { id: '4', name: 'gym', category: 'leisure' },
      { id: '5', name: 'spa', category: 'leisure' }
    ]
  },
  {
    id: '2',
    name: 'Le Meurice',
    images: ['https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg'],
    mainImage: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
    location: {
      address: '228 Rue de Rivoli',
      city: 'Paris 1er',
      country: 'France',
      coordinates: { lat: 48.8655, lng: 2.3279 }
    },
    stars: 5,
    rating: 9.4,
    reviews: 2156,
    price: 520,
    currency: 'EUR',
    description: 'Hôtel de luxe face au jardin des Tuileries',
    distance: '1 km',
    amenities: [
      { id: '1', name: 'wifi', category: 'basic' },
      { id: '2', name: 'restaurant', category: 'basic' },
      { id: '3', name: 'gym', category: 'leisure' },
      { id: '4', name: 'spa', category: 'leisure' },
      { id: '5', name: 'pool', category: 'leisure' }
    ]
  },
  {
    id: '3',
    name: 'Hôtel de Crillon',
    images: ['https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg'],
    mainImage: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
    location: {
      address: '10 Place de la Concorde',
      city: 'Place de la Concorde',
      country: 'France',
      coordinates: { lat: 48.8686, lng: 2.3210 }
    },
    stars: 5,
    rating: 9.3,
    reviews: 1543,
    price: 580,
    currency: 'EUR',
    description: 'Palace emblématique place de la Concorde',
    distance: '1.8 km',
    amenities: [
      { id: '1', name: 'wifi', category: 'basic' },
      { id: '2', name: 'parking', category: 'comfort' },
      { id: '3', name: 'restaurant', category: 'basic' },
      { id: '4', name: 'gym', category: 'leisure' },
      { id: '5', name: 'spa', category: 'leisure' }
    ]
  },
  {
    id: '4',
    name: 'Le Bristol Paris',
    images: ['https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg'],
    mainImage: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg',
    location: {
      address: '112 Rue du Faubourg Saint-Honoré',
      city: 'Faubourg Saint-Honoré',
      country: 'France',
      coordinates: { lat: 48.8721, lng: 2.3149 }
    },
    stars: 5,
    rating: 9.5,
    reviews: 1876,
    price: 650,
    currency: 'EUR',
    description: 'Hôtel de prestige avec jardin français',
    distance: '2.2 km',
    amenities: [
      { id: '1', name: 'wifi', category: 'basic' },
      { id: '2', name: 'restaurant', category: 'basic' },
      { id: '3', name: 'gym', category: 'leisure' },
      { id: '4', name: 'spa', category: 'leisure' },
      { id: '5', name: 'pool', category: 'leisure' }
    ]
  },
  {
    id: '5',
    name: 'Four Seasons George V',
    images: ['https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg'],
    mainImage: 'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg',
    location: {
      address: '31 Avenue George V',
      city: 'Champs-Élysées',
      country: 'France',
      coordinates: { lat: 48.8686, lng: 2.3010 }
    },
    stars: 5,
    rating: 9.6,
    reviews: 2341,
    price: 750,
    currency: 'EUR',
    description: 'Hôtel de luxe près des Champs-Élysées',
    distance: '2.8 km',
    amenities: [
      { id: '1', name: 'wifi', category: 'basic' },
      { id: '2', name: 'parking', category: 'comfort' },
      { id: '3', name: 'restaurant', category: 'basic' },
      { id: '4', name: 'gym', category: 'leisure' },
      { id: '5', name: 'spa', category: 'leisure' }
    ]
  },
  {
    id: '6',
    name: 'Hôtel des Grands Boulevards',
    images: ['https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg'],
    mainImage: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg',
    location: {
      address: '17 Boulevard Poissonnière',
      city: 'Grands Boulevards',
      country: 'France',
      coordinates: { lat: 48.8717, lng: 2.3469 }
    },
    stars: 4,
    rating: 8.8,
    reviews: 987,
    price: 280,
    currency: 'EUR',
    description: 'Hôtel boutique dans le quartier des Grands Boulevards',
    distance: '3.5 km',
    amenities: [
      { id: '1', name: 'wifi', category: 'basic' },
      { id: '2', name: 'restaurant', category: 'basic' },
      { id: '3', name: 'gym', category: 'leisure' }
    ]
  }
];