import { Grid } from '@mui/material';
import { StatCard } from '@shared/components/charts';
import { useGetMerchantStatsQuery } from '../services/api';

export function StatsOverview() {
  const { data: stats } = useGetMerchantStatsQuery();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="النقاط اليومية"
          value={stats?.dailyPoints || 0}
          percentage={stats?.dailyPointsGrowth}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="العملاء الجدد"
          value={stats?.newCustomers || 0}
          percentage={stats?.customerGrowth}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="العروض النشطة"
          value={stats?.activeOffers || 0}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="إجمالي المبيعات"
          value={stats?.totalSales || 0}
          percentage={stats?.salesGrowth}
        />
      </Grid>
    </Grid>
  );
}
