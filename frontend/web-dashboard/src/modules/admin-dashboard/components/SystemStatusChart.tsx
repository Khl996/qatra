import { Paper, Typography, Box } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';
import { baseChartOptions } from '@shared/config/chartConfig';

export default function SystemStatusChart() {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>حالة النظام</Typography>
      <Line 
        data={{
          labels: [],
          datasets: []
        }}
        options={baseChartOptions as ChartOptions<'line'>}
      />
    </Paper>
  );
}
