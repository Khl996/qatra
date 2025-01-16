import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Offer {
  id: string;
  title: string;
  description: string;
  discount: number;
  storeId: string;
}

export const offersApi = createApi({
  reducerPath: 'offersApi',
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
    getStoreOffers: builder.query({
      query: (storeId) => `/offers/store/${storeId}`,
    }),
    getOffer: builder.query({
      query: (offerId) => `/offers/${offerId}`,
    }),
    getOffers: builder.query<Offer[], void>({
      query: () => '/offers',
    }),
  }),
});

export const {
  useGetStoreOffersQuery,
  useGetOfferQuery,
  useGetOffersQuery
} = offersApi;
