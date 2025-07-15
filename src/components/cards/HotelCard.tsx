'use client';

import React from 'react';
import { Star, Wifi, Car, Coffee, Dumbbell, MapPin, Plus } from 'lucide-react';
<<<<<<< HEAD:src/components/HotelCard.tsx
import Image from 'next/image';
import { Button } from '@/modules/ui';
=======
import LazyImage from '../ui/LazyImage';
>>>>>>> 5262ff2 (description):src/components/cards/HotelCard.tsx

interface Hotel {
  id: string;
  name: string;
  image: string;
  location: string;
  stars: number;
  rating: number;
  reviews: number;
  price: number;
  distance: string;
  amenities: string[];
}

interface HotelCardProps {
  hotel: Hotel;
  onAddToComparison: (hotel: Hotel) => void;
  isInComparison: boolean;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel, onAddToComparison, isInComparison }) => {
  const amenityIcons: Record<string, React.ReactNode> = {
    'wifi': <Wifi size={16} />,
    'parking': <Car size={16} />,
    'restaurant': <Coffee size={16} />,
    'gym': <Dumbbell size={16} />
  };

  return (
    <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow" role="article" aria-label={`Hôtel ${hotel.name} à ${hotel.location}`}>
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/3 h-48 lg:h-auto relative">
          <LazyImage 
            src={hotel.image} 
            alt={`${hotel.name} - Hôtel ${hotel.stars} étoiles à ${hotel.location}`}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover"
            placeholder="blur"
            quality={80}
          />
        </div>
        
        <div className="flex-1 p-6">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{hotel.name}</h3>
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <MapPin size={14} className="mr-1" aria-hidden="true" />
                <span aria-label={`Situé à ${hotel.location}, à ${hotel.distance}`}>{hotel.location} • {hotel.distance}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center mb-1" role="img" aria-label={`Hôtel ${hotel.stars} étoiles`}>
                {[...Array(hotel.stars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" aria-hidden="true" />
                ))}
              </div>
              <div className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-sm font-medium" aria-label={`Note : ${hotel.rating} sur 10`}>
                {hotel.rating}/10
              </div>
              <div className="text-xs text-gray-500 mt-1" aria-label={`Basé sur ${hotel.reviews} avis`}>{hotel.reviews} avis</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4" role="list" aria-label="Services disponibles">
            {hotel.amenities.map((amenity, index) => (
              <span key={index} className="flex items-center text-xs bg-gray-100 px-2 py-1 rounded" role="listitem">
                <span aria-hidden="true">{amenityIcons[amenity] || <Star size={12} />}</span>
                <span className="ml-1 capitalize">{amenity}</span>
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div>
<<<<<<< HEAD:src/components/HotelCard.tsx
              <Button variant="success" size="md">
                <div className="text-sm text-gray-500">par nuit</div>
              </Button>
=======
              <div className="text-2xl font-bold text-emerald-600" aria-label={`Prix : ${hotel.price} euros par nuit`}>{hotel.price}€</div>
              <div className="text-sm text-gray-500">par nuit</div>
>>>>>>> 5262ff2 (description):src/components/cards/HotelCard.tsx
            </div>
            
            <div className="flex gap-2" role="group" aria-label="Actions pour cet hôtel">
              <button 
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                aria-label={`Voir les chambres disponibles pour ${hotel.name}`}
              >
                Voir les chambres
              </button>
              
              <Button
                variant="secondary"
                size="sm"
                disabled={isInComparison}
<<<<<<< HEAD:src/components/HotelCard.tsx
                icon={<Plus size={14} />}
              >
                <Plus size={14} className="inline mr-1" />
              </Button>
=======
                className={`px-4 py-2 rounded-lg border transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
                  isInComparison 
                    ? 'border-green-300 text-green-600 bg-green-50' 
                    : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
                aria-label={isInComparison ? 'Hôtel ajouté à la comparaison' : 'Ajouter cet hôtel à la comparaison'}
              >
                <Plus size={14} className="inline mr-1" aria-hidden="true" />
                {isInComparison ? 'Ajouté' : 'Comparer'}
              </button>
>>>>>>> 5262ff2 (description):src/components/cards/HotelCard.tsx
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default HotelCard;