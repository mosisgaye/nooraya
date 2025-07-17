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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-800">
      {/* Navigation */}
      <nav className="pt-8 pb-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-8 py-3.5 rounded-full text-base font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-white text-gray-900 shadow-lg scale-105'
                      : 'text-white/80 hover:text-white hover:bg-white/10 backdrop-blur-sm'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Des millions de vols pas chers.
          </h1>
          <p className="text-xl md:text-2xl text-green-200 font-light">
            Une simple recherche.
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] p-6 sm:p-8 md:p-10 max-w-7xl mx-auto backdrop-blur-lg bg-white/95">
          {/* Trip Type Selector */}
          <div className="mb-8">
            <Select value={tripType} onValueChange={setTripType}>
              <SelectTrigger className="w-52 bg-gradient-to-r from-gray-50 to-gray-50/50 border-gray-200 h-12 text-base font-medium hover:bg-gray-100 transition-all duration-200 focus:ring-2 focus:ring-green-500/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="round-trip" className="text-base py-3">Aller-retour</SelectItem>
                <SelectItem value="one-way" className="text-base py-3">Aller simple</SelectItem>
                <SelectItem value="multi-city" className="text-base py-3">Multi-destinations</SelectItem>
              </SelectContent>
            </Select>
          </div>
          green
          {/* Search Fields */}
          <div className="flex flex-col lg:flex-row lg:items-end gap-4 mb-8">
            {/* From Field */}
            <div className="relative flex-1 w-full lg:w-auto">
              <Label htmlFor="from" className="text-sm font-semibold text-gray-700 mb-3 block uppercase tracking-wider opacity-80">
                De
              </Label>
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
                  placeholder="Pays, ville ou aéroport"
                  className="pl-12 pr-4 h-12 text-base border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-500/10 hover:border-gray-300 transition-all duration-200 bg-gray-50/50"
                />
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                
                {showFromDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] z-50 max-h-72 overflow-y-auto">
                    {filterAirports(fromSearch).map((airport) => (
                      <button
                        key={airport.code}
                        onClick={() => handleAirportSelect(airport, 'from')}
                        className="w-full text-left px-4 py-4 hover:bg-gradient-to-r hover:from-green-50 hover:to-transparent border-b border-gray-100 last:border-b-0 transition-all duration-150 group"
                      >
                        <div className="flex items-center space-x-3">
                          <Plane className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                          <div>
                            <div className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors">{airport.name} ({airport.code})</div>
                            <div className="text-sm text-gray-600 group-hover:text-gray-700">{airport.city}, {airport.country}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Swap Button */}
            <div className="hidden lg:flex items-center justify-center px-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-full bg-white border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all duration-200 mb-8 shadow-sm hover:shadow-md"
                onClick={swapAirports}
              >
                <ArrowUpDown className="w-4 h-4 text-gray-500" />
              </Button>
            </div>

            {/* To Field */}
            <div className="relative flex-1 w-full lg:w-auto">
              <Label htmlFor="to" className="text-sm font-semibold text-gray-700 mb-3 block uppercase tracking-wider opacity-80">
                Vers
              </Label>
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
                  placeholder="Pays, ville ou aéroport"
                  className="pl-12 pr-4 h-12 text-base border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-500/10 hover:border-gray-300 transition-all duration-200 bg-gray-50/50"
                />
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                
                {showToDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] z-50 max-h-72 overflow-y-auto">
                    {filterAirports(toSearch).map((airport) => (
                      <button
                        key={airport.code}
                        onClick={() => handleAirportSelect(airport, 'to')}
                        className="w-full text-left px-4 py-4 hover:bg-gradient-to-r hover:from-green-50 hover:to-transparent border-b border-gray-100 last:border-b-0 transition-all duration-150 group"
                      >
                        <div className="flex items-center space-x-3">
                          <Plane className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                          <div>
                            <div className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors">{airport.name} ({airport.code})</div>
                            <div className="text-sm text-gray-600 group-hover:text-gray-700">{airport.city}, {airport.country}</div>
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
              <Label className="text-sm font-semibold text-gray-700 mb-3 block uppercase tracking-wider opacity-80">
                Départ
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full h-12 justify-start text-left font-normal text-base border-2 border-gray-200 rounded-xl hover:border-gray-300 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all duration-200 bg-gray-50/50"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {departureDate ? format(departureDate, "dd MMM yyyy", { locale: fr }) : "Ajouter une date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={departureDate}
                    onSelect={setDepartureDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Return Date */}
            {tripType === 'round-trip' && (
              <div className="flex-1 w-full lg:w-auto">
                <Label className="text-sm font-semibold text-gray-700 mb-3 block uppercase tracking-wider opacity-80">
                  Retour
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full h-12 justify-start text-left font-normal text-base border-2 border-gray-200 rounded-xl hover:border-gray-300 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all duration-200 bg-gray-50/50"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {returnDate ? format(returnDate, "dd MMM yyyy", { locale: fr }) : "Ajouter une date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={returnDate}
                      onSelect={setReturnDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}

            {/* Passengers */}
            <div className="relative flex-1 w-full lg:w-auto" ref={passengerRef}>
              <Label className="text-sm font-semibold text-gray-700 mb-3 block uppercase tracking-wider opacity-80">
                Voyageurs et classe
              </Label>
              <button
                onClick={() => setShowPassengerDropdown(!showPassengerDropdown)}
                className="w-full h-12 px-4 text-left text-base border-2 border-gray-200 rounded-xl hover:border-gray-300 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 bg-gray-50/50 flex items-center justify-between transition-all duration-200"
              >
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-base">{getPassengerText()}</span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {showPassengerDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] z-50 p-6">
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
                          className="h-8 w-8 p-0"
                        >
                          -
                        </Button>
                        <span className="w-8 text-center font-medium">{passengers.adults}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updatePassengers('adults', 'increment')}
                          className="h-8 w-8 p-0"
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
                          className="h-8 w-8 p-0"
                        >
                          -
                        </Button>
                        <span className="w-8 text-center font-medium">{passengers.children}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updatePassengers('children', 'increment')}
                          className="h-8 w-8 p-0"
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
                          className="h-8 w-8 p-0"
                        >
                          -
                        </Button>
                        <span className="w-8 text-center font-medium">{passengers.infants}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updatePassengers('infants', 'increment')}
                          className="h-8 w-8 p-0"
                        >
                          +
                        </Button>
                      </div>
                    </div>

                    {/* Class */}
                    <div className="pt-4 border-t">
                      <Label className="text-sm font-semibold text-gray-700 mb-3 block uppercase tracking-wider opacity-80">
                        Classe de voyage
                      </Label>
                      <Select value={passengers.class} onValueChange={(value) => setPassengers(prev => ({ ...prev, class: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="economy">Économie</SelectItem>
                          <SelectItem value="business">Affaires</SelectItem>
                          <SelectItem value="first">Première</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Checkboxes */}
          <div className="flex flex-wrap gap-8 mb-10 px-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="nearby-airports-from" 
                checked={nearbyAirports}
                onCheckedChange={(checked) => setNearbyAirports(checked as boolean)}
              />
              <Label htmlFor="nearby-airports-from" className="text-sm text-gray-700 cursor-pointer">
                Ajouter des aéroports à proximité
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="direct-flights" 
                checked={directFlights}
                onCheckedChange={(checked) => setDirectFlights(checked as boolean)}
              />
              <Label htmlFor="direct-flights" className="text-sm text-gray-700 cursor-pointer">
                Vols directs uniquement
              </Label>
            </div>
          </div>

          {/* Search Button */}
          <div className="flex justify-end">
            <Button 
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-12 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
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
              Rechercher
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}