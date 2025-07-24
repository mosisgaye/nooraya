'use client';

import React, { useState, memo } from 'react';
import { Map, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

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
    name: 'Marrakech',
    country: 'Maroc',
    image: '/images/marrakech.jpg',
    bestTime: 'Mars - Mai',
    averagePrice: 700
  },
  {
    id: 2,
    name: 'Dubaï',
    country: 'Émirats Arabes Unis',
    image: '/images/dubai.jpg',
    bestTime: 'Octobre - Avril',
    averagePrice: 1200
  },
  {
    id: 3,
    name: 'Côte d&apos;Azur',
    country: 'France',
    image: '/images/piscine.jpg',
    bestTime: 'Mai - Septembre',
    averagePrice: 950
  },
  {
    id: 4,
    name: 'Séjour Détente',
    country: 'Destinations Variées',
    image: '/images/vacance.jpg',
    bestTime: 'Toute l&apos;année',
    averagePrice: 850
  },
  {
    id: 5,
    name: 'Hôtels de Luxe',
    country: 'International',
    image: '/images/hotel1.jpg',
    bestTime: 'Selon destination',
    averagePrice: 1500
  },
  {
    id: 6,
    name: 'Resorts & Spas',
    country: 'International',
    image: '/images/hotel2.jpg',
    bestTime: 'Toute l&apos;année',
    averagePrice: 1300
  }
];

const PopularDestinations: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  
  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const getVisibleCount = () => {
    if (windowWidth < 640) return 1;
    if (windowWidth < 1024) return 2;
    return 3;
  };
  
  const visibleCount = getVisibleCount();

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    const maxIndex = destinations.length - visibleCount;
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : prev));
  };

  return (
    <section className="py-12 sm:py-16 md:py-24 px-3 sm:px-4 bg-gradient-to-b from-white to-gray-50" role="region" aria-labelledby="popular-destinations-title">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-12">
          <div className="mb-6 sm:mb-0">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full mb-3 sm:mb-4">
              <Map size={16} className="sm:w-[18px] sm:h-[18px]" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">DESTINATIONS POPULAIRES</span>
            </div>
            <h2 id="popular-destinations-title" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3">Inspirez-vous</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">Explorez nos destinations les plus prisées</p>
          </div>
          <div className="hidden md:flex space-x-3" role="group" aria-label="Navigation du carrousel">
            <button 
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="p-2 sm:p-3 rounded-full bg-white shadow-lg border-2 border-gray-200 text-gray-600 hover:border-emerald-500 hover:text-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-emerald-500/20"
              aria-label="Destinations précédentes"
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <button 
              onClick={handleNext}
              disabled={currentIndex >= destinations.length - visibleCount}
              className="p-2 sm:p-3 rounded-full bg-white shadow-lg border-2 border-gray-200 text-gray-600 hover:border-emerald-500 hover:text-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-emerald-500/20"
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
              transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
              width: `${(destinations.length / visibleCount) * 100}%` 
            }}
          >
            {destinations.map((destination) => (
              <div 
                key={destination.id} 
                className="w-full sm:w-1/2 lg:w-1/3 p-2 sm:p-3"
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
            className="p-3 rounded-full bg-white shadow-lg border-2 border-gray-200 text-gray-600 hover:border-green-500 hover:text-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-500/20"
            aria-label="Destination précédente"
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <button 
            onClick={handleNext}
            disabled={currentIndex >= destinations.length - visibleCount}
            className="p-3 rounded-full bg-white shadow-lg border-2 border-gray-200 text-gray-600 hover:border-green-500 hover:text-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-500/20"
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
      className="destination-card relative h-72 sm:h-80 md:h-96 rounded-xl sm:rounded-2xl overflow-hidden group cursor-pointer shadow-lg sm:shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 focus:outline-none focus:ring-4 focus:ring-emerald-500/20"
      role="button"
      tabIndex={0}
      aria-label={`Découvrir ${destination.name}, ${destination.country} - Meilleure période: ${destination.bestTime}, Prix moyen: ${destination.averagePrice} euros`}
    >
      <Image 
        src={destination.image} 
        alt={`${destination.name}, ${destination.country} - Destination populaire`}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-300 group-hover:scale-110 will-change-transform"
        quality={80}
        priority={destination.id <= 3}
      />
      
      {/* Overlay avec gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all duration-300" aria-hidden="true"></div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6 text-white z-10">
        <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 drop-shadow-lg group-hover:text-emerald-400 transition-colors">{destination.name}</h3>
        <p className="text-base sm:text-lg mb-2 sm:mb-3 drop-shadow-md opacity-90">{destination.country}</p>
        
        <div className="overflow-hidden max-h-0 group-hover:max-h-20 transition-all duration-300">
          <div className="pt-1 sm:pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            <p className="text-xs sm:text-sm drop-shadow-md" aria-label={`Meilleure période pour visiter : ${destination.bestTime}`}>Meilleure période: {destination.bestTime}</p>
            <p className="text-base sm:text-lg font-bold drop-shadow-md bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent" aria-label={`Prix moyen du voyage : ${destination.averagePrice} euros`}>À partir de {destination.averagePrice}€</p>
          </div>
        </div>
      </div>
    </article>
  );
});

DestinationCard.displayName = 'DestinationCard';

export default PopularDestinations;