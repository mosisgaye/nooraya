'use client';

import React, { useState } from 'react';
import { User } from 'lucide-react';

interface Passenger {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  passportNumber?: string;
  passportExpiry?: string;
  nationality?: string;
  gender: 'M' | 'F';
  type: 'adult' | 'child' | 'infant';
}

interface PassengerFormProps {
  passengerCount: number;
  onSubmit: (passengers: Passenger[]) => void;
  onBack: () => void;
}

export default function PassengerForm({ passengerCount, onSubmit, onBack }: PassengerFormProps) {
  const [passengers, setPassengers] = useState<Passenger[]>(
    Array.from({ length: passengerCount }, (_, i) => ({
      id: `passenger-${i}`,
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: 'M' as const,
      type: 'adult' as const
    }))
  );

  const handlePassengerChange = (index: number, field: keyof Passenger, value: string) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value };
    setPassengers(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(passengers);
  };

  const isFormValid = passengers.every(p => 
    p.firstName && p.lastName && p.dateOfBirth && p.gender
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Informations des passagers</h2>
      
      {passengers.map((passenger, index) => (
        <div key={passenger.id} className="bg-white border rounded-lg p-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <User className="text-gray-600" size={20} />
            <h3 className="text-lg font-semibold">Passager {index + 1}</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Prénom *</label>
              <input
                type="text"
                value={passenger.firstName}
                onChange={(e) => handlePassengerChange(index, 'firstName', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Nom *</label>
              <input
                type="text"
                value={passenger.lastName}
                onChange={(e) => handlePassengerChange(index, 'lastName', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Date de naissance *</label>
              <input
                type="date"
                value={passenger.dateOfBirth}
                onChange={(e) => handlePassengerChange(index, 'dateOfBirth', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Genre *</label>
              <select
                value={passenger.gender}
                onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                required
              >
                <option value="M">Masculin</option>
                <option value="F">Féminin</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Numéro de passeport</label>
              <input
                type="text"
                value={passenger.passportNumber || ''}
                onChange={(e) => handlePassengerChange(index, 'passportNumber', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="Optionnel pour les vols domestiques"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Nationalité</label>
              <input
                type="text"
                value={passenger.nationality || ''}
                onChange={(e) => handlePassengerChange(index, 'nationality', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="Ex: Sénégalaise"
              />
            </div>
          </div>
        </div>
      ))}
      
      <div className="flex gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
        >
          Retour
        </button>
        <button
          type="submit"
          disabled={!isFormValid}
          className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Continuer vers le paiement
        </button>
      </div>
    </form>
  );
}