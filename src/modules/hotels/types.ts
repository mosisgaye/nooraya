export interface Hotel {
  id: string;
  name: string;
  images: string[];
  mainImage: string;
  location: HotelLocation;
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

export interface HotelLocation {
  address: string;
  city: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  district?: string;
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

export interface HotelSearchParams {
  destination: string;
  checkIn: string;
  checkOut: string;
  rooms: number;
  adults: number;
  children: number;
}

export interface HotelFilters {
  priceRange: [number, number];
  stars?: number[];
  rating?: number;
  amenities?: string[];
  propertyTypes?: string[];
  districts?: string[];
  guestRating?: number;
}

export interface HotelSearchResult {
  hotels: Hotel[];
  totalCount: number;
  filters: {
    priceRange: [number, number];
    amenities: string[];
    districts: string[];
  };
}