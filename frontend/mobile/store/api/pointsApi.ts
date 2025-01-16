import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const pointsApi = createApi({
  reducerPath: 'pointsApi',
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
    getUserPoints: builder.query({
      query: () => '/points/user',
    }),
    getStorePoints: builder.query({
      query: (storeId) => `/points/store/${storeId}`,
    }),
    addPoints: builder.mutation({
      query: (data) => ({
        url: '/points/add',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetUserPointsQuery,
  useGetStorePointsQuery,
  useAddPointsMutation,
} = pointsApi;
