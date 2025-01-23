import { Grid, Paper } from '@mui/material';
import { StatCard } from '@shared/components/charts';
import { useGetSystemMetricsQuery } from '../services/api';
import { LoadingState } from '@shared/components/LoadingState';

export default function SystemOverview() {
  const { data, isLoading } = useGetSystemMetricsQuery();

  if (isLoading) return <LoadingState />;

  return (
    <Paper sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <StatCard
            title="إجمالي المتاجر"
            value={data?.totalStores || 0}
            trend={data?.storesGrowth}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="إجمالي المستخدمين"
            value={data?.totalUsers ?? 0}
            trend={data?.usersGrowth}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="النقاط الممنوحة"
            value={data?.totalPoints ?? 0}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="قيمة المبيعات"
            value={data?.totalSales ?? 0}
            trend={data?.salesGrowth}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
