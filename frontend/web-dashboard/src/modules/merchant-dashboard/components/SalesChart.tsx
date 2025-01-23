import React from 'react';
import { Paper, Typography } from '@mui/material';
import LineChart from '@shared/components/charts/LineChart';

export default function SalesChart() {
  const data = {
    labels: ['يناير', 'فبراير', 'مارس', 'ابريل', 'مايو', 'يونيو'],
    datasets: [
      {
        label: 'المبيعات',
        data: [12, 19, 3, 5, 2, 3],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        إحصائيات المبيعات
      </Typography>
      <LineChart data={data} />
    </Paper>
  );
}
