import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

interface BaseResponse<T> {
  data: T;
  status: number;
  message: string;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: ['Stores', 'Points', 'Customers', 'Promotions', 'Users'],
  endpoints: () => ({})
});

export type ApiError = FetchBaseQueryError & {
  data: {
    message: string;
    errors?: Record<string, string[]>;
  };
};
