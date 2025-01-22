import { Paper, Typography, Grid } from '@mui/material';
import { StatCard } from '@shared/components/charts';
import { useGetMerchantStatsQuery } from '../services/api';

export default function StoreManagement() {
  const { data: stats } = useGetMerchantStatsQuery();

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>إدارة المتجر</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <StatCard
            title="إجمالي المبيعات"
            value={stats?.totalSales || 0}
            percentage={stats?.salesGrowth}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="عدد العملاء"
            value={stats?.activeCustomers || 0}
            percentage={stats?.customerGrowth}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
