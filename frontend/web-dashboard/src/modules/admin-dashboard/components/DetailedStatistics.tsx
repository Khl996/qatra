import { Grid, Paper, Typography } from '@mui/material';
import { AnalyticsChart } from '@shared/components/charts/AnalyticsChart';
import { useGetAdminStatsQuery } from '@admin/services/api';

export default function DetailedStatistics() {
  const { data: stats } = useGetAdminStatsQuery();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            تحليل أداء النظام
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <AnalyticsChart
                type="line"
                data={stats?.systemUsage || { labels: [], datasets: [] }}
                height={300}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <AnalyticsChart
                type="bar"
                data={stats?.storesPerformance || { labels: [], datasets: [] }}
                height={300}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
