import { Grid } from '@mui/material';
import DashboardLayout from '../../../shared/components/layouts/DashboardLayout';
import StoresList from '../components/StoresList';
import { StoreRequestsList } from '../components/StoreRequestsList';
import { StoresStats } from '../components/StoresStats';

export default function Stores() {
  const handleApprove = (id: string) => {
    // Handle store approval
  };

  const handleReject = (id: string) => {
    // Handle store rejection
  };

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
          <StoreRequestsList 
            requests={[]} 
            onApprove={handleApprove} 
            onReject={handleReject}
          />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}
