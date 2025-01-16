import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api',
    prepareHeaders: async (headers) => {
      const token = await AsyncStorage.getItem('token');
      if (token) headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query: (data) => ({
        url: '/users/profile',
        method: 'PUT',
        body: data,
      }),
    }),
    getProfile: builder.query({
      query: () => '/users/profile',
    }),
    updatePassword: builder.mutation({
      query: (data) => ({
        url: '/users/password',
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const {
  useUpdateProfileMutation,
  useGetProfileQuery,
  useUpdatePasswordMutation,
} = userApi;
