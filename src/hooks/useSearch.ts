import { useState, useCallback } from 'react';
import { PaginatedData, DataSearchParams } from '@/types/common';

interface UseSearchOptions<T> {
  initialParams?: Partial<DataSearchParams>;
  searchFn: (params: DataSearchParams) => Promise<PaginatedData<T>>;
}

export const useSearch = <T>({ initialParams, searchFn }: UseSearchOptions<T>) => {
  const [data, setData] = useState<PaginatedData<T>>({
    items: [],
    totalCount: 0,
    page: 1,
    totalPages: 0,
    hasMore: false,
  });
  
  const [params, setParams] = useState<DataSearchParams>({
    page: 1,
    limit: 20,
    ...initialParams,
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (newParams?: Partial<DataSearchParams>) => {
    const searchParams = { ...params, ...newParams };
    setParams(searchParams);
    setIsLoading(true);
    setError(null);

    try {
      const result = await searchFn(searchParams);
      setData(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur de recherche';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [params, searchFn]);

  const loadMore = useCallback(async () => {
    if (!data.hasMore || isLoading) return;
    
    try {
      const nextPage = params.page + 1;
      const result = await searchFn({ ...params, page: nextPage });
      
      setData(prev => ({
        ...result,
        items: [...prev.items, ...result.items],
      }));
      
      setParams(prev => ({ ...prev, page: nextPage }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur de chargement';
      setError(errorMessage);
      throw err;
    }
  }, [data.hasMore, isLoading, params, searchFn]);

  const reset = useCallback(() => {
    setData({
      items: [],
      totalCount: 0,
      page: 1,
      totalPages: 0,
      hasMore: false,
    });
    setParams({ page: 1, limit: 20, ...initialParams });
    setError(null);
  }, [initialParams]);

  return {
    data,
    params,
    isLoading,
    error,
    search,
    loadMore,
    reset,
  };
};