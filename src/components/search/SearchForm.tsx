'use client';

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import { ChevronDown, Plus, Minus, Loader2 } from 'lucide-react';

interface Field {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  icon: React.ReactNode;
}

interface SearchFormProps {
  type: 'flights' | 'hotels' | 'combined';
  fields: Field[];
  buttonText: string;
  buttonIcon: React.ReactNode;
  onSearch: (data: Record<string, string | number | boolean>, type: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ type, fields, buttonText, buttonIcon, onSearch }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants: 0
  });
  const [showPassengersDropdown, setShowPassengersDropdown] = useState(false);
  const [flexibleDates, setFlexibleDates] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const data: Record<string, string | number | boolean> = {};
      
      // Collecter les données du formulaire
      fields.forEach((field) => {
        if (field.id === 'dates') {
          data.departureDate = departureDate ? format(departureDate, 'yyyy-MM-dd') : '';
          data.returnDate = returnDate ? format(returnDate, 'yyyy-MM-dd') : '';
        } else if (field.id === 'passengers') {
          data.adults = passengers.adults;
          data.children = passengers.children;
          data.infants = passengers.infants;
        } else {
          const value = formData.get(field.id);
          if (value !== null) {
            data[field.id] = value.toString();
          }
        }
      });

      // Ajouter les options supplémentaires
      data.flexibleDates = flexibleDates;
      data.searchType = type;

      // Validation
      const requiredFields = fields.filter(f => f.id !== 'returnDate');
      for (const field of requiredFields) {
        if (field.id === 'dates' && !departureDate) {
          throw new Error('Veuillez sélectionner une date de départ');
        } else if (field.id !== 'dates' && field.id !== 'passengers' && !data[field.id]) {
          throw new Error(`Veuillez remplir le champ ${field.label}`);
        }
      }

      if (type === 'flights' && returnDate && departureDate && returnDate < departureDate) {
        throw new Error('La date de retour doit être après la date de départ');
      }

      await onSearch(data, type);
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'Une erreur est survenue lors de la recherche');
    } finally {
      setLoading(false);
    }
  };

  const handlePassengerChange = (type: 'adults' | 'children' | 'infants', operation: 'add' | 'subtract') => {
    setPassengers(prev => ({
      ...prev,
      [type]: operation === 'add' ? prev[type] + 1 : Math.max(type === 'adults' ? 1 : 0, prev[type] - 1)
    }));
  };

  const totalPassengers = passengers.adults + passengers.children + passengers.infants;

  return (
    <form onSubmit={handleSubmit} className="space-y-6" role="search" aria-label="Recherche de vols et hotels">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {fields.map((field) => {
          if (field.id === 'dates') {
            return (
              <div key={field.id} className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2" id={`${field.id}-label`}>
                  {field.label}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <DatePicker
                      selected={departureDate}
                      onChange={(date: Date | null) => setDepartureDate(date)}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Départ"
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                      minDate={new Date()}
                      id="departure-date"
                      autoComplete="off"
                      aria-labelledby="dates-label"
                      aria-required="true"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      {field.icon}
                    </div>
                  </div>
                  {type === 'flights' && (
                    <div className="relative">
                      <DatePicker
                        selected={returnDate}
                        onChange={(date: Date | null) => setReturnDate(date)}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Retour"
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                        minDate={departureDate || new Date()}
                        id="return-date"
                        autoComplete="off"
                        aria-labelledby="dates-label"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {field.icon}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          } else if (field.id === 'passengers') {
            return (
              <div key={field.id} className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2" id={`${field.id}-label`}>
                  {field.label}
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassengersDropdown(!showPassengersDropdown)}
                  className="w-full flex items-center justify-between pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm text-left"
                  aria-label={`${totalPassengers} passager${totalPassengers > 1 ? 's' : ''}`}
                  aria-expanded={showPassengersDropdown}
                  aria-haspopup="true"
                >
                  <span>{totalPassengers} passager{totalPassengers > 1 ? 's' : ''}</span>
                  <ChevronDown className={`transform transition-transform ${showPassengersDropdown ? 'rotate-180' : ''}`} size={16} />
                </button>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none mt-8">
                  {field.icon}
                </div>
                
                {showPassengersDropdown && (
                  <div 
                    className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50"
                    role="dialog"
                    aria-label="Sélection du nombre de passagers"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Adultes</p>
                          <p className="text-xs text-gray-500">12 ans et plus</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() => handlePassengerChange('adults', 'subtract')}
                            disabled={passengers.adults <= 1}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Diminuer le nombre d'adultes"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center" aria-live="polite">{passengers.adults}</span>
                          <button
                            type="button"
                            onClick={() => handlePassengerChange('adults', 'add')}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                            aria-label="Augmenter le nombre d'adultes"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Enfants</p>
                          <p className="text-xs text-gray-500">2-11 ans</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() => handlePassengerChange('children', 'subtract')}
                            disabled={passengers.children <= 0}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Diminuer le nombre d'enfants"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center" aria-live="polite">{passengers.children}</span>
                          <button
                            type="button"
                            onClick={() => handlePassengerChange('children', 'add')}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                            aria-label="Augmenter le nombre d'enfants"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Bébés</p>
                          <p className="text-xs text-gray-500">Moins de 2 ans</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() => handlePassengerChange('infants', 'subtract')}
                            disabled={passengers.infants <= 0}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Diminuer le nombre de bébés"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center" aria-live="polite">{passengers.infants}</span>
                          <button
                            type="button"
                            onClick={() => handlePassengerChange('infants', 'add')}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                            aria-label="Augmenter le nombre de bébés"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          } else {
            return (
              <div key={field.id} className="relative">
                <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  id={field.id}
                  name={field.id}
                  placeholder={field.placeholder}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  required={field.id !== 'returnDate'}
                  autoComplete={field.id === 'origin' || field.id === 'destination' ? 'off' : undefined}
                  aria-required={field.id !== 'returnDate' ? 'true' : 'false'}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none mt-8">
                  {field.icon}
                </div>
              </div>
            );
          }
        })}
      </div>

      {type === 'flights' && (
        <div className="flex items-center space-x-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={flexibleDates}
              onChange={(e) => setFlexibleDates(e.target.checked)}
              className="mr-2 rounded border-gray-300 text-green-600 focus:ring-green-500"
              aria-label="Dates flexibles"
            />
            <span className="text-sm text-gray-700">Dates flexibles (+/- 3 jours)</span>
          </label>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm" role="alert">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-lg font-medium hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label={loading ? 'Recherche en cours' : buttonText}
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            <span>Recherche en cours...</span>
          </>
        ) : (
          <>
            {buttonIcon}
            <span>{buttonText}</span>
          </>
        )}
      </button>
    </form>
  );
};

export default SearchForm;