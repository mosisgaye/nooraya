import { NextResponse } from 'next/server';
import { ApiResponse, ApiError, PaginationMeta } from '../types';

export function createApiResponse<T>(
  data: T,
  meta?: PaginationMeta
): NextResponse<ApiResponse<T>> {
  return NextResponse.json({
    success: true,
    data,
    meta,
  });
}

export function createErrorResponse(
  error: ApiError,
  status: number = 500
): NextResponse<ApiResponse<null>> {
  return NextResponse.json(
    {
      success: false,
      data: null,
      error: error.message,
    },
    { status }
  );
}

export function generateBookingId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function simulateDelay(ms: number = 1000): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function parseSearchParams(searchParams: URLSearchParams) {
  const params: Record<string, string> = {};
  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }
  return params;
}

export function createPaginationMeta(
  page: number,
  totalCount: number,
  perPage: number = 10
): PaginationMeta {
  return {
    page,
    totalPages: Math.ceil(totalCount / perPage),
    totalCount,
    perPage,
  };
}