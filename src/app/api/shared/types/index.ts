export interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: PaginationMeta;
  error?: string;
}

export interface PaginationMeta {
  page: number;
  totalPages: number;
  totalCount: number;
  perPage: number;
}

export interface ApiError {
  message: string;
  code: string;
  details?: unknown;
}

export interface BookingBase {
  id: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}