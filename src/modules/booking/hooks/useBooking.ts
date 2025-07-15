'use client';

import { useState, useCallback } from 'react';
import { Booking, BookingRequest } from '../types';
import { bookingService } from '../services/bookingService';

export const useBooking = () => {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBooking = useCallback(async (request: BookingRequest) => {
    setLoading(true);
    setError(null);

    try {
      const newBooking = await bookingService.createBooking(request);
      setBooking(newBooking);
      return newBooking;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de réservation');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getBooking = useCallback(async (bookingId: string) => {
    setLoading(true);
    setError(null);

    try {
      const bookingData = await bookingService.getBooking(bookingId);
      setBooking(bookingData);
      return bookingData;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de chargement');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getUserBookings = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const userBookings = await bookingService.getUserBookings();
      setBookings(userBookings);
      return userBookings;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de chargement');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const cancelBooking = useCallback(async (bookingId: string, reason?: string) => {
    setLoading(true);
    setError(null);

    try {
      const cancelledBooking = await bookingService.cancelBooking(bookingId, reason);
      
      // Mettre à jour l'état local
      if (booking && booking.id === bookingId) {
        setBooking(cancelledBooking);
      }
      
      setBookings(prev => 
        prev.map(b => b.id === bookingId ? cancelledBooking : b)
      );

      return cancelledBooking;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur d\'annulation');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [booking]);

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
      setError(err instanceof Error ? err.message : 'Erreur de téléchargement');
      throw err;
    }
  }, []);

  return {
    booking,
    bookings,
    loading,
    error,
    createBooking,
    getBooking,
    getUserBookings,
    cancelBooking,
    downloadInvoice,
  };
};