"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Plane, MapPin, Users, ChevronDown, ArrowUpDown } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const airports = [
  { code: "CDG", name: "Charles de Gaulle", city: "Paris", country: "France" },
  { code: "LHR", name: "Heathrow", city: "Londres", country: "Royaume-Uni" },
  { code: "FCO", name: "Fiumicino", city: "Rome", country: "Italie" },
  { code: "MAD", name: "Barajas", city: "Madrid", country: "Espagne" },
  { code: "AMS", name: "Schiphol", city: "Amsterdam", country: "Pays-Bas" },
  { code: "CMN", name: "Mohammed V", city: "Casablanca", country: "Maroc" },
  { code: "DXB", name: "Dubai International", city: "Dubaï", country: "Émirats Arabes Unis" },
];

interface FlightOffer {
  id: string;
  totalAmount: string;
  totalCurrency: string;
  baseAmount: string;
  taxAmount: string;
  totalEmissionsKg?: number;
  slices?: FlightSlice[];
}

interface FlightSlice {
  id: string;
  segments?: FlightSegment[];
}

interface FlightSegment {
  id: string;
  origin?: { iata_code: string };
  destination?: { iata_code: string };
  departingAt?: string;
  arrivingAt?: string;
  duration?: string;
  marketingCarrier?: { name: string };
  marketingCarrierFlightNumber?: string;
}

interface SearchResultsData {
  requestId: string;
  offers: FlightOffer[];
  totalOffers: number;
}

interface SearchResults {
  success: boolean;
  data?: SearchResultsData;
}

export default function TestPage() {
  const [activeTab, setActiveTab] = useState("flights");
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [fromSearch, setFromSearch] = useState("");
  const [toSearch, setToSearch] = useState("");
  const [departureDate, setDepartureDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [tripType, setTripType] = useState("round-trip");
  const [passengers, setPassengers] = useState({ adults: 1, children: 0, infants: 0, class: "economy" });
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);
  const passengerRef = useRef<HTMLDivElement>(null);
  const [nearbyAirports, setNearbyAirports] = useState(false);
  const [directFlights, setDirectFlights] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tabs = [
    { id: "flights", label: "Vols", icon: Plane },
  ];

  const filterAirports = (searchTerm: string) => {
    if (!searchTerm) return airports;
    return airports.filter(airport => 
      airport.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      airport.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      airport.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      airport.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleAirportSelect = (airport: typeof airports[0], type: 'from' | 'to') => {
    if (type === 'from') {
      setFromValue(`${airport.city} (${airport.code})`);
      setFromSearch(`${airport.city} (${airport.code})`);
      setShowFromDropdown(false);
    } else {
      setToValue(`${airport.city} (${airport.code})`);
      setToSearch(`${airport.city} (${airport.code})`);
      setShowToDropdown(false);
    }
  };

  const updatePassengers = (type: 'adults' | 'children' | 'infants', action: 'increment' | 'decrement') => {
    setPassengers(prev => ({
      ...prev,
      [type]: action === 'increment' ? prev[type] + 1 : Math.max(0, prev[type] - 1)
    }));
  };

  const getPassengerText = () => {
    const total = passengers.adults + passengers.children + passengers.infants;
    const classText = passengers.class === 'economy' ? 'Économie' : 
                     passengers.class === 'business' ? 'Affaires' : 'Première';
    return `${total} ${total > 1 ? 'Voyageurs' : 'Voyageur'}, ${classText}`;
  };

  const swapAirports = () => {
    const tempValue = fromValue;
    const tempSearch = fromSearch;
    setFromValue(toValue);
    setFromSearch(toSearch);
    setToValue(tempValue);
    setToSearch(tempSearch);
  };

  const handleSearch = async () => {
    // Validation
    if (!fromValue || !toValue || !departureDate) {
      setError('Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (tripType === 'round-trip' && !returnDate) {
      setError('Veuillez sélectionner une date de retour');
      return;
    }

    // Extraire les codes d'aéroport
    const fromCode = fromValue.match(/\(([^)]+)\)/)?.[1] || '';
    const toCode = toValue.match(/\(([^)]+)\)/)?.[1] || '';

    if (!fromCode || !toCode) {
      setError('Veuillez sélectionner des aéroports valides');
      return;
    }

    setLoading(true);
    setError(null);
    setSearchResults(null);

    try {
      const searchData = {
        origin: fromCode,
        destination: toCode,
        departureDate: format(departureDate, 'yyyy-MM-dd'),
        ...(tripType === 'round-trip' && returnDate ? { returnDate: format(returnDate, 'yyyy-MM-dd') } : {}),
        adults: passengers.adults,
        children: passengers.children,
        infants: passengers.infants,
        cabinClass: passengers.class,
        tripType: tripType
      };

      console.log('Sending search request:', searchData);

      const response = await fetch('/api/flights/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Search results:', data);
      setSearchResults(data);
    } catch (error) {
      console.error('Search error:', error);
      setError(error instanceof Error ? error.message : 'Une erreur est survenue lors de la recherche');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (passengerRef.current && !passengerRef.current.contains(event.target as Node)) {
        setShowPassengerDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-[60vh] bg-gradient-to-br from-emerald-600 via-green-600 to-emerald-800">
      {/* Navigation */}
      <nav className="pt-6 pb-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-6xl">
            <div className="flex space-x-2 justify-start pl-6 sm:pl-7 md:pl-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-white text-gray-900 shadow-xl'
                        : 'text-white/90 hover:text-white hover:bg-white/20 backdrop-blur-sm'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Search Form */}
        <div className="p-6 sm:p-7 md:p-8 max-w-6xl">
          {/* Title */}
          <div className="text-left mb-6">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight tracking-tight">
              Explorez le monde avec <span className="text-emerald-400">élégance</span>
            </h1>
          </div>

          {/* Trip Type Selector */}
          <div className="mb-6">
            <Select value={tripType} onValueChange={setTripType}>
              <SelectTrigger className="w-48 bg-emerald-600 border-white border-2 h-10 text-sm font-medium text-white hover:bg-emerald-700 transition-all duration-200 focus:ring-2 focus:ring-white/30 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-lg shadow-lg bg-white">
                <SelectItem value="round-trip" className="text-sm py-2 hover:bg-emerald-50 text-gray-900">Aller-retour</SelectItem>
                <SelectItem value="one-way" className="text-sm py-2 hover:bg-emerald-50 text-gray-900">Aller simple</SelectItem>
                <SelectItem value="multi-city" className="text-sm py-2 hover:bg-emerald-50 text-gray-900">Multi-destinations</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Search Fields */}
          <div className="flex flex-col lg:flex-row lg:items-end gap-1 mb-4">
            {/* From Field */}
            <div className="relative flex-1 w-full lg:w-auto">
              <div className="relative">
                <Input
                  id="from"
                  value={fromSearch}
                  onChange={(e) => {
                    setFromSearch(e.target.value);
                    setFromValue(e.target.value);
                  }}
                  onFocus={() => setShowFromDropdown(true)}
                  onBlur={() => setTimeout(() => setShowFromDropdown(false), 200)}
                  placeholder="Départ&#10;Pays, ville"
                  className="pl-10 pr-4 h-16 text-sm border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 hover:border-gray-300 transition-all duration-200 bg-white shadow-sm"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center">
                  <MapPin className="w-4 h-4 text-gray-400" />
                </div>
                
                {showFromDropdown && (
                  <div 
                    role="listbox" 
                    aria-label="Sélectionnez un aéroport de départ"
                    className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] z-50 max-h-60 overflow-y-auto"
                  >
                    {filterAirports(fromSearch).map((airport) => (
                      <button
                        key={airport.code}
                        role="option"
                        aria-selected={false}
                        onClick={() => handleAirportSelect(airport, 'from')}
                        className="w-full text-left px-3 py-3 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-transparent border-b border-gray-100 last:border-b-0 transition-all duration-150 group"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="bg-emerald-100 p-2 rounded-lg">
                            <Plane className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors">
                              {airport.city} <span className="text-emerald-600">({airport.code})</span>
                            </div>
                            <div className="text-sm text-gray-600 group-hover:text-gray-700">{airport.name}, {airport.country}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Swap Button */}
            <div className="hidden lg:flex items-center justify-center px-1 mb-1">
              <button
                className="h-16 w-16 rounded-full bg-white border-2 border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center"
                onClick={swapAirports}
              >
                <ArrowUpDown className="w-4 h-4 text-gray-500 hover:text-emerald-600" />
              </button>
            </div>

            {/* To Field */}
            <div className="relative flex-1 w-full lg:w-auto">
              <div className="relative">
                <Input
                  id="to"
                  value={toSearch}
                  onChange={(e) => {
                    setToSearch(e.target.value);
                    setToValue(e.target.value);
                  }}
                  onFocus={() => setShowToDropdown(true)}
                  onBlur={() => setTimeout(() => setShowToDropdown(false), 200)}
                  placeholder="Destination&#10;Pays, ville"
                  className="pl-10 pr-4 h-16 text-sm border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 hover:border-gray-300 transition-all duration-200 bg-white shadow-sm"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center">
                  <MapPin className="w-4 h-4 text-gray-400" />
                </div>
                
                {showToDropdown && (
                  <div 
                    role="listbox" 
                    aria-label="Sélectionnez un aéroport de destination"
                    className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] z-50 max-h-60 overflow-y-auto"
                  >
                    {filterAirports(toSearch).map((airport) => (
                      <button
                        key={airport.code}
                        role="option"
                        aria-selected={false}
                        onClick={() => handleAirportSelect(airport, 'to')}
                        className="w-full text-left px-3 py-3 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-transparent border-b border-gray-100 last:border-b-0 transition-all duration-150 group"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="bg-emerald-100 p-2 rounded-lg">
                            <Plane className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors">
                              {airport.city} <span className="text-emerald-600">({airport.code})</span>
                            </div>
                            <div className="text-sm text-gray-600 group-hover:text-gray-700">{airport.name}, {airport.country}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Departure Date */}
            <div className="flex-1 w-full lg:w-auto">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full h-16 justify-start text-left font-normal text-sm border-2 border-gray-200 rounded-xl hover:border-gray-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200 bg-white shadow-sm flex-col items-start"
                  >
                    <div className="flex items-center w-full">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-gray-600">Départ</span>
                        <span className="text-sm">
                          {departureDate ? format(departureDate, "dd MMM yyyy", { locale: fr }) : "Choisir une date"}
                        </span>
                      </div>
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 rounded-lg shadow-xl border border-gray-200">
                  <Calendar
                    mode="single"
                    selected={departureDate}
                    onSelect={setDepartureDate}
                    initialFocus
                    className="rounded-lg"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Return Date */}
            {tripType === 'round-trip' && (
              <div className="flex-1 w-full lg:w-auto">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full h-16 justify-start text-left font-normal text-sm border-2 border-gray-200 rounded-xl hover:border-gray-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200 bg-white shadow-sm flex-col items-start"
                    >
                      <div className="flex items-center w-full">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        <div className="flex flex-col">
                          <span className="text-xs font-medium text-gray-600">Retour</span>
                          <span className="text-sm">
                            {returnDate ? format(returnDate, "dd MMM yyyy", { locale: fr }) : "Choisir une date"}
                          </span>
                        </div>
                      </div>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 rounded-lg shadow-xl border border-gray-200">
                    <Calendar
                      mode="single"
                      selected={returnDate}
                      onSelect={setReturnDate}
                      initialFocus
                      className="rounded-lg"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}

            {/* Passengers */}
            <div className="relative flex-1 w-full lg:w-auto" ref={passengerRef}>
              <button
                onClick={() => setShowPassengerDropdown(!showPassengerDropdown)}
                className="w-full h-16 px-3 text-left text-sm border-2 border-gray-200 rounded-xl hover:border-gray-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 bg-white shadow-sm flex items-center justify-between transition-all duration-200"
              >
                <div className="flex items-center space-x-2">
                  <div className="bg-emerald-100 p-1.5 rounded-md">
                    <Users className="w-3 h-3 text-emerald-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-gray-600">Voyageurs</span>
                    <span className="text-sm font-medium">{getPassengerText()}</span>
                  </div>
                </div>
                <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${showPassengerDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showPassengerDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] z-50 p-4">
                  <div className="space-y-4">
                    {/* Adults */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">Adultes</div>
                        <div className="text-sm text-gray-600">12 ans et plus</div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updatePassengers('adults', 'decrement')}
                          disabled={passengers.adults <= 1}
                          className="h-9 w-9 p-0 rounded-full border-2 border-gray-200 text-gray-600 hover:border-emerald-500 hover:text-emerald-600"
                        >
                          -
                        </Button>
                        <span className="w-8 text-center font-medium text-lg">{passengers.adults}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updatePassengers('adults', 'increment')}
                          className="h-9 w-9 p-0 rounded-full border-2 border-gray-200 text-gray-600 hover:border-emerald-500 hover:text-emerald-600"
                        >
                          +
                        </Button>
                      </div>
                    </div>

                    {/* Children */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">Enfants</div>
                        <div className="text-sm text-gray-600">2-11 ans</div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updatePassengers('children', 'decrement')}
                          disabled={passengers.children <= 0}
                          className="h-9 w-9 p-0 rounded-full border-2 border-gray-200 text-gray-600 hover:border-emerald-500 hover:text-emerald-600"
                        >
                          -
                        </Button>
                        <span className="w-8 text-center font-medium text-lg">{passengers.children}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updatePassengers('children', 'increment')}
                          className="h-9 w-9 p-0 rounded-full border-2 border-gray-200 text-gray-600 hover:border-emerald-500 hover:text-emerald-600"
                        >
                          +
                        </Button>
                      </div>
                    </div>

                    {/* Infants */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">Bébés</div>
                        <div className="text-sm text-gray-600">0-2 ans</div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updatePassengers('infants', 'decrement')}
                          disabled={passengers.infants <= 0}
                          className="h-9 w-9 p-0 rounded-full border-2 border-gray-200 text-gray-600 hover:border-emerald-500 hover:text-emerald-600"
                        >
                          -
                        </Button>
                        <span className="w-8 text-center font-medium text-lg">{passengers.infants}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updatePassengers('infants', 'increment')}
                          className="h-9 w-9 p-0 rounded-full border-2 border-gray-200 text-gray-600 hover:border-emerald-500 hover:text-emerald-600"
                        >
                          +
                        </Button>
                      </div>
                    </div>

                    {/* Class */}
                    <div className="pt-5 border-t border-gray-100">
                      <Label className="text-sm font-semibold text-gray-700 mb-3 block uppercase tracking-wider opacity-80">
                        Classe de voyage
                      </Label>
                      <div className="grid grid-cols-3 gap-3">
                        <button
                          onClick={() => setPassengers(prev => ({ ...prev, class: 'economy' }))}
                          className={`py-3 px-2 rounded-lg border-2 transition-all ${
                            passengers.class === 'economy' 
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-700 font-medium' 
                              : 'border-gray-200 hover:border-emerald-300'
                          }`}
                        >
                          Économie
                        </button>
                        <button
                          onClick={() => setPassengers(prev => ({ ...prev, class: 'business' }))}
                          className={`py-3 px-2 rounded-lg border-2 transition-all ${
                            passengers.class === 'business' 
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-700 font-medium' 
                              : 'border-gray-200 hover:border-emerald-300'
                          }`}
                        >
                          Affaires
                        </button>
                        <button
                          onClick={() => setPassengers(prev => ({ ...prev, class: 'first' }))}
                          className={`py-3 px-2 rounded-lg border-2 transition-all ${
                            passengers.class === 'first' 
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-700 font-medium' 
                              : 'border-gray-200 hover:border-emerald-300'
                          }`}
                        >
                          Première
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Search Button */}
            <div className="flex-shrink-0 lg:ml-2">
              <div className="mb-2 lg:mb-6"></div>
              <button 
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-3 text-sm font-semibold rounded-xl shadow-lg flex items-center justify-center space-x-2 transition-all duration-200 hover:shadow-xl h-16 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSearch}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Recherche...</span>
                  </>
                ) : (
                  <>
                    <Plane className="w-4 h-4" />
                    <span>Rechercher</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="flex flex-wrap gap-6 mb-4 px-1">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="nearby-airports-from" 
                checked={nearbyAirports}
                onCheckedChange={(checked) => setNearbyAirports(checked as boolean)}
                className="h-4 w-4 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600 border-white bg-white"
              />
              <Label htmlFor="nearby-airports-from" className="text-xs text-white cursor-pointer font-medium opacity-90">
                Inclure les aéroports à proximité
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="direct-flights" 
                checked={directFlights}
                onCheckedChange={(checked) => setDirectFlights(checked as boolean)}
                className="h-4 w-4 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600 border-white bg-white"
              />
              <Label htmlFor="direct-flights" className="text-xs text-white cursor-pointer font-medium opacity-90">
                Vols directs uniquement
              </Label>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl">
              <p className="text-sm">{error}</p>
            </div>
          )}

        </div>
      </div>

      {/* Results Section */}
      {searchResults && (
        <div className="bg-gradient-to-b from-gray-50 to-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            {/* Header avec statistiques */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-3 bg-white px-6 py-3 rounded-full shadow-lg border border-emerald-100">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                <h2 className="text-xl font-bold text-gray-900">
                  {searchResults.data?.totalOffers || 0} vols trouvés
                </h2>
              </div>
              <p className="text-gray-600 mt-3 text-sm">
                Meilleurs prix disponibles • Triés par pertinence
              </p>
            </div>

            {searchResults.data?.offers && searchResults.data.offers.length > 0 ? (
              <div className="grid gap-6 max-w-4xl mx-auto">
                {searchResults.data.offers.slice(0, 10).map((offer: FlightOffer) => (
                  <div key={offer.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-emerald-200 overflow-hidden">
                    {/* Header avec prix */}
                    <div className="bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-50 p-6 border-b border-emerald-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-baseline space-x-2">
                          <span className="text-3xl font-bold text-emerald-700">
                            {offer.totalAmount}
                          </span>
                          <span className="text-emerald-600 font-medium">
                            {offer.totalCurrency}
                          </span>
                          <span className="text-sm text-gray-500">
                            / personne
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-gray-500">
                            Base {offer.baseAmount} {offer.totalCurrency} + {offer.taxAmount} {offer.totalCurrency} taxes
                          </div>
                          {offer.totalEmissionsKg && (
                            <div className="flex items-center justify-end space-x-1 mt-1">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-xs text-gray-600">
                                {offer.totalEmissionsKg} kg CO₂
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Détails des vols */}
                    <div className="p-6 space-y-6">
                      {offer.slices?.map((slice: FlightSlice, sliceIndex: number) => (
                        <div key={slice.id} className="relative">
                          {/* Badge Aller/Retour */}
                          <div className="flex items-center mb-4">
                            <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              sliceIndex === 0 
                                ? 'bg-emerald-100 text-emerald-700' 
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              <Plane className={`w-3 h-3 mr-1 ${sliceIndex === 0 ? '' : 'rotate-180'}`} />
                              {sliceIndex === 0 ? 'Vol aller' : 'Vol retour'}
                            </div>
                          </div>

                          {/* Segments de vol */}
                          <div className="space-y-3">
                            {slice.segments?.map((segment: FlightSegment, segmentIndex: number) => (
                              <div key={segment.id} className="relative">
                                {/* Ligne de connexion */}
                                {segmentIndex > 0 && (
                                  <div className="flex items-center justify-center my-2">
                                    <div className="flex items-center space-x-2 text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                      <span>Escale</span>
                                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                    </div>
                                  </div>
                                )}

                                {/* Segment de vol */}
                                <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                                  <div className="flex items-center justify-between">
                                    {/* Départ */}
                                    <div className="text-center flex-1">
                                      <div className="text-2xl font-bold text-gray-900">
                                        {segment.departingAt ? new Date(segment.departingAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : 'N/A'}
                                      </div>
                                      <div className="text-lg font-semibold text-emerald-600 mt-1">
                                        {segment.origin?.iata_code || 'N/A'}
                                      </div>
                                      <div className="text-xs text-gray-500 mt-1">
                                        {segment.departingAt ? new Date(segment.departingAt).toLocaleDateString('fr-FR', { 
                                          day: 'numeric', 
                                          month: 'short' 
                                        }) : ''}
                                      </div>
                                    </div>

                                    {/* Trajet */}
                                    <div className="flex-1 px-4">
                                      <div className="flex items-center justify-center space-x-2">
                                        <div className="flex-1 border-t-2 border-dashed border-emerald-300"></div>
                                        <div className="bg-emerald-500 p-2 rounded-full shadow-md">
                                          <Plane className="w-4 h-4 text-white transform rotate-90" />
                                        </div>
                                        <div className="flex-1 border-t-2 border-dashed border-emerald-300"></div>
                                      </div>
                                      <div className="text-center mt-2">
                                        <div className="text-sm font-medium text-gray-700">
                                          {segment.marketingCarrier?.name || 'N/A'}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                          Vol {segment.marketingCarrierFlightNumber || 'N/A'}
                                        </div>
                                        <div className="text-xs text-emerald-600 font-medium mt-1">
                                          {segment.duration || 'N/A'}
                                        </div>
                                      </div>
                                    </div>

                                    {/* Arrivée */}
                                    <div className="text-center flex-1">
                                      <div className="text-2xl font-bold text-gray-900">
                                        {segment.arrivingAt ? new Date(segment.arrivingAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : 'N/A'}
                                      </div>
                                      <div className="text-lg font-semibold text-emerald-600 mt-1">
                                        {segment.destination?.iata_code || 'N/A'}
                                      </div>
                                      <div className="text-xs text-gray-500 mt-1">
                                        {segment.arrivingAt ? new Date(segment.arrivingAt).toLocaleDateString('fr-FR', { 
                                          day: 'numeric', 
                                          month: 'short' 
                                        }) : ''}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Footer avec action */}
                    <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500 font-mono">
                          ID: {offer.id.slice(-8)}
                        </div>
                        <Button className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-semibold">
                          <Plane className="w-4 h-4 mr-2" />
                          Sélectionner ce vol
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md mx-auto">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plane className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Aucun vol trouvé
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Essayez de modifier vos critères de recherche ou vos dates.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}