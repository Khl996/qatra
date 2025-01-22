import { Grid } from '@mui/material';
import { StatCard } from '@shared/components/charts';
import { useGetStoresStatsQuery } from '../services/api';

interface StoreStatsData {
  totalStores: number;
  activeStores: number;
  pendingRequests: number;
  suspendedStores: number;
  storesGrowth: number;
}

export function StoresStats() {
  const { data: stats } = useGetStoresStatsQuery<{ data: StoreStatsData }>();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="إجمالي المتاجر"
          value={stats?.totalStores || 0}
          percentage={stats?.storesGrowth || 0}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="المتاجر النشطة"
          value={stats?.activeStores || 0}
          color="success"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="طلبات التسجيل"
          value={stats?.pendingRequests || 0}
          color="warning"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="المتاجر المعلقة"
          value={stats?.suspendedStores || 0}
          color="error"
        />
      </Grid>
    </Grid>
  );
}
