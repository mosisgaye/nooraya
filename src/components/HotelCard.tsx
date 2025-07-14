'use client';

import React from 'react';
import { Star, Wifi, Car, Coffee, Dumbbell, MapPin, Plus } from 'lucide-react';
import Image from 'next/image';

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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/3 h-48 lg:h-auto relative">
          <Image 
            src={hotel.image} 
            alt={hotel.name}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="flex-1 p-6">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{hotel.name}</h3>
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <MapPin size={14} className="mr-1" />
                {hotel.location} • {hotel.distance}
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center mb-1">
                {[...Array(hotel.stars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <div className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-sm font-medium">
                {hotel.rating}/10
              </div>
              <div className="text-xs text-gray-500 mt-1">{hotel.reviews} avis</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {hotel.amenities.map((amenity, index) => (
              <span key={index} className="flex items-center text-xs bg-gray-100 px-2 py-1 rounded">
                {amenityIcons[amenity] || <Star size={12} />}
                <span className="ml-1 capitalize">{amenity}</span>
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-emerald-600">{hotel.price}€</div>
              <div className="text-sm text-gray-500">par nuit</div>
            </div>
            
            <div className="flex gap-2">
              <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium">
                Voir les chambres
              </button>
              
              <button
                onClick={() => onAddToComparison(hotel)}
                disabled={isInComparison}
                className={`px-4 py-2 rounded-lg border transition-colors text-sm ${
                  isInComparison 
                    ? 'border-green-300 text-green-600 bg-green-50' 
                    : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Plus size={14} className="inline mr-1" />
                {isInComparison ? 'Ajouté' : 'Comparer'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;