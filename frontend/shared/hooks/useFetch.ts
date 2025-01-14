import { useState, useEffect } from 'react';
import api from '../api/config';

interface UseFetchOptions {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  deps?: any[];
  immediate?: boolean;
}

export const useFetch = <T>({
  url,
  method = 'GET',
  body,
  deps = [],
  immediate = true
}: UseFetchOptions) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = async (customBody?: any) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api({
        method,
        url,
        data: customBody || body
      });
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, deps);

  return { data, loading, error, execute, setData };
};
