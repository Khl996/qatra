import { api } from './api';

interface ReportParams {
  startDate: string;
  endDate: string;
  type: 'daily' | 'monthly' | 'yearly';
}

export const reportsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    generateReport: builder.mutation<void, ReportParams>({
      query: (params) => ({
        url: '/reports/generate',
        method: 'POST',
        body: params
      })
    }),
    getReportTypes: builder.query<string[], void>({
      query: () => '/reports/types'
    }),
    downloadReport: builder.mutation<Blob, string>({
      query: (reportId) => ({
        url: `/reports/${reportId}/download`,
        method: 'GET',
        responseHandler: (response: Response) => response.blob()
      })
    })
  })
});

export const {
  useGenerateReportMutation,
  useGetReportTypesQuery,
  useDownloadReportMutation
} = reportsApi;