import { Grid, Paper } from '@mui/material';
import { ProfileSettings, NotificationSettings } from '../components';
import DashboardLayout from '@shared/components/layouts/DashboardLayout';
import { PointsSettings } from '../components/PointsSettings';

export default function Settings() {
  return (
    <DashboardLayout role="merchant">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <ProfileSettings />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <NotificationSettings />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <PointsSettings />
          </Paper>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}
