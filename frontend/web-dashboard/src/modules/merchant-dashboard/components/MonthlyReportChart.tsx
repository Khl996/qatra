import { Paper, Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { baseChartOptions } from '@shared/config/chartConfig';

export function MonthlyReportChart() {
  const data = {
    labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
    datasets: [
      {
        label: 'المبيعات الشهرية',
        data: [12, 19, 3, 5, 2, 3],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>التقرير الشهري</Typography>
      <Line data={data} options={baseChartOptions} />
    </Paper>
  );
}
