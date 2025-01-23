import { Grid } from '@mui/material';
import { DashboardLayout } from '@shared/components/layouts';
import { StatCard } from '@shared/components/charts';
import { StoresList, UsersList } from '../components';

export default function AdminDashboard() {
  return (
    <DashboardLayout role="admin">
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <StatCard title="إجمالي المتاجر" value="150" />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard title="المستخدمين النشطين" value="1,500" />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard title="الطلبات الجديدة" value="25" />
        </Grid>
        <Grid item xs={12} md={6}>
          <StoresList />
        </Grid>
        <Grid item xs={12} md={6}>
          <UsersList />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}
