import { Grid } from '@mui/material';
import DashboardLayout from '@shared/components/layouts/DashboardLayout';
import { StatCard } from '@shared/components/charts';
import { SalesChart, PointsChart } from '../components';

export default function MerchantDashboard() {
  return (
    <DashboardLayout role="merchant">
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <StatCard title="إجمالي النقاط" value="1,234" />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard title="المبيعات اليومية" value="5,678" />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard title="العملاء النشطين" value="910" />
        </Grid>
        <Grid item xs={12} md={6}>
          <SalesChart />
        </Grid>
        <Grid item xs={12} md={6}>
          <PointsChart />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}
