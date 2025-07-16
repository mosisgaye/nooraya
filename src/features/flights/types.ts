export interface Flight {
  id: string;
  airline: string;
  logo: string;
  departure: FlightPoint;
  arrival: FlightPoint;
  duration: string;
  stops: number;
  stopDetails?: StopDetail[];
  price: number;
  currency: string;
  cabinClass: CabinClass;
  amenities: string[];
  baggage: BaggageInfo;
  availability: number;
  carrier: string;
  flightNumber: string;
}

export interface FlightPoint {
  time: string;
  airport: string;
  code: string;
  city: string;
  terminal?: string;
}

export interface StopDetail {
  airport: string;
  city: string;
  duration: string;
}

export interface BaggageInfo {
  cabin: string;
  checked: string;
}

export type CabinClass = 'economy' | 'premium' | 'business' | 'first';
export type TripType = 'one-way' | 'round-trip' | 'multi-city';

export interface FlightSearchParams {
  from: string;
  to: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  children: number;
  infants?: number;
  cabinClass: CabinClass;
  tripType: TripType;
  flexible?: boolean;
}

export interface FlightFilters {
  priceRange: [number, number];
  stops?: number[];
  airlines?: string[];
  departureTime?: string[];
  arrivalTime?: string[];
  duration?: [number, number];
  airports?: string[];
}

export interface FlightSearchResult {
  flights: Flight[];
  totalCount: number;
  filters: {
    airlines: string[];
    airports: string[];
    priceRange: [number, number];
  };
}