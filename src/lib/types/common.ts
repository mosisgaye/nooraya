export type SortOrder = 'asc' | 'desc';

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface SortParams {
  field: string;
  order: SortOrder;
}

// Renommé pour éviter les conflits
export interface DataSearchParams extends PaginationParams {
  query?: string;
  filters?: Record<string, unknown>;
  sort?: SortParams;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Address {
  street: string;
  city: string;
  state?: string;
  country: string;
  postalCode: string;
  coordinates?: Coordinates;
}

// Supprimé - utiliser ContactInfo de /types/common/index.ts

export interface Image {
  id: string;
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface Price {
  amount: number;
  currency: string;
  formatted?: string;
}

export interface DateRange {
  start: Date;
  end: Date;
}

export interface TimeSlot {
  start: string;
  end: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
  verified: boolean;
}

export interface Tag {
  id: string;
  name: string;
  color?: string;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}