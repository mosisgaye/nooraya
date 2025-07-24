'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Plane, Clock, Calendar } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface FlightFiltersAdvancedProps {
  filters: Record<string, unknown>;
  onFilterChange: (filters: Record<string, unknown>) => void;
  availableAirlines: Array<{ code: string; name: string; count: number }>;
}

const AIRLINE_ALLIANCES = {
  'Star Alliance': ['LH', 'UA', 'AC', 'SQ', 'NH', 'OS', 'LX', 'TG', 'TP', 'SN', 'MS', 'ET', 'SA', 'CM', 'CA'],
  'OneWorld': ['AA', 'BA', 'CX', 'QF', 'IB', 'JL', 'LA', 'MH', 'QR', 'RJ', 'S7', 'UL'],
  'SkyTeam': ['DL', 'AF', 'KL', 'AM', 'KE', 'CZ', 'OK', 'SV', 'RO', 'CI', 'MU', 'VN']
};

const TIME_PERIODS = {
  morning: { label: 'Matin', range: '06:00 - 12:00', icon: '🌅' },
  afternoon: { label: 'Après-midi', range: '12:00 - 18:00', icon: '☀️' },
  evening: { label: 'Soir', range: '18:00 - 00:00', icon: '🌆' },
  night: { label: 'Nuit', range: '00:00 - 06:00', icon: '🌙' }
};

const AIRCRAFT_TYPES = [
  { id: 'wide-body', label: 'Gros porteur', models: ['A380', 'B747', 'A350', 'B777', 'B787'] },
  { id: 'narrow-body', label: 'Moyen courrier', models: ['A320', 'B737', 'A321'] },
  { id: 'regional', label: 'Régional', models: ['ERJ', 'CRJ', 'ATR'] }
];

export default function FlightFiltersAdvanced({
  filters,
  onFilterChange,
  availableAirlines
}: FlightFiltersAdvancedProps) {
  const [expandedSections, setExpandedSections] = useState({
    airlines: true,
    practical: true,
    temporal: false,
    aircraft: false
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFilterUpdate = (key: string, value: unknown) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  // Compter les filtres actifs
  const activeFiltersCount = Object.entries(filters).reduce((count, [, value]) => {
    if (Array.isArray(value) && value.length > 0) return count + 1;
    if (value !== undefined && value !== null && value !== -1) return count + 1;
    return count;
  }, 0);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-gray-900">Affiner la recherche</h2>
          {activeFiltersCount > 0 && (
            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
              {activeFiltersCount} actif{activeFiltersCount > 1 ? 's' : ''}
            </span>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <button 
            onClick={() => onFilterChange({})}
            className="text-sm text-gray-500 hover:text-emerald-600 transition-colors"
          >
            Réinitialiser tous les filtres
          </button>
        )}
      </div>

      <div className="divide-y">
        {/* Airlines & Alliances Section */}
        <div className="">
          <button
            onClick={() => toggleSection('airlines')}
            className="w-full flex items-center justify-between text-left hover:bg-gray-50 p-6 transition-colors group"
          >
            <h3 className="font-semibold text-gray-900 flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                <Plane className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <div className="font-semibold">Compagnies aériennes</div>
                <div className="text-sm text-gray-500 font-normal">{availableAirlines.length} disponibles</div>
              </div>
            </h3>
            {expandedSections.airlines ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
          </button>
          
          {expandedSections.airlines && (
            <div className="px-6 pb-6 space-y-6">
              {/* Airline Alliances */}
              <div>
                <Label className="text-sm font-semibold text-gray-700 mb-3 block">Alliances</Label>
                <div className="grid grid-cols-1 gap-3">
                  {Object.entries(AIRLINE_ALLIANCES).map(([alliance]) => {
                    const isChecked = (filters.alliances as string[] | undefined)?.includes(alliance) || false;
                    return (
                      <label
                        key={alliance}
                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                          isChecked 
                            ? 'border-emerald-500 bg-emerald-50' 
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <Checkbox
                          id={alliance}
                          checked={isChecked}
                          onCheckedChange={(checked) => {
                            const newAlliances = checked
                              ? [...((filters.alliances as string[]) || []), alliance]
                              : ((filters.alliances as string[]) || []).filter((a: string) => a !== alliance);
                            handleFilterUpdate('alliances', newAlliances);
                          }}
                          className="data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                        />
                        <span className={`text-sm font-medium ${isChecked ? 'text-emerald-700' : 'text-gray-700'}`}>
                          {alliance}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Individual Airlines */}
              <div>
                <Label className="text-sm font-semibold text-gray-700 mb-3 block">Compagnies individuelles</Label>
                <div className="max-h-60 overflow-y-auto space-y-2 pr-2">
                  {availableAirlines.map(airline => {
                    const isChecked = (filters.airlines as string[] | undefined)?.includes(airline.code) || false;
                    return (
                      <label
                        key={airline.code}
                        className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                          isChecked 
                            ? 'border-emerald-500 bg-emerald-50' 
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Checkbox
                            id={airline.code}
                            checked={isChecked}
                            onCheckedChange={(checked) => {
                              const newAirlines = checked
                                ? [...((filters.airlines as string[]) || []), airline.code]
                                : ((filters.airlines as string[]) || []).filter((a: string) => a !== airline.code);
                              handleFilterUpdate('airlines', newAirlines);
                            }}
                            className="data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                          />
                          <span className={`text-sm font-medium ${isChecked ? 'text-emerald-700' : 'text-gray-700'}`}>
                            {airline.name}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          {airline.count}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Practical Filters Section */}
        <div className="">
          <button
            onClick={() => toggleSection('practical')}
            className="w-full flex items-center justify-between text-left hover:bg-gray-50 p-6 transition-colors group"
          >
            <h3 className="font-semibold text-gray-900 flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="font-semibold">Options pratiques</div>
                <div className="text-sm text-gray-500 font-normal">Durée, escales, temps d&apos;attente</div>
              </div>
            </h3>
            {expandedSections.practical ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
          </button>
          
          {expandedSections.practical && (
            <div className="px-6 pb-6 space-y-6">
              {/* Flight Duration */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-sm font-semibold text-gray-700">Durée maximale du vol</Label>
                  <span className="text-sm font-medium text-emerald-600">
                    {(filters.maxDuration as number) || 24} heures
                  </span>
                </div>
                <Slider
                  value={[(filters.maxDuration as number) || 24]}
                  onValueChange={([value]) => handleFilterUpdate('maxDuration', value)}
                  max={24}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>1h</span>
                  <span>12h</span>
                  <span>24h</span>
                </div>
              </div>

              {/* Number of Stops */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Nombre d&apos;escales</Label>
                <div className="space-y-2">
                  {[
                    { value: 0, label: 'Vol direct' },
                    { value: 1, label: '1 escale maximum' },
                    { value: 2, label: '2 escales maximum' },
                    { value: -1, label: 'Peu importe' }
                  ].map(option => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`stops-${option.value}`}
                        checked={(filters.maxStops as number) === option.value}
                        onCheckedChange={(checked) => {
                          handleFilterUpdate('maxStops', checked ? option.value : -1);
                        }}
                      />
                      <Label htmlFor={`stops-${option.value}`} className="text-sm cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Layover Duration */}
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Temps d&apos;escale: {(filters.minLayover as number) || 30}min - {(filters.maxLayover as number) || 360}min
                </Label>
                <div className="space-y-2">
                  <Slider
                    value={[(filters.minLayover as number) || 30, (filters.maxLayover as number) || 360]}
                    onValueChange={([min, max]) => {
                      handleFilterUpdate('minLayover', min);
                      handleFilterUpdate('maxLayover', max);
                    }}
                    max={720}
                    min={30}
                    step={15}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Temporal Filters Section */}
        <div className="p-4 sm:p-6">
          <button
            onClick={() => toggleSection('temporal')}
            className="w-full flex items-center justify-between text-left hover:bg-gray-50 -m-4 sm:-m-6 p-4 sm:p-6 rounded-lg transition-colors"
          >
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
              Horaires & Jours
            </h3>
            {expandedSections.temporal ? <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" /> : <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />}
          </button>
          
          {expandedSections.temporal && (
            <div className="mt-4 space-y-4">
              {/* Departure Time */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Heure de départ</Label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(TIME_PERIODS).map(([key, period]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Checkbox
                        id={`depart-${key}`}
                        checked={(filters.departureTime as string[] | undefined)?.includes(key) || false}
                        onCheckedChange={(checked) => {
                          const newTimes = checked
                            ? [...((filters.departureTime as string[]) || []), key]
                            : ((filters.departureTime as string[]) || []).filter((t: string) => t !== key);
                          handleFilterUpdate('departureTime', newTimes);
                        }}
                      />
                      <Label htmlFor={`depart-${key}`} className="text-sm cursor-pointer">
                        <span className="mr-1">{period.icon}</span>
                        {period.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrival Time */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Heure d&apos;arrivée</Label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(TIME_PERIODS).map(([key, period]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Checkbox
                        id={`arrival-${key}`}
                        checked={(filters.arrivalTime as string[] | undefined)?.includes(key) || false}
                        onCheckedChange={(checked) => {
                          const newTimes = checked
                            ? [...((filters.arrivalTime as string[]) || []), key]
                            : ((filters.arrivalTime as string[]) || []).filter((t: string) => t !== key);
                          handleFilterUpdate('arrivalTime', newTimes);
                        }}
                      />
                      <Label htmlFor={`arrival-${key}`} className="text-sm cursor-pointer">
                        <span className="mr-1">{period.icon}</span>
                        {period.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Aircraft Types Section */}
        <div className="p-4 sm:p-6">
          <button
            onClick={() => toggleSection('aircraft')}
            className="w-full flex items-center justify-between text-left hover:bg-gray-50 -m-4 sm:-m-6 p-4 sm:p-6 rounded-lg transition-colors"
          >
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Type d&apos;avion
            </h3>
            {expandedSections.aircraft ? <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" /> : <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />}
          </button>
          
          {expandedSections.aircraft && (
            <div className="mt-4 space-y-2">
              {AIRCRAFT_TYPES.map(type => (
                <div key={type.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={type.id}
                    checked={(filters.aircraftTypes as string[] | undefined)?.includes(type.id) || false}
                    onCheckedChange={(checked) => {
                      const newTypes = checked
                        ? [...((filters.aircraftTypes as string[]) || []), type.id]
                        : ((filters.aircraftTypes as string[]) || []).filter((t: string) => t !== type.id);
                      handleFilterUpdate('aircraftTypes', newTypes);
                    }}
                  />
                  <Label htmlFor={type.id} className="text-sm cursor-pointer">
                    {type.label}
                    <span className="text-xs text-gray-500 ml-1">
                      ({type.models.join(', ')})
                    </span>
                  </Label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Reset Filters Button */}
      <div className="p-4 sm:p-6 border-t bg-gray-50">
        <button
          onClick={() => onFilterChange({})}
          className="w-full py-2.5 text-xs sm:text-sm text-emerald-600 hover:text-emerald-700 font-medium bg-white rounded-lg border border-emerald-200 hover:border-emerald-300 transition-colors"
        >
          Réinitialiser tous les filtres
        </button>
      </div>
    </div>
  );
}