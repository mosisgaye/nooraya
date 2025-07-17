"use client";

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Plane, Hotel, Car, ArrowUpDown, MapPin, Users, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const airports = [
  // Europe
  { code: "CDG", name: "Charles de Gaulle", city: "Paris", country: "France" },
  { code: "LHR", name: "Heathrow", city: "Londres", country: "Royaume-Uni" },
  { code: "FCO", name: "Fiumicino", city: "Rome", country: "Italie" },
  { code: "MAD", name: "Barajas", city: "Madrid", country: "Espagne" },
  { code: "AMS", name: "Schiphol", city: "Amsterdam", country: "Pays-Bas" },
  { code: "FRA", name: "Frankfurt am Main", city: "Francfort", country: "Allemagne" },
  { code: "ZUR", name: "Zurich", city: "Zurich", country: "Suisse" },
  { code: "VIE", name: "Vienna International", city: "Vienne", country: "Autriche" },
  
  // Amérique du Nord
  { code: "JFK", name: "John F. Kennedy", city: "New York", country: "États-Unis" },
  { code: "LAX", name: "Los Angeles International", city: "Los Angeles", country: "États-Unis" },
  { code: "ORD", name: "O'Hare International", city: "Chicago", country: "États-Unis" },
  { code: "YYZ", name: "Pearson International", city: "Toronto", country: "Canada" },
  { code: "YUL", name: "Montréal-Trudeau", city: "Montréal", country: "Canada" },
  
  // Asie
  { code: "NRT", name: "Narita International", city: "Tokyo", country: "Japon" },
  { code: "ICN", name: "Incheon International", city: "Séoul", country: "Corée du Sud" },
  { code: "SIN", name: "Changi", city: "Singapour", country: "Singapour" },
  { code: "HKG", name: "Hong Kong International", city: "Hong Kong", country: "Hong Kong" },
  { code: "BKK", name: "Suvarnabhumi", city: "Bangkok", country: "Thaïlande" },
  { code: "DXB", name: "Dubai International", city: "Dubaï", country: "Émirats Arabes Unis" },
  
  // Afrique
  { code: "CMN", name: "Mohammed V", city: "Casablanca", country: "Maroc" },
  { code: "CAI", name: "Cairo International", city: "Le Caire", country: "Égypte" },
  { code: "JNB", name: "OR Tambo International", city: "Johannesburg", country: "Afrique du Sud" },
  { code: "LOS", name: "Murtala Muhammed", city: "Lagos", country: "Nigeria" },
  
  // Océanie
  { code: "SYD", name: "Kingsford Smith", city: "Sydney", country: "Australie" },
  { code: "MEL", name: "Melbourne", city: "Melbourne", country: "Australie" },
  { code: "AKL", name: "Auckland", city: "Auckland", country: "Nouvelle-Zélande" },
  
  // Amérique du Sud
  { code: "GRU", name: "Guarulhos", city: "São Paulo", country: "Brésil" },
  { code: "EZE", name: "Ezeiza International", city: "Buenos Aires", country: "Argentine" },
  { code: "BOG", name: "El Dorado", city: "Bogotá", country: "Colombie" },
];

export default function Home() {
  const router = useRouter();
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

  const tabs = [
    { id: "flights", label: "Vols", icon: Plane },
    { id: "hotels", label: "Hôtels", icon: Hotel },
    { id: "cars", label: "Location de voiture", icon: Car },
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
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-3 text-sm font-semibold rounded-xl shadow-lg flex items-center justify-center space-x-2 transition-all duration-200 hover:shadow-xl h-16"
                onClick={() => {
                  // Validation
                  if (!fromValue || !toValue || !departureDate) {
                    alert('Veuillez remplir tous les champs obligatoires');
                    return;
                  }

                  if (tripType === 'round-trip' && !returnDate) {
                    alert('Veuillez sélectionner une date de retour');
                    return;
                  }

                  // Extraire les codes d'aéroport
                  const fromCode = fromValue.match(/\(([^)]+)\)/)?.[1] || '';
                  const toCode = toValue.match(/\(([^)]+)\)/)?.[1] || '';

                  // Construire l'URL avec les paramètres de recherche
                  const searchParams = new URLSearchParams({
                    from: fromCode,
                    to: toCode,
                    departureDate: departureDate ? format(departureDate, 'yyyy-MM-dd') : '',
                    ...(tripType === 'round-trip' && returnDate ? { returnDate: format(returnDate, 'yyyy-MM-dd') } : {}),
                    adults: passengers.adults.toString(),
                    children: passengers.children.toString(),
                    infants: passengers.infants.toString(),
                    cabinClass: passengers.class,
                    tripType: tripType,
                    ...(nearbyAirports ? { nearbyAirports: 'true' } : {}),
                    ...(directFlights ? { directFlights: 'true' } : {})
                  });

                  // Rediriger vers la page de résultats
                  router.push(`/flight-results?${searchParams.toString()}`);
                }}
              >
                <Plane className="w-4 h-4" />
                <span>Rechercher</span>
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

        </div>
      </div>
    </div>
  );
}