// Types communs unifiés
export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Location extends Coordinates {
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
}

export interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address?: Location;
  emergencyContact?: EmergencyContact;
}

// Types de recherche séparés par domaine
export interface TravelSearchParams {
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

export interface DataSearchParams {
  page: number;
  limit: number;
  query?: string;
  filters?: Record<string, unknown>;
  sort?: {
    field: string;
    order: 'asc' | 'desc';
  };
}

// Types d'état pour les hooks
export interface AsyncState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

export interface PaginatedData<T> {
  items: T[];
  totalCount: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
}

// Types utilitaires
export type SortOrder = 'asc' | 'desc';
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';