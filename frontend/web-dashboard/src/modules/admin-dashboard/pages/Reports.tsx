import { Grid } from '@mui/material';
import DashboardLayout from '@shared/components/layouts/DashboardLayout';
import { StatCard } from '@shared/components/charts';
import StoresPerformanceChart from '../components/StoresPerformanceChart';
import SystemStatusChart from '../components/SystemStatusChart';

export default function AdminReports() {
  return (
    <DashboardLayout role="admin">
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <StatCard title="إجمالي المتاجر" value="150" />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard title="المتاجر النشطة" value="120" />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard title="إجمالي المستخدمين" value="5,234" />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard title="النقاط الممنوحة" value="52,340" />
        </Grid>
        <Grid item xs={12} md={6}>
          <StoresPerformanceChart />
        </Grid>
        <Grid item xs={12} md={6}>
          <SystemStatusChart />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}
