import React from 'react';
import { Grid } from '@mui/material';
import StatCard from '@shared/components/charts/StatCard';
import { useGetMerchantStatsQuery } from '../services/api';
import { MerchantStats } from '../../../types/merchant';

interface StatsOverviewProps {
  stats: MerchantStats;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ stats }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="النقاط اليومية"
          value={stats?.pointsToday || 0}
          percentage={stats?.pointsGrowth}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="العملاء النشطين"
          value={stats?.activeCustomers || 0}
          percentage={stats?.customerGrowth}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="العروض النشطة"
          value={stats?.activeOffers || 0}
          percentage={stats?.offersGrowth}
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
