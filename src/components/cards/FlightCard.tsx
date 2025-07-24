'use client';

import React from 'react';
import { Plane, Star, Wifi, Coffee, Plus, Clock, Zap, TrendingUp, Luggage } from 'lucide-react';
import LazyImage from '../ui/lazy-image';
import { PriceDisplay } from '../ui/PriceDisplay';
import { Flight } from '@/types';

interface Badge {
  type: 'best-price' | 'fastest' | 'direct' | 'popular';
  label: string;
}

interface FlightCardProps {
  flight: Flight;
  onAddToComparison: (flight: Flight) => void;
  isInComparison: boolean;
  onSelect?: (flight: Flight) => void;
  badges?: Badge[];
}

const FlightCard: React.FC<FlightCardProps> = ({ flight, onAddToComparison, isInComparison, onSelect, badges = [] }) => {
  const getBadgeStyle = (type: string) => {
    switch (type) {
      case 'best-price':
        return 'bg-gradient-to-r from-emerald-500 to-green-500 text-white';
      case 'fastest':
        return 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white';
      case 'direct':
        return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white';
      case 'popular':
        return 'bg-gradient-to-r from-amber-500 to-orange-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };
  
  const getBadgeIcon = (type: string) => {
    switch (type) {
      case 'best-price':
        return <TrendingUp className="w-3 h-3" />;
      case 'fastest':
        return <Zap className="w-3 h-3" />;
      case 'direct':
        return <Plane className="w-3 h-3" />;
      case 'popular':
        return <Star className="w-3 h-3" />;
      default:
        return null;
    }
  };
  
  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group" role="article" aria-label={`Vol ${flight.airline} de ${flight.departure.airport} à ${flight.arrival.airport}`}>
      {/* Badges */}
      {badges.length > 0 && (
        <div className="flex flex-wrap gap-2 px-6 pt-4">
          {badges.map((badge, index) => (
            <span
              key={index}
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getBadgeStyle(badge.type)}`}
            >
              {getBadgeIcon(badge.type)}
              {badge.label}
            </span>
          ))}
        </div>
      )}
      
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-6">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="relative w-12 h-12 mr-4 bg-gray-50 rounded-lg p-2">
                <LazyImage 
                  src={flight.logo || flight.airlineLogo || '/placeholder-airline.png'} 
                  alt={`Logo de la compagnie aérienne ${flight.airline}`}
                  width={40}
                  height={40}
                  className="object-contain"
                  quality={90}
                  sizes="40px"
                />
              </div>
              <div>
                <div className="font-semibold text-gray-900">{flight.airline}</div>
                <div className="text-sm text-gray-500">{flight.flightNumber} • {flight.cabinClass}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 items-center" role="group" aria-label="Détails du vol">
            {/* Départ */}
            <div>
              <div className="text-2xl font-bold text-gray-900 mb-1" aria-label={`Départ à ${flight.departure.time}`}>{flight.departure.time}</div>
              <div className="font-medium text-gray-900">{flight.departure.airport}</div>
              <div className="text-sm text-gray-500">{flight.departure.city}</div>
            </div>

            {/* Durée et escales */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <div className="flex-1 h-0.5 bg-gray-200"></div>
                <div className="mx-2 relative">
                  <div className="w-8 h-8 bg-emerald-50 rounded-full flex items-center justify-center">
                    <Plane className="w-4 h-4 text-emerald-600 transform rotate-90" />
                  </div>
                  {flight.stops > 0 && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {flight.stops}
                    </div>
                  )}
                </div>
                <div className="flex-1 h-0.5 bg-gray-200"></div>
              </div>
              <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span className="font-medium">{flight.duration}</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {flight.stops === 0 ? 'Vol direct' : `${flight.stops} escale${flight.stops > 1 ? 's' : ''}`}
              </div>
            </div>

            {/* Arrivée */}
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900 mb-1" aria-label={`Arrivée à ${flight.arrival.time}`}>{flight.arrival.time}</div>
              <div className="font-medium text-gray-900">{flight.arrival.airport}</div>
              <div className="text-sm text-gray-500">{flight.arrival.city}</div>
            </div>
          </div>

          {/* Services et informations supplémentaires */}
          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {flight.amenities && flight.amenities.length > 0 && (
                <div className="flex items-center gap-3" role="list" aria-label="Services disponibles">
                  {flight.amenities.includes('wifi') && (
                    <div className="flex items-center gap-1 text-gray-600" role="listitem">
                      <Wifi className="w-4 h-4 text-blue-500" />
                      <span className="text-xs">Wi-Fi</span>
                    </div>
                  )}
                  {flight.amenities.includes('meal') && (
                    <div className="flex items-center gap-1 text-gray-600" role="listitem">
                      <Coffee className="w-4 h-4 text-amber-500" />
                      <span className="text-xs">Repas</span>
                    </div>
                  )}
                </div>
              )}
              {/* Bagages */}
              <div className="flex items-center gap-1 text-gray-600">
                <Luggage className="w-4 h-4 text-gray-500" />
                <span className="text-xs">23kg inclus</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:ml-8 mt-6 lg:mt-0 lg:pl-8 lg:border-l border-gray-100">
          <div className="text-center lg:text-right">
            <div className="mb-1">
              <PriceDisplay 
                amount={flight.price} 
                currency="EUR" 
                size="xl"
                className="text-gray-900 font-bold text-2xl"
                showCommissionLabel={false}
              />
            </div>
            <div className="text-sm text-gray-500 mb-4">par personne</div>
            <div className="inline-flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full mb-4">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Frais inclus
            </div>
            
            <div className="space-y-2">
              <button 
                onClick={() => {
                  console.log('Bouton cliqué!', flight);
                  onSelect?.(flight);
                }}
                className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white px-6 py-3 rounded-xl hover:from-emerald-700 hover:to-green-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                aria-label={`Sélectionner le vol ${flight.airline} à ${flight.price} euros`}
              >
                Sélectionner ce vol
              </button>
              
              <button
                onClick={() => onAddToComparison(flight)}
                disabled={isInComparison}
                className={`w-full px-4 py-2 rounded-lg border transition-all duration-200 text-sm font-medium flex items-center justify-center gap-2 ${
                  isInComparison 
                    ? 'border-emerald-300 text-emerald-700 bg-emerald-50' 
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
                }`}
                aria-label={isInComparison ? 'Vol ajouté à la comparaison' : 'Ajouter ce vol à la comparaison'}
              >
                <Plus className="w-4 h-4" />
                {isInComparison ? 'Ajouté à la comparaison' : 'Comparer'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default FlightCard;