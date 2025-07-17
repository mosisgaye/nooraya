'use client';

import { useState, useCallback } from 'react';
import { Hotel, SearchParams, FilterOptions } from '@/types';
import { hotelService } from '../services/hotelService';
import { useAsyncOperation } from '@/hooks/useAsyncOperation';

export const useHotelSearch = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const { isLoading, error, execute } = useAsyncOperation<{ hotels: Hotel[], totalCount: number }>();

  const searchHotels = useCallback(async (params: SearchParams) => {
    const result = await execute(async () => {
      const apiResult = await hotelService.searchHotels(params);
      if (apiResult.success && apiResult.data) {
        return apiResult.data;
      } else {
        throw new Error(apiResult.error?.message || 'Erreur de recherche');
      }
    });

    if (result) {
      setHotels(result.hotels);
      setTotalCount(result.totalCount);
    }
  }, [execute]);

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
    isLoading,
    error,
    totalCount,
    searchHotels,
    filterHotels,
    sortHotels,
  };
};