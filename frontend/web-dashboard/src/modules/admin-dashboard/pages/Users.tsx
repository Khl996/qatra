import { Grid } from '@mui/material';
import DashboardLayout from '@shared/components/layouts/DashboardLayout';
import UsersList from '../components/UsersList';

export default function Users() {
  return (
    <DashboardLayout role="admin">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <UsersList />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}
