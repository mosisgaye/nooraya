'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Users, Search, MapPin } from 'lucide-react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import Image from 'next/image';
import { useFlightSearch } from '@/features/flights/hooks/useFlightSearch';
import { TripType } from '@/types';
import { Hero } from '@/components/layout';

export default function FlightsPageClient() {
  const router = useRouter();
  const { searchFlights, isLoading, error } = useFlightSearch();
  const [tripType, setTripType] = useState<TripType>('round-trip');
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants: 0
  });
  const [showPassengersDropdown, setShowPassengersDropdown] = useState(false);
  const [cabinClass, setCabinClass] = useState('economy');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const searchParams = {
      from: formData.get('departure') as string,
      to: formData.get('destination') as string,
      departureDate: departureDate ? format(departureDate, 'yyyy-MM-dd') : '',
      returnDate: returnDate ? format(returnDate, 'yyyy-MM-dd') : '',
      adults: passengers.adults,
      children: passengers.children,
      infants: passengers.infants,
      cabinClass,
      flexible: false
    };
    
    try {
      await searchFlights(searchParams);
      // Créer les query params pour la navigation
      const queryString = new URLSearchParams(
        Object.fromEntries(
          Object.entries(searchParams).map(([key, value]) => [key, String(value)])
        )
      ).toString();
      router.push(`/flight-results?${queryString}`);
    } catch (err) {
      console.error('Erreur lors de la recherche:', err);
    }
  };

  const totalPassengers = passengers.adults + passengers.children + passengers.infants;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-indigo-100">
      {/* Hero Section */}
      <Hero />


      {/* Popular Destinations */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Destinations populaires</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {popularDestinations.map((dest) => (
            <div key={dest.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-32 w-full">
                <Image src={dest.image} alt={dest.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw" className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg">{dest.name}</h3>
                <p className="text-gray-600 text-sm">{dest.country}</p>
                <p className="text-green-600 font-bold mt-2">À partir de {dest.price}€</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface PassengerSelectorProps {
  type: 'adults' | 'children' | 'infants';
  label: string;
  value: number;
  onChange: (type: 'adults' | 'children' | 'infants', operation: 'add' | 'subtract') => void;
}

const PassengerSelector: React.FC<PassengerSelectorProps> = ({ type, label, value, onChange }) => {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm">{label}</span>
      <div className="flex items-center space-x-3">
        <button
          type="button"
          onClick={() => onChange(type, 'subtract')}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
          disabled={type === 'adults' ? value <= 1 : value <= 0}
        >
          -
        </button>
        <span className="w-8 text-center">{value}</span>
        <button
          type="button"
          onClick={() => onChange(type, 'add')}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
        >
          +
        </button>
      </div>
    </div>
  );
};

const popularDestinations = [
  { id: 1, name: 'Paris', country: 'France', price: 89, image: 'https://images.pexels.com/photos/532826/pexels-photo-532826.jpeg' },
  { id: 2, name: 'Londres', country: 'Royaume-Uni', price: 125, image: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg' },
  { id: 3, name: 'Rome', country: 'Italie', price: 156, image: 'https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg' },
  { id: 4, name: 'Barcelone', country: 'Espagne', price: 98, image: 'https://images.pexels.com/photos/175773/pexels-photo-175773.jpeg' },
  { id: 5, name: 'Amsterdam', country: 'Pays-Bas', price: 134, image: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg' },
  { id: 6, name: 'Berlin', country: 'Allemagne', price: 112, image: 'https://images.pexels.com/photos/109629/pexels-photo-109629.jpeg' },
  { id: 7, name: 'Madrid', country: 'Espagne', price: 87, image: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg' },
  { id: 8, name: 'Lisbonne', country: 'Portugal', price: 145, image: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg' }
];