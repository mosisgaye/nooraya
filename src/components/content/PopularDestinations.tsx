'use client';

'use client';

import React, { useState, memo } from 'react';
import { Map, ChevronLeft, ChevronRight } from 'lucide-react';
import LazyImage from '../ui/lazy-image';

interface Destination {
  id: number;
  name: string;
  country: string;
  image: string;
  bestTime: string;
  averagePrice: number;
}

const destinations: Destination[] = [
  {
    id: 1,
    name: 'Tokyo',
    country: 'Japon',
    image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg',
    bestTime: 'Avril - Mai',
    averagePrice: 1200
  },
  {
    id: 2,
    name: 'Rome',
    country: 'Italie',
    image: 'https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg',
    bestTime: 'Avril - Juin',
    averagePrice: 850
  },
  {
    id: 3,
    name: 'Cancún',
    country: 'Mexique',
    image: 'https://images.pexels.com/photos/1802255/pexels-photo-1802255.jpeg',
    bestTime: 'Décembre - Avril',
    averagePrice: 950
  },
  {
    id: 4,
    name: 'Marrakech',
    country: 'Maroc',
    image: 'https://images.pexels.com/photos/4245826/pexels-photo-4245826.jpeg',
    bestTime: 'Mars - Mai',
    averagePrice: 700
  },
  {
    id: 5,
    name: 'Santorini',
    country: 'Grèce',
    image: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg',
    bestTime: 'Mai - Septembre',
    averagePrice: 1100
  }
];

const PopularDestinations: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = { mobile: 1, tablet: 2, desktop: 3 };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    const maxIndex = destinations.length - visibleCount.desktop;
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : prev));
  };

  return (
    <section className="py-16 px-4" role="region" aria-labelledby="popular-destinations-title">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="flex items-center text-green-500 font-medium mb-2">
              <Map size={18} className="mr-2" aria-hidden="true" />
              <span>DESTINATIONS POPULAIRES</span>
            </div>
            <h2 id="popular-destinations-title" className="text-3xl font-bold text-green-900">Inspirez-vous</h2>
            <p className="text-gray-600 mt-2">Explorez nos destinations les plus prisées</p>
          </div>
          <div className="hidden md:flex space-x-3" role="group" aria-label="Navigation du carrousel">
            <button 
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="p-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 will-change-transform focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              aria-label="Destinations précédentes"
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <button 
              onClick={handleNext}
              disabled={currentIndex >= destinations.length - visibleCount.desktop}
              className="p-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 will-change-transform focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              aria-label="Destinations suivantes"
            >
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden" role="region" aria-live="polite" aria-label="Carrousel des destinations">
          <div 
            className="flex transition-transform duration-300 ease-out will-change-transform"
            style={{ 
              transform: `translateX(-${currentIndex * (100 / visibleCount.desktop)}%)`,
              width: `${(destinations.length / visibleCount.desktop) * 100}%` 
            }}
          >
            {destinations.map((destination) => (
              <div 
                key={destination.id} 
                className="w-full sm:w-1/2 lg:w-1/3 p-3"
              >
                <DestinationCard destination={destination} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center md:hidden space-x-3" role="group" aria-label="Navigation du carrousel mobile">
          <button 
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="p-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            aria-label="Destination précédente"
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <button 
            onClick={handleNext}
            disabled={currentIndex >= destinations.length - 1}
            className="p-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            aria-label="Destination suivante"
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
};

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard: React.FC<DestinationCardProps> = memo(({ destination }) => {
  return (
    <article 
      className="destination-card relative h-80 rounded-xl overflow-hidden group cursor-pointer will-change-transform focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      role="button"
      tabIndex={0}
      aria-label={`Découvrir ${destination.name}, ${destination.country} - Meilleure période: ${destination.bestTime}, Prix moyen: ${destination.averagePrice} euros`}
    >
      <LazyImage 
        src={destination.image} 
        alt={`${destination.name}, ${destination.country} - Destination populaire`}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-300 group-hover:scale-110 will-change-transform"
        placeholder="blur"
        quality={80}
      />
      
      {/* Overlay pour améliorer le contraste */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300" aria-hidden="true"></div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
        <h3 className="text-2xl font-bold mb-1 drop-shadow-lg">{destination.name}</h3>
        <p className="mb-2 drop-shadow-md">{destination.country}</p>
        
        <div className="overflow-hidden max-h-0 group-hover:max-h-20 transition-all duration-300">
          <div className="pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            <p className="text-sm drop-shadow-md" aria-label={`Meilleure période pour visiter : ${destination.bestTime}`}>Meilleure période: {destination.bestTime}</p>
            <p className="text-sm drop-shadow-md" aria-label={`Prix moyen du voyage : ${destination.averagePrice} euros`}>Prix moyen: {destination.averagePrice}€</p>
          </div>
        </div>
      </div>
    </article>
  );
});

DestinationCard.displayName = 'DestinationCard';

export default PopularDestinations;