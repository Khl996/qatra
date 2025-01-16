import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../config/constants';

interface Store {
  id: string;
  name: string;
  category: string;
  logo?: string;
  description?: string;
  points?: number;
}

export const storeApi = createApi({
  reducerPath: 'storeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api',
    prepareHeaders: async (headers) => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getStores: builder.query<Store[], void>({
      query: () => '/stores',
    }),
  }),
});

export const { useGetStoresQuery } = storeApi;
