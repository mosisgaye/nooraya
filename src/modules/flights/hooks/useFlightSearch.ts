'use client';

import { useState, useCallback } from 'react';
import { Flight, FlightSearchParams, FlightFilters } from '../types';
import { flightService } from '../services/flightService';

export const useFlightSearch = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const searchFlights = useCallback(async (params: FlightSearchParams) => {
    setLoading(true);
    setError(null);

    try {
      const result = await flightService.searchFlights(params);
      setFlights(result.flights);
      setTotalCount(result.totalCount);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de recherche');
      setFlights([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }, []);

  const filterFlights = useCallback((filters: FlightFilters) => {
    if (flights.length === 0) return;
    
    const filtered = flightService.filterFlights(flights, filters);
    setFlights(filtered);
  }, [flights]);

  const sortFlights = useCallback((sortBy: 'price' | 'duration' | 'departure') => {
    const sorted = flightService.sortFlights(flights, sortBy);
    setFlights(sorted);
  }, [flights]);

  return {
    flights,
    loading,
    error,
    totalCount,
    searchFlights,
    filterFlights,
    sortFlights,
  };
};