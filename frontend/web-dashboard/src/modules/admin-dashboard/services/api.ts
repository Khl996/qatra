import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Store {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'pending' | 'active' | 'inactive';
}

export interface StoreStats {
  totalStores: number;
  activeStores: number;
  pendingRequests: number;
  suspendedStores: number;
  storesGrowth: number;
}

export interface SystemStats {
  systemUsage: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      fill: boolean;
    }[];
  };
  storesPerformance: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
    }[];
  };
}

export interface AdminStats {
  systemUsage: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      borderColor?: string;
      backgroundColor?: string;
    }>;
  };
  storesPerformance: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      backgroundColor: string[];
    }>;
  };
}

export interface StoreStatsData {
  totalStores: number;
  activeStores: number;
  pendingStores: number;
  storesGrowth: number;
}

export interface SystemMetrics {
  totalStores: number;
  totalUsers: number;
  totalSales: number;
  totalPoints: number;
  storesGrowth: number;
  usersGrowth: number;
  salesGrowth: number;
}

export type ReportType = 'daily' | 'monthly' | 'yearly';

export interface ReportParams {
  type: ReportType;
  startDate: string;
  endDate: string;
  format: string;
}

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getStores: builder.query<any[], { status?: string }>({
      query: (params = {}) => ({
        url: 'stores',
        params
      })
    }),
    getUsers: builder.query({
      query: () => 'users'
    }),
    getStoresStats: builder.query<SystemMetrics, void>({
      query: () => 'stores/stats'
    }),
    getSystemMetrics: builder.query<SystemMetrics, void>({
      query: () => 'system/metrics'
    }),
    getAdminStats: builder.query({
      query: () => 'admin/stats'
    }),
    registerStore: builder.mutation({
      query: (data) => ({
        url: 'stores/register',
        method: 'POST',
        body: data
      })
    }),
    approveStore: builder.mutation({
      query: (id) => ({
        url: `stores/${id}/approve`,
        method: 'PUT'
      })
    }),
    updateStoreStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `stores/${id}/status`,
        method: 'PUT',
        body: { status }
      })
    }),
    getStoresMonitoring: builder.query({
      query: () => 'stores/monitoring'
    }),
    getReports: builder.mutation<any, ReportParams>({
      query: (params) => ({
        url: 'reports/generate',
        method: 'POST',
        body: params
      })
    }),
    generateReport: builder.mutation<any, ReportParams>({
      query: (params) => ({
        url: 'reports/generate',
        method: 'POST',
        body: params
      })
    })
  })
});

export const {
  useGetStoresQuery,
  useGetUsersQuery,
  useGetStoresStatsQuery,
  useGetSystemMetricsQuery,
  useGetAdminStatsQuery,
  useRegisterStoreMutation,
  useApproveStoreMutation,
  useUpdateStoreStatusMutation,
  useGetStoresMonitoringQuery,
  useGetReportsMutation,
  useGenerateReportMutation
} = adminApi;
