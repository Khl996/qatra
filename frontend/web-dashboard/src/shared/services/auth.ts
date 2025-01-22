import { api } from './api';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'merchant' | 'admin';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: 'merchant' | 'admin';
  };
  token: string;
}

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginCredentials>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      })
    }),
    getCurrentUser: builder.query<User, void>({
      query: () => '/auth/me'
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST'
      })
    })
  })
});

export const {
  useLoginMutation,
  useGetCurrentUserQuery,
  useLogoutMutation
} = authApi;
