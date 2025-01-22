import { Grid } from '@mui/material';
import { StatCard } from '@shared/components/charts';
import DashboardLayout from '@shared/components/layouts/DashboardLayout';
import { TransactionsTable } from '../components/TransactionsTable';
import { MonthlyReportChart } from '../components/MonthlyReportChart';

export default function Reports() {
  return (
    <DashboardLayout role="merchant">
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <StatCard title="إجمالي النقاط الممنوحة" value="5,432" />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard title="عدد العملاء" value="234" />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard title="متوسط النقاط لكل عميل" value="23" />
        </Grid>
        <Grid item xs={12}>
          <MonthlyReportChart />
        </Grid>
        <Grid item xs={12}>
          <TransactionsTable />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}
