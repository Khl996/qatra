import React from 'react';
import { Grid } from '@mui/material';
import { StatCard } from '@shared/components/charts';
import { useGetMerchantStatsQuery } from '../services/api';

export default function PointsStats() {
  const { data: stats } = useGetMerchantStatsQuery();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <StatCard
          title="إجمالي النقاط"
          value={stats?.totalPoints || 0}
          percentage={stats?.pointsGrowth}
        />
      </Grid>
    </Grid>
  );
}
