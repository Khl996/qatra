import { Grid } from '@mui/material';
import DashboardLayout from '@shared/components/layouts/DashboardLayout';
import { SalesChart } from '../components/SalesChart';
import { StatCard } from '@shared/components/charts';

export default function Sales() {
  return (
    <DashboardLayout role="merchant">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SalesChart />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}
