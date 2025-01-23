import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

interface BaseResponse<T> {
  data: T;
  status: number;
  message: string;
}

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['Stores', 'Users', 'Stats'],
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  endpoints: () => ({})
});

export type ApiError = FetchBaseQueryError & {
  data: {
    message: string;
    errors?: Record<string, string[]>;
  };
};
