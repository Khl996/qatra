import { api } from './api';

interface AnalyticsParams {
  startDate: string;
  endDate: string;
  type: 'daily' | 'monthly' | 'yearly';
}

export const analyticsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAnalytics: builder.query<any, AnalyticsParams>({
      query: (params) => ({
        url: '/analytics',
        params
      })
    }),
    getPerformanceMetrics: builder.query<any, string>({
      query: (timeframe) => `/analytics/performance/${timeframe}`
    }),
    exportAnalytics: builder.mutation<Blob, AnalyticsParams>({
      query: (params) => ({
        url: '/analytics/export',
        method: 'POST',
        body: params,
        responseHandler: (response) => response.blob()
      })
    })
  })
});

export const {
  useGetAnalyticsQuery,
  useGetPerformanceMetricsQuery,
  useExportAnalyticsMutation
} = analyticsApi;
