import { api } from '@shared/services/api';

export interface MerchantStats {
  totalPoints: number;
  activeCustomers: number;
  averagePoints: number;
  redeemedOffers: number;
  pointsGrowth: number;
  customerGrowth: number;
  offersGrowth: number;
  totalSales: number;
  salesGrowth: number;
  monthlyPointsActivity: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
    }>;
  };
  pointsDistribution: {
    labels: string[];
    datasets: Array<{
      data: number[];
      backgroundColor: string[];
    }>;
  };
}

export const merchantApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: () => '/merchant/transactions'
    }),
    addPoints: builder.mutation({
      query: (data) => ({
        url: '/merchant/points/add',
        method: 'POST',
        body: data
      })
    }),
    getMerchantStats: builder.query<MerchantStats, void>({
      query: () => '/merchant/stats'
    }),
    getCustomerStats: builder.query<any, void>({
      query: () => '/merchant/customers/stats'
    }),
    getPointsHistory: builder.query<any, void>({
      query: () => '/merchant/points/history'
    }),
    getPromotions: builder.query<any, void>({
      query: () => '/merchant/promotions'
    }),
    updatePointsSettings: builder.mutation({
      query: (data) => ({
        url: '/merchant/points/settings',
        method: 'PUT',
        body: data
      })
    }),
    updatePromotion: builder.mutation({
      query: (data) => ({
        url: `/merchant/promotions/${data.id}`,
        method: 'PUT',
        body: data
      })
    }),
    updatePromotionStatus: builder.mutation<void, { id: string; isActive: boolean }>({
      query: ({ id, isActive }) => ({
        url: `/merchant/promotions/${id}/status`,
        method: 'PUT',
        body: { isActive }
      })
    }),
    getOffers: builder.query<any, void>({
      query: () => '/merchant/offers'
    }),
    addOffer: builder.mutation({
      query: (data) => ({
        url: '/merchant/offers',
        method: 'POST',
        body: data
      })
    })
  })
});

export const {
  useGetTransactionsQuery,
  useAddPointsMutation,
  useGetMerchantStatsQuery,
  useGetCustomerStatsQuery,
  useGetPointsHistoryQuery,
  useGetPromotionsQuery,
  useUpdatePointsSettingsMutation,
  useUpdatePromotionMutation,
  useUpdatePromotionStatusMutation,
  useGetOffersQuery,
  useAddOfferMutation
} = merchantApi;
