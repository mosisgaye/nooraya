'use client';

import React from 'react';
import { Star, Wifi, Car, Coffee, Dumbbell, MapPin, Plus } from 'lucide-react';
import LazyImage from '../ui/LazyImage';
import { Hotel } from '@/types';

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
    <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow" role="article" aria-label={`Hotel ${hotel.name} a ${hotel.location.city}`}>
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/3 h-48 lg:h-auto relative">
          <LazyImage 
            src={hotel.mainImage} 
            alt={`${hotel.name} - Hotel ${hotel.stars} etoiles a ${hotel.location.city}`}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover"
            placeholder="blur"
            quality={80}
          />
        </div>
        
        <div className="flex-1 p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{hotel.name}</h3>
              <div className="flex items-center text-sm text-gray-600 space-x-2">
                <MapPin size={16} className="text-gray-400" />
                <span aria-label={`Situe a ${hotel.location.city}, a ${hotel.distance}`}>{hotel.location.city} • {hotel.distance}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center mb-1" role="img" aria-label={`Hotel ${hotel.stars} etoiles`}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < hotel.stars ? 'text-yellow-400 fill-current' : 'text-gray-200'}
                  />
                ))}
              </div>
              <div className="text-xs text-gray-500 mt-1" aria-label={`Base sur ${hotel.reviews} avis`}>{hotel.reviews} avis</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {hotel.amenities.map((amenity) => (
              <span
                key={amenity.id}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
              >
                {amenityIcons[amenity.name] || null}
                <span className="ml-1">{amenity.name}</span>
              </span>
            ))}
          </div>

          <div className="flex items-center space-x-2 mb-4">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-green-600">{hotel.rating}</span>
              <span className="text-sm text-gray-600 ml-1">/10</span>
            </div>
            <span className="text-sm text-gray-600">Excellent</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-gray-900">
                {hotel.price}€
              </div>
              <p className="text-sm text-gray-500">par nuit</p>
            </div>
            
            <div className="flex space-x-2">
              <button
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                aria-label={`Reserver ${hotel.name} pour ${hotel.price} euros par nuit`}
              >
                Réserver
              </button>
              
              <button
                onClick={() => onAddToComparison(hotel)}
                disabled={isInComparison}
                className={`px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                  isInComparison 
                    ? 'border-green-300 text-green-600 bg-green-50' 
                    : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
                aria-label={isInComparison ? 'Hotel ajoute a la comparaison' : 'Ajouter cet hotel a la comparaison'}
              >
                <Plus size={20} />
                {isInComparison ? 'Ajoute' : 'Comparer'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default HotelCard;