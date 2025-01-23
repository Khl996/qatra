import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { MerchantStats, Promotion } from '../../../types/merchant';

// Types
interface AddPointsRequest {
  customerPhone: string;
  amount: number;
  description?: string;
}

interface PointsSettings {
  pointsPerRiyal: number;
  minimumAmount: number;
  maximumPointsPerDay: number;
}

interface AddOfferRequest {
  title: string;
  description: string;
  discountPercentage: number;
  startDate: string;
  endDate: string;
}

interface UpdatePromotionRequest {
  id: string;
  data: {
    isActive: boolean;
  };
}

// API Definition
export const merchantApi = createApi({
  reducerPath: 'merchantApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/merchant' }),
  endpoints: (builder) => ({
    getStoreProfile: builder.query<any, void>({
      query: () => 'profile'
    }),
    updateStore: builder.mutation({
      query: (data) => ({
        url: 'profile',
        method: 'PUT',
        body: data
      })
    }),
    getMerchantStats: builder.query<MerchantStats, void>({
      query: () => 'stats'
    }),
    getPromotions: builder.query<Promotion[], void>({
      query: () => 'promotions'
    }),
    updatePromotion: builder.mutation<void, UpdatePromotionRequest>({
      query: ({ id, data }) => ({
        url: `promotions/${id}`,
        method: 'PUT',
        body: data
      })
    }),
    getOffers: builder.query<any, void>({
      query: () => 'offers'
    }),
    getPointsHistory: builder.query<any, void>({
      query: () => 'points/history'
    }),
    getCustomerStats: builder.query<any, void>({
      query: () => 'customers/stats'
    }),
    addPoints: builder.mutation<void, AddPointsRequest>({
      query: (data) => ({
        url: 'points/add',
        method: 'POST',
        body: data
      })
    }),
    updatePointsSettings: builder.mutation<void, PointsSettings>({
      query: (data) => ({
        url: 'points/settings',
        method: 'PUT',
        body: data
      })
    }),
    addOffer: builder.mutation<void, AddOfferRequest>({
      query: (data) => ({
        url: 'offers',
        method: 'POST',
        body: data
      })
    })
  })
});

// Export hooks
export const {
  useGetStoreProfileQuery,
  useUpdateStoreMutation,
  useGetMerchantStatsQuery,
  useGetPromotionsQuery,
  useUpdatePromotionMutation,
  useGetOffersQuery,
  useGetPointsHistoryQuery,
  useGetCustomerStatsQuery,
  useAddPointsMutation,
  useUpdatePointsSettingsMutation,
  useAddOfferMutation
} = merchantApi;
