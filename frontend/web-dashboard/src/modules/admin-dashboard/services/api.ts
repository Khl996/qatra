import { api } from '@shared/services/api';

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

export const adminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getStoresStats: builder.query<StoreStats, void>({
      query: () => '/admin/stats/stores'
    }),
    getSystemStats: builder.query<SystemStats, void>({
      query: () => '/admin/stats/system'
    }),
    getAdminStats: builder.query<SystemStats, void>({
      query: () => '/admin/stats'
    }),
    getStores: builder.query<Store[], void>({
      query: () => '/admin/stores',
      providesTags: ['Stores']
    }),
    approveStore: builder.mutation<void, string>({
      query: (id) => ({
        url: `/admin/stores/${id}/approve`,
        method: 'POST'
      }),
      invalidatesTags: ['Stores']
    }),
    registerStore: builder.mutation({
      query: (data) => ({
        url: '/admin/stores/register',
        method: 'POST',
        body: data
      })
    }),
    updateStoreStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/admin/stores/${id}/status`,
        method: 'PUT',
        body: { status }
      })
    }),
    getSystemMetrics: builder.query({
      query: () => '/admin/metrics'
    }),
    getStoresMonitoring: builder.query({
      query: () => '/admin/stores/monitoring'
    }),
    getUsers: builder.query({
      query: () => '/admin/users',
      providesTags: ['Users']
    }),
    updateUserStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/admin/users/${id}/status`,
        method: 'PUT',
        body: { status }
      }),
      invalidatesTags: ['Users']
    })
  })
});

export const {
  useGetAdminStatsQuery,
  useGetStoresQuery,
  useApproveStoreMutation,
  useRegisterStoreMutation,
  useUpdateStoreStatusMutation,
  useGetSystemMetricsQuery,
  useGetStoresMonitoringQuery,
  useGetStoresStatsQuery,
  useGetSystemStatsQuery,
  useGetUsersQuery,
  useUpdateUserStatusMutation
} = adminApi;
