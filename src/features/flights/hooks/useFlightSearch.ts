'use client';

import { useState, useCallback } from 'react';
import { Flight, SearchParams, FilterOptions } from '@/types';
import { flightService } from '../services/flightService';
import { useAsyncOperation } from '@/hooks/useAsyncOperation';

export const useFlightSearch = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const { isLoading, error, execute } = useAsyncOperation<{ flights: Flight[], totalCount: number }>();

  const searchFlights = useCallback(async (params: SearchParams) => {
    const result = await execute(async () => {
      const apiResult = await flightService.searchFlights(params);
      if (apiResult.success && apiResult.data) {
        return apiResult.data;
      } else {
        throw new Error(apiResult.error?.message || 'Erreur de recherche');
      }
    });

    if (result) {
      setFlights(result.flights);
      setTotalCount(result.totalCount);
    }
  }, [execute]);

  const filterFlights = useCallback((filters: FilterOptions) => {
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
    isLoading,
    error,
    totalCount,
    searchFlights,
    filterFlights,
    sortFlights,
  };
};