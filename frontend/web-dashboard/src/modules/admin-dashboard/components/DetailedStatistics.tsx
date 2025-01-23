import { Grid, Paper, Typography } from '@mui/material';
import { LineChart, BarChart } from '@shared/components/charts';
import { useGetAdminStatsQuery } from '../services/api';

export default function DetailedStatistics() {
  const { data: stats } = useGetAdminStatsQuery({});

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            تحليل أداء النظام
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <LineChart
                data={stats?.systemUsage || { labels: [], datasets: [] }}
                height={300}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <div style={{ height: 300 }}>
                <BarChart
                  data={stats?.storesPerformance || { labels: [], datasets: [] }}
                />
              </div>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
