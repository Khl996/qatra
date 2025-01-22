import { Grid } from '@mui/material';
import DashboardLayout from '@shared/components/layouts/DashboardLayout';
import { StoresList } from '../components/StoresList';
import { StoreRequestsList } from '../components/StoreRequestsList';
import { StoresStats } from '../components/StoresStats';

export default function Stores() {
  return (
    <DashboardLayout role="admin">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StoresStats />
        </Grid>
        <Grid item xs={12} md={7}>
          <StoresList />
        </Grid>
        <Grid item xs={12} md={5}>
          <StoreRequestsList />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}
