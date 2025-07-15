'use client';

import React from 'react';
import { Plane, Star, Wifi, Coffee, Plus } from 'lucide-react';
import LazyImage from '../ui/LazyImage';

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
    <article className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow" role="article" aria-label={`Vol ${flight.airline} de ${flight.departure.airport} à ${flight.arrival.airport}`}>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-4">
            <div className="relative w-8 h-8 mr-3">
              <LazyImage 
                src={flight.logo} 
                alt={`Logo de la compagnie aérienne ${flight.airline}`}
                width={32}
                height={32}
                className="object-contain"
                quality={90}
                sizes="32px"
              />
            </div>
            <span className="font-medium text-gray-900">{flight.airline}</span>
            <span className="ml-2 text-sm text-gray-500">{flight.cabinClass}</span>
          </div>

          <div className="flex items-center space-x-8" role="group" aria-label="Détails du vol">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900" aria-label={`Départ à ${flight.departure.time}`}>{flight.departure.time}</div>
              <div className="text-sm text-gray-600">{flight.departure.code}</div>
              <div className="text-xs text-gray-500">{flight.departure.airport}</div>
            </div>

            <div className="flex-1 flex items-center" aria-hidden="true">
              <div className="flex-1 border-t border-gray-300 relative">
                <Plane className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-1 text-gray-400" size={16} aria-hidden="true" />
              </div>
            </div>

            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1" aria-label={`Durée du vol : ${flight.duration}`}>{flight.duration}</div>
              <div className="text-xs text-gray-500">
                {flight.stops === 0 ? 'Direct' : `${flight.stops} escale${flight.stops > 1 ? 's' : ''}`}
              </div>
            </div>

            <div className="flex-1 flex items-center" aria-hidden="true">
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900" aria-label={`Arrivée à ${flight.arrival.time}`}>{flight.arrival.time}</div>
              <div className="text-sm text-gray-600">{flight.arrival.code}</div>
              <div className="text-xs text-gray-500">{flight.arrival.airport}</div>
            </div>
          </div>

          <div className="flex items-center mt-4 space-x-4" role="list" aria-label="Services disponibles">
            {flight.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center text-xs text-gray-500" role="listitem">
                {amenity === 'wifi' && <Wifi size={12} className="mr-1" aria-hidden="true" />}
                {amenity === 'meal' && <Coffee size={12} className="mr-1" aria-hidden="true" />}
                {amenity === 'entertainment' && <Star size={12} className="mr-1" aria-hidden="true" />}
                <span className="capitalize">{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:ml-8 mt-4 lg:mt-0 text-center lg:text-right">
          <div className="text-3xl font-bold text-blue-600 mb-2" aria-label={`Prix : ${flight.price} euros par personne`}>{flight.price}€</div>
          <div className="text-sm text-gray-500 mb-4">par personne</div>
          
          <div className="space-y-2" role="group" aria-label="Actions pour ce vol">
            <button 
              className="w-full lg:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label={`Sélectionner le vol ${flight.airline} à ${flight.price} euros`}
            >
              Sélectionner
            </button>
            
            <button
              onClick={() => onAddToComparison(flight)}
              disabled={isInComparison}
              className={`w-full lg:w-auto px-6 py-2 rounded-lg border transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isInComparison 
                  ? 'border-green-300 text-green-600 bg-green-50' 
                  : 'border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
              aria-label={isInComparison ? 'Vol ajouté à la comparaison' : 'Ajouter ce vol à la comparaison'}
            >
              <Plus size={14} className="inline mr-1" aria-hidden="true" />
              {isInComparison ? 'Ajouté' : 'Comparer'}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default FlightCard;