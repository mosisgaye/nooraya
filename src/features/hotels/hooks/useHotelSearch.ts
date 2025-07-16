'use client';

import { useState, useCallback } from 'react';
import { Hotel, SearchParams, FilterOptions } from '@/types';
import { hotelService } from '../services/hotelService';

export const useHotelSearch = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const searchHotels = useCallback(async (params: SearchParams) => {
    setLoading(true);
    setError(null);

    try {
      const result = await hotelService.searchHotels(params);
      if (result.success && result.data) {
        setHotels(result.data.hotels);
        setTotalCount(result.data.totalCount);
      } else {
        throw new Error(result.error?.message || 'Erreur de recherche');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de recherche');
      setHotels([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }, []);

  const filterHotels = useCallback((filters: FilterOptions) => {
    if (hotels.length === 0) return;
    
    const filtered = hotelService.filterHotels(hotels, filters);
    setHotels(filtered);
  }, [hotels]);

  const sortHotels = useCallback((sortBy: 'price' | 'rating' | 'stars' | 'distance') => {
    const sorted = hotelService.sortHotels(hotels, sortBy);
    setHotels(sorted);
  }, [hotels]);

  return {
    hotels,
    loading,
    error,
    totalCount,
    searchHotels,
    filterHotels,
    sortHotels,
  };
};