export type { Promotion } from './promotion';

export interface MerchantStats {
  pointsToday: number;
  pointsGrowth: number;
  totalPoints: number;
  totalCustomers: number;
  activeCustomers: number;
  customerGrowth: number;
  totalSales: number;
  salesGrowth: number;
  totalOffers: number;
  activeOffers: number;
  offersGrowth: number;
  averagePoints: number;
  redeemedOffers: number;
  monthlyPointsActivity: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      backgroundColor?: string;
      borderColor?: string;
    }>;
  };
  pointsDistribution: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      backgroundColor?: string;
      borderColor?: string;
    }>;
  };
}
