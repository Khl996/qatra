export interface MerchantStats {
  totalSales: number;
  salesGrowth: number;
  activeOffers: number;
  offersGrowth: number;
  pointsToday: number;
  pointsGrowth: number;
  activeCustomers: number;
  customerGrowth: number;
  averagePoints: number;
  redeemedOffers: number;
  monthlyPointsActivity: {
    labels: string[];
    datasets: any[];
  };
  pointsDistribution: {
    labels: string[];
    datasets: any[];
  };
  totalPoints: number;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  isActive: boolean;
  requiredPoints: number;
}
