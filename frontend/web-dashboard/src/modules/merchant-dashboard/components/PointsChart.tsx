import { Paper, Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import { baseChartOptions } from '@shared/config/chartConfig';

export default function PointsChart() {
  const data: ChartData<'line'> = {
    labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
    datasets: [
      {
        label: 'النقاط',
        data: [1200, 1900, 1500, 2500, 2200, 3000],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const options: ChartOptions<'line'> = {
    ...baseChartOptions,
    scales: {
      y: {
        beginAtZero: true,
        type: 'linear'
      },
      x: {
        type: 'category'
      }
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        نشاط النقاط
      </Typography>
      <Line data={data} options={options} />
    </Paper>
  );
}
