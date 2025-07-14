// Types pour les vols
export interface Flight {
  id: string;
  airline: string;
  logo: string;
  departure: {
    time: string;
    airport: string;
    code: string;
    city: string;
    terminal?: string;
  };
  arrival: {
    time: string;
    airport: string;
    code: string;
    city: string;
    terminal?: string;
  };
  duration: string;
  stops: number;
  stopDetails?: StopDetail[];
  price: number;
  currency: string;
  cabinClass: 'economy' | 'premium' | 'business' | 'first';
  amenities: string[];
  baggage: {
    cabin: string;
    checked: string;
  };
  availability: number;
  carrier: string;
  flightNumber: string;
}

export interface StopDetail {
  airport: string;
  city: string;
  duration: string;
}

// Types pour les hôtels
export interface Hotel {
  id: string;
  name: string;
  images: string[];
  mainImage: string;
  location: {
    address: string;
    city: string;
    country: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    district?: string;
  };
  stars: 1 | 2 | 3 | 4 | 5;
  rating: number;
  reviews: number;
  price: number;
  originalPrice?: number;
  currency: string;
  amenities: Amenity[];
  description: string;
  distance: string;
  roomTypes?: RoomType[];
  policies?: HotelPolicies;
}

export interface Amenity {
  id: string;
  name: string;
  icon?: string;
  category: 'basic' | 'comfort' | 'business' | 'leisure' | 'family';
}

export interface RoomType {
  id: string;
  name: string;
  price: number;
  capacity: number;
  size: number;
  amenities: string[];
  images: string[];
  availability: number;
}

export interface HotelPolicies {
  checkIn: string;
  checkOut: string;
  cancellation: string;
  children: string;
  pets: string;
  smoking: string;
}

// Types pour les packages
export interface Package {
  id: string;
  name: string;
  destination: string;
  country: string;
  images: string[];
  duration: {
    nights: number;
    days: number;
  };
  price: number;
  originalPrice?: number;
  currency: string;
  includes: PackageInclusion[];
  itinerary?: Itinerary[];
  hotel: {
    name: string;
    stars: number;
    roomType: string;
  };
  flight: {
    airline: string;
    class: string;
  };
  maxPersons: number;
  availability: number;
  tags: string[];
}

export interface PackageInclusion {
  type: 'flight' | 'hotel' | 'transfer' | 'meal' | 'activity' | 'insurance';
  description: string;
  included: boolean;
}

export interface Itinerary {
  day: number;
  title: string;
  description: string;
  activities: string[];
  meals: string[];
}

// Types pour les recherches
export interface SearchParams {
  from?: string;
  to?: string;
  departureDate?: string;
  returnDate?: string;
  checkIn?: string;
  checkOut?: string;
  adults: number;
  children: number;
  infants?: number;
  rooms?: number;
  cabinClass?: string;
  flexible?: boolean;
}

// Types pour les utilisateurs
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  preferences?: UserPreferences;
  savedPayments?: PaymentMethod[];
  bookings?: Booking[];
}

export interface UserPreferences {
  language: string;
  currency: string;
  newsletter: boolean;
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  seatingPreference?: 'window' | 'aisle' | 'middle';
  mealPreference?: string;
}

// Types pour les réservations
export interface Booking {
  id: string;
  type: 'flight' | 'hotel' | 'package';
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  bookingReference: string;
  createdAt: string;
  totalPrice: number;
  currency: string;
  passengers?: Passenger[];
  contact: ContactInfo;
  payment: PaymentInfo;
  items: BookingItem[];
}

export interface Passenger {
  id: string;
  type: 'adult' | 'child' | 'infant';
  title: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  passport?: {
    number: string;
    expiryDate: string;
    issuingCountry: string;
  };
}

export interface ContactInfo {
  email: string;
  phone: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export interface PaymentInfo {
  method: 'card' | 'paypal' | 'bank_transfer';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  amount: number;
  currency: string;
  transactionId?: string;
}

export interface BookingItem {
  type: 'flight' | 'hotel' | 'transfer' | 'insurance';
  details: Flight | Hotel | Package; // Peut être Flight, Hotel, etc.
  price: number;
}

// Types pour les paiements
export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'bank';
  isDefault: boolean;
  card?: {
    last4: string;
    brand: string;
    expiryMonth: number;
    expiryYear: number;
  };
}

// Types pour les filtres
export interface FilterOptions {
  priceRange: [number, number];
  stops?: number[];
  airlines?: string[];
  departureTime?: string[];
  arrivalTime?: string[];
  duration?: [number, number];
  airports?: string[];
  stars?: number[];
  rating?: number;
  amenities?: string[];
  propertyTypes?: string[];
  districts?: string[];
  guestRating?: number;
}

// Types pour les alertes de prix
export interface PriceAlert {
  id: string;
  type: 'flight' | 'hotel';
  route?: string;
  destination?: string;
  targetPrice: number;
  currentPrice: number;
  isActive: boolean;
  createdAt: string;
  expiresAt: string;
  notificationMethod: 'email' | 'sms' | 'both';
  userId: string;
}

// Types pour les offres spéciales
export interface SpecialOffer {
  id: string;
  type: 'flight' | 'hotel' | 'package';
  title: string;
  description: string;
  destination: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  validFrom: string;
  validTo: string;
  termsAndConditions: string[];
  stock?: number;
}

// Types pour l'API Response
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  meta?: {
    page: number;
    totalPages: number;
    totalCount: number;
    perPage: number;
  };
}

// Types utilitaires
export type SortOption = 'price' | 'duration' | 'departure' | 'rating' | 'stars';
export type TripType = 'one-way' | 'round-trip' | 'multi-city';
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

// Enum pour les devises supportées
export enum Currency {
  EUR = 'EUR',
  USD = 'USD',
  GBP = 'GBP',
  MAD = 'MAD',
  CHF = 'CHF',
  CAD = 'CAD'
}

// Enum pour les langues supportées
export enum Language {
  FR = 'fr',
  EN = 'en',
  ES = 'es',
  DE = 'de',
  AR = 'ar'
}