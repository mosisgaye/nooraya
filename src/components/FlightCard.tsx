'use client';

import React from 'react';
import { Plane, Star, Wifi, Coffee, Plus } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/modules/ui';

interface Flight {
  id: string;
  airline: string;
  logo: string;
  departure: {
    time: string;
    airport: string;
    code: string;
  };
  arrival: {
    time: string;
    airport: string;
    code: string;
  };
  duration: string;
  stops: number;
  price: number;
  cabinClass: string;
  amenities: string[];
}

interface FlightCardProps {
  flight: Flight;
  onAddToComparison: (flight: Flight) => void;
  isInComparison: boolean;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight, onAddToComparison, isInComparison }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-4">
            <div className="relative w-8 h-8 mr-3">
              <Image src={flight.logo} alt={flight.airline} fill className="object-contain" />
            </div>
            <span className="font-medium text-gray-900">{flight.airline}</span>
            <span className="ml-2 text-sm text-gray-500">{flight.cabinClass}</span>
          </div>

          <div className="flex items-center space-x-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{flight.departure.time}</div>
              <div className="text-sm text-gray-600">{flight.departure.code}</div>
              <div className="text-xs text-gray-500">{flight.departure.airport}</div>
            </div>

            <div className="flex-1 flex items-center">
              <div className="flex-1 border-t border-gray-300 relative">
                <Plane className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-1 text-gray-400" size={16} />
              </div>
            </div>

            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">{flight.duration}</div>
              <div className="text-xs text-gray-500">
                {flight.stops === 0 ? 'Direct' : `${flight.stops} escale${flight.stops > 1 ? 's' : ''}`}
              </div>
            </div>

            <div className="flex-1 flex items-center">
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{flight.arrival.time}</div>
              <div className="text-sm text-gray-600">{flight.arrival.code}</div>
              <div className="text-xs text-gray-500">{flight.arrival.airport}</div>
            </div>
          </div>

          <div className="flex items-center mt-4 space-x-4">
            {flight.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center text-xs text-gray-500">
                {amenity === 'wifi' && <Wifi size={12} className="mr-1" />}
                {amenity === 'meal' && <Coffee size={12} className="mr-1" />}
                {amenity === 'entertainment' && <Star size={12} className="mr-1" />}
                <span className="capitalize">{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:ml-8 mt-4 lg:mt-0 text-center lg:text-right">
          <div className="text-3xl font-bold text-blue-600 mb-2">{flight.price}€</div>
          <div className="text-sm text-gray-500 mb-4">par personne</div>
          
          <div className="space-y-2">
            <Button variant="primary" size="md">
              Sélectionner
            </Button>
            
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onAddToComparison(flight)}
              disabled={isInComparison}
              icon={<Plus size={14} />}
            >
              {isInComparison ? 'Ajouté' : 'Comparer'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;