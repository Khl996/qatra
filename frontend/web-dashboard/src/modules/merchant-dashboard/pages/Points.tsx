import { Grid } from '@mui/material';
import DashboardLayout from '@shared/components/layouts/DashboardLayout';
import { AddPointsForm } from '../components/AddPointsForm';
import { PointsHistory } from '../components/PointsHistory';
import { PointsStats } from '../components/PointsStats';

export default function Points() {
  return (
    <DashboardLayout role="merchant">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <PointsStats />
        </Grid>
        <Grid item xs={12} md={5}>
          <AddPointsForm />
        </Grid>
        <Grid item xs={12} md={7}>
          <PointsHistory />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}
