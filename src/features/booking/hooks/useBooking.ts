'use client';

import { useState, useCallback } from 'react';
import { Booking, BookingRequest } from '../types';
import { bookingService } from '../services/bookingService';
import { useAsyncOperation } from '@/hooks/useAsyncOperation';

export const useBooking = () => {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const { isLoading, error, execute } = useAsyncOperation<Booking>();
  const { execute: executeMultiple } = useAsyncOperation<Booking[]>();

  const createBooking = useCallback(async (request: BookingRequest) => {
    const result = await execute(async () => {
      return await bookingService.createBooking(request);
    });

    if (result) {
      setBooking(result);
    }
    return result;
  }, [execute]);

  const getBooking = useCallback(async (bookingId: string) => {
    const result = await execute(async () => {
      return await bookingService.getBooking(bookingId);
    });

    if (result) {
      setBooking(result);
    }
    return result;
  }, [execute]);

  const getUserBookings = useCallback(async () => {
    const result = await executeMultiple(async () => {
      return await bookingService.getUserBookings();
    });

    if (result) {
      setBookings(result);
    }
    return result;
  }, [executeMultiple]);

  const cancelBooking = useCallback(async (bookingId: string, reason?: string) => {
    const result = await execute(async () => {
      return await bookingService.cancelBooking(bookingId, reason);
    });

    if (result) {
      // Mettre à jour l'état local
      if (booking && booking.id === bookingId) {
        setBooking(result);
      }
      
      setBookings(prev => 
        prev.map(b => b.id === bookingId ? result : b)
      );
    }
    return result;
  }, [execute, booking]);

  const downloadInvoice = useCallback(async (bookingId: string) => {
    try {
      const blob = await bookingService.getBookingInvoice(bookingId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `facture-${bookingId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      throw err;
    }
  }, []);

  return {
    booking,
    bookings,
    isLoading,
    error,
    createBooking,
    getBooking,
    getUserBookings,
    cancelBooking,
    downloadInvoice,
  };
};