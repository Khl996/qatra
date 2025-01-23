import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface StoreStats {
  activeStores: number;
  pendingRequests: number;
  suspendedStores: number;
  totalStores: number;
}

export interface LoginResponse {
  token: string;
  userType: 'merchant' | 'admin';
}

export interface MerchantStats {
  totalPoints: number;
  pointsGrowth: number;
  activeCustomers: number;
  customerGrowth: number;
  totalSales: number;
  salesGrowth: number;
}

export const api = createApi({
  reducerPath: 'api',
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
  endpoints: (builder) => ({
    getStores: builder.query({
      query: () => 'stores'
    }),
    getUsers: builder.query({
      query: () => 'users'
    }),
    getStoresStats: builder.query<StoreStats, void>({
      query: () => 'stores/stats'
    }),
    getSystemMetrics: builder.query({
      query: () => 'system/metrics'
    }),
    getAdminStats: builder.query({
      query: () => 'admin/stats'
    }),
    getStoresMonitoring: builder.query({
      query: () => 'stores/monitoring'
    }),
    approveStore: builder.mutation({
      query: (id) => ({
        url: `stores/${id}/approve`,
        method: 'PUT'
      })
    }),
    registerStore: builder.mutation({
      query: (data) => ({
        url: 'stores/register',
        method: 'POST',
        body: data
      })
    }),
    login: builder.mutation<LoginResponse, any>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials
      })
    }),
    updateStoreStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `stores/${id}/status`,
        method: 'PUT',
        body: { status }
      })
    }),
    getMerchantStats: builder.query<MerchantStats, void>({
      query: () => 'merchant/stats'
    })
  })
});

export const {
  useGetStoresQuery,
  useGetUsersQuery,
  useGetStoresStatsQuery,
  useGetSystemMetricsQuery,
  useGetAdminStatsQuery,
  useGetStoresMonitoringQuery,
  useApproveStoreMutation,
  useRegisterStoreMutation,
  useLoginMutation,
  useUpdateStoreStatusMutation,
  useGetMerchantStatsQuery
} = api;
