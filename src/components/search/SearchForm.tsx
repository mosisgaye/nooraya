'use client';

'use client';

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import { ChevronDown, Plus, Minus, Loader2 } from 'lucide-react';
import { Button } from '@/modules/ui';

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

  // Gestion des touches du clavier pour l'accessibilité
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowPassengersDropdown(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      
      if (type === 'flights') {
        const searchData = {
          from: formData.get('departure') as string,
          to: formData.get('destination') as string,
          departureDate: departureDate ? format(departureDate, 'yyyy-MM-dd') : '',
          returnDate: returnDate ? format(returnDate, 'yyyy-MM-dd') : '',
          passengers: passengers.adults + passengers.children + passengers.infants,
          adults: passengers.adults,
          children: passengers.children,
          infants: passengers.infants,
          flexible: flexibleDates
        };
        
        if (!searchData.from || !searchData.to || !searchData.departureDate) {
          throw new Error('Veuillez remplir tous les champs requis');
        }
        
        // Simulation d'un délai de recherche
        await new Promise(resolve => setTimeout(resolve, 1500));
        onSearch(searchData, 'flights');
      } else if (type === 'hotels') {
        const searchData = {
          destination: formData.get('destination') as string,
          checkIn: departureDate ? format(departureDate, 'yyyy-MM-dd') : '',
          checkOut: returnDate ? format(returnDate, 'yyyy-MM-dd') : '',
          rooms: 1,
          adults: passengers.adults,
          children: passengers.children,
          flexible: flexibleDates
        };
        
        if (!searchData.destination || !searchData.checkIn || !searchData.checkOut) {
          throw new Error('Veuillez remplir tous les champs requis');
        }
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        onSearch(searchData, 'hotels');
      }
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
    <form onSubmit={handleSubmit} className="space-y-6" role="search" aria-label="Recherche de vols et hôtels" onKeyDown={handleKeyDown}>
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
                      minDate={new Date()}
                      placeholderText={type === 'hotels' ? 'Arrivée' : 'Départ'}
                      className="input-field pl-10 w-full text-sm sm:text-base"
                      aria-label={type === 'hotels' ? 'Sélectionner la date d\'arrivée' : 'Sélectionner la date de départ'}
                      aria-describedby={`${field.id}-label`}
                    />
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" aria-hidden="true">
                      {field.icon}
                    </span>
                  </div>
                  <div className="relative">
                    <DatePicker
                      selected={returnDate}
                      onChange={(date: Date | null) => setReturnDate(date)}
                      dateFormat="dd/MM/yyyy"
                      minDate={departureDate || new Date()}
                      placeholderText={type === 'hotels' ? 'Départ' : 'Retour'}
                      className="input-field pl-10 w-full text-sm sm:text-base"
                      aria-label={type === 'hotels' ? 'Sélectionner la date de départ' : 'Sélectionner la date de retour'}
                      aria-describedby={`${field.id}-label`}
                    />
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" aria-hidden="true">
                      {field.icon}
                    </span>
                  </div>
                </div>
              </div>
            );
          }

          if (field.id === 'passengers' || field.id === 'rooms' || field.id === 'travelers') {
            return (
              <div key={field.id} className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2" id={`${field.id}-label`}>
                  {field.label}
                </label>
                <div className="relative">
                  <button
                    type="button"
                    className="input-field pl-10 pr-10 w-full text-left text-sm sm:text-base flex items-center justify-between"
                    onClick={() => setShowPassengersDropdown(!showPassengersDropdown)}
                    aria-label="Sélectionner le nombre de voyageurs"
                    aria-expanded={showPassengersDropdown}
                    aria-haspopup="true"
                    aria-describedby={`${field.id}-label`}
                  >
                    <span>{totalPassengers} voyageur{totalPassengers > 1 ? 's' : ''}</span>
                    <ChevronDown size={16} className={`transition-transform ${showPassengersDropdown ? 'rotate-180' : ''}`} aria-hidden="true" />
                  </button>
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {field.icon}
                  </span>
                  
                  {showPassengersDropdown && (
                    <div 
                      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 p-4 z-50 animate-in slide-in-from-top-2 duration-200"
                      role="dialog"
                      aria-label="Sélection du nombre de voyageurs"
                    >
                      <PassengerSelector
                        type="adults"
                        label="Adultes"
                        subtitle="18 ans et plus"
                        value={passengers.adults}
                        onChange={handlePassengerChange}
                        min={1}
                      />
                      <PassengerSelector
                        type="children"
                        label="Enfants"
                        subtitle="2-17 ans"
                        value={passengers.children}
                        onChange={handlePassengerChange}
                      />
                      {type === 'flights' && (
                        <PassengerSelector
                          type="infants"
                          label="Bébés"
                          subtitle="0-2 ans"
                          value={passengers.infants}
                          onChange={handlePassengerChange}
                        />
                      )}
                      <div className="pt-3 border-t border-gray-200 mt-3">
                        <button
                          type="button"
                          onClick={() => setShowPassengersDropdown(false)}
                          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                          aria-label="Confirmer la sélection des voyageurs"
                        >
                          Confirmer
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          }

          return (
            <div key={field.id} className="relative">
              <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-2">
                {field.label}
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {field.icon}
                </span>
                <input
                  type={field.type}
                  id={field.id}
                  name={field.id}
                  className="input-field pl-10 w-full text-sm sm:text-base"
                  placeholder={field.placeholder}
                  required
                  aria-describedby={error ? `${field.id}-error` : undefined}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Options avancées */}
      <div className="flex flex-wrap items-center gap-4 pt-2">
        <label className="flex items-center cursor-pointer">
          <input 
            type="checkbox"
            checked={flexibleDates}
            onChange={(e) => setFlexibleDates(e.target.checked)}
<<<<<<< HEAD:src/components/SearchForm.tsx
            className="mr-2"
          />
          <span className="text-sm text-gray-600">Dates flexibles</span>
        </label>
      </div>

=======
            className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" 
            id="flexible-dates"
            aria-describedby="flexible-dates-description"
          />
          <span className="ml-2 text-sm text-gray-700" id="flexible-dates-description">Dates flexibles (±3 jours)</span>
        </label>
        
        <label className="flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" 
            id="direct-flights"
            aria-describedby="direct-flights-description"
          />
          <span className="ml-2 text-sm text-gray-700" id="direct-flights-description">Vol direct uniquement</span>
        </label>
      </div>

      {error && (
        <div 
          className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm animate-in slide-in-from-top-2 duration-200"
          role="alert"
          aria-live="polite"
          id="search-error"
        >
          <span className="w-2 h-2 bg-red-500 rounded-full mr-2 inline-block" aria-hidden="true"></span>
          {error}
        </div>
      )}

>>>>>>> 5262ff2 (description):src/components/search/SearchForm.tsx
      <div className="flex justify-center pt-4">
        <Button
          type="submit"
<<<<<<< HEAD:src/components/SearchForm.tsx
          loading={loading}
          size="lg"
          fullWidth={false}
          icon={!loading ? buttonIcon : undefined}
        >
          {loading ? 'Recherche en cours...' : buttonText}
        </Button>
=======
          disabled={loading}
          className={`btn-primary w-full sm:w-auto px-8 py-4 text-lg font-semibold flex items-center justify-center min-w-[200px] ${
            loading ? 'opacity-75 cursor-not-allowed' : ''
          }`}
          aria-label={loading ? 'Recherche en cours...' : buttonText}
          aria-describedby={error ? 'search-error' : undefined}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 animate-spin" size={20} aria-hidden="true" />
              <span>Recherche en cours...</span>
            </>
          ) : (
            <>
              <span aria-hidden="true">{buttonIcon}</span>
              <span className="ml-2">{buttonText}</span>
            </>
          )}
        </button>
>>>>>>> 5262ff2 (description):src/components/search/SearchForm.tsx
      </div>
    </form>
  );
};

interface PassengerSelectorProps {
  type: 'adults' | 'children' | 'infants';
  label: string;
  subtitle: string;
  value: number;
  onChange: (type: 'adults' | 'children' | 'infants', operation: 'add' | 'subtract') => void;
  min?: number;
}

const PassengerSelector: React.FC<PassengerSelectorProps> = ({ 
  type, label, subtitle, value, onChange, min = 0 
}) => {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <span className="text-sm font-medium text-gray-900">{label}</span>
        <div className="text-xs text-gray-500">{subtitle}</div>
      </div>
      <div className="flex items-center space-x-3">
        <button
          type="button"
          onClick={() => onChange(type, 'subtract')}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={value <= min}
          aria-label={`Diminuer le nombre de ${label.toLowerCase()}`}
        >
          <Minus size={14} aria-hidden="true" />
        </button>
        <span className="w-8 text-center font-medium" aria-label={`${value} ${label.toLowerCase()}`}>{value}</span>
        <button
          type="button"
          onClick={() => onChange(type, 'add')}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={`Augmenter le nombre de ${label.toLowerCase()}`}
        >
          <Plus size={14} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default SearchForm;