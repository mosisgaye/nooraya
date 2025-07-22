'use client';

'use client';

import React from 'react';
import { Tag, ArrowRight } from 'lucide-react';
import LazyImage from '../ui/lazy-image';

interface Offer {
  id: number;
  destination: string;
  image: string;
  oldPrice: number;
  newPrice: number;
  discount: number;
  duration: string;
}

const offers: Offer[] = [
  {
    id: 1,
    destination: 'Paris, France',
    image: 'https://images.pexels.com/photos/532826/pexels-photo-532826.jpeg',
    oldPrice: 800,
    newPrice: 650,
    discount: 20,
    duration: '3 nuits'
  },
  {
    id: 2,
    destination: 'Bali, Indonésie',
    image: 'https://images.pexels.com/photos/1694621/pexels-photo-1694621.jpeg',
    oldPrice: 1400,
    newPrice: 1050,
    discount: 25,
    duration: '7 nuits'
  },
  {
    id: 3,
    destination: 'New York, États-Unis',
    image: 'https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg',
    oldPrice: 1200,
    newPrice: 950,
    discount: 20,
    duration: '5 nuits'
  },
  {
    id: 4,
    destination: 'Barcelone, Espagne',
    image: 'https://images.pexels.com/photos/175773/pexels-photo-175773.jpeg',
    oldPrice: 950,
    newPrice: 750,
    discount: 20,
    duration: '4 nuits'
  }
];

const SpecialOffers: React.FC = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-6 py-2 rounded-full mb-4">
              <Tag size={18} />
              <span className="text-sm font-bold uppercase tracking-wider">OFFRES SPÉCIALES</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">Promotions exclusives</h2>
            <p className="text-xl text-gray-600">Économisez jusqu&apos;à 25% sur ces destinations</p>
          </div>
          <a href="/offers" className="hidden md:flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-full font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl">
            <span>Voir toutes les offres</span>
            <ArrowRight size={20} />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {offers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <a href="/offers" className="inline-flex items-center text-green-500 hover:text-green-700 transition-colors">
            <span className="mr-1">Voir toutes les offres</span>
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

interface OfferCardProps {
  offer: Offer;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group transform hover:-translate-y-2">
      <div className="relative w-full h-48">
        <LazyImage 
          src={offer.image} 
          alt={`Offre spéciale ${offer.destination} - ${offer.duration} à partir de ${offer.newPrice}€ (${offer.discount}% de réduction)`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover"
          placeholder="blur"
          quality={75}
        />
        <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg">
          -{offer.discount}%
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">{offer.destination}</h3>
        <p className="text-gray-600 text-sm mb-4">{offer.duration} • Vol + Hôtel</p>
        <div className="flex items-baseline mb-6">
          <span className="text-gray-400 line-through text-sm mr-3">{offer.oldPrice}€</span>
          <span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{offer.newPrice}€</span>
          <span className="text-gray-500 text-sm ml-2">/ personne</span>
        </div>
        <button className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
          Voir l&apos;offre
        </button>
      </div>
    </div>
  );
};

export default SpecialOffers;