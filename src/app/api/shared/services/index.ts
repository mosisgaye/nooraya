import { BookingBase } from '../types';
import { generateBookingId } from '../utils';

export abstract class BaseBookingService {
  protected createBooking(bookingData: Record<string, unknown>): BookingBase {
    const now = new Date().toISOString();
    return {
      id: generateBookingId(),
      status: 'pending',
      createdAt: now,
      updatedAt: now,
      ...bookingData,
    };
  }
}

export abstract class BaseSearchService {
  protected filterResults<T>(
    items: T[],
    filters: Record<string, unknown>
  ): T[] {
    return items.filter(item => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        return this.matchesFilter(item, key, value);
      });
    });
  }

  protected abstract matchesFilter(item: unknown, key: string, value: unknown): boolean;

  protected paginateResults<T>(
    items: T[],
    page: number = 1,
    perPage: number = 10
  ): T[] {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    return items.slice(start, end);
  }
}

export class LoggingService {
  static log(message: string, data?: unknown) {
    console.log(`[API] ${message}`, data || '');
  }

  static error(message: string, error?: unknown) {
    console.error(`[API ERROR] ${message}`, error || '');
  }
}