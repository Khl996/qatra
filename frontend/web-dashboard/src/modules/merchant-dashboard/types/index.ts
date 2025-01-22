export interface MerchantStats {
  totalPoints: number;
  activeCustomers: number;
  averagePoints: number;
  redeemedOffers: number;
  pointsGrowth: number;
  customerGrowth: number;
  offersGrowth: number;
  dailyPoints: number;
  dailyPointsGrowth: number;
  newCustomers: number;
  activeOffers: number;
  totalSales: number;
  salesGrowth: number;
  monthlyPointsActivity: ChartData;
  pointsDistribution: ChartData;
}

export interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
  }>;
}
