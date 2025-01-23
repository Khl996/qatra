import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ChartData } from 'chart.js';
import 'chart.js/auto';

const StoresPerformanceChart = () => {
  const data: ChartData<'bar'> = {
    labels: ['متجر 1', 'متجر 2', 'متجر 3', 'متجر 4', 'متجر 5'],
    datasets: [
      {
        label: 'النقاط الممنوحة',
        data: [1200, 1900, 1500, 2500, 2200],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }
    ]
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" mb={2}>أداء المتاجر</Typography>
      <Box sx={{ height: 300 }}>
        <Bar data={data} />
      </Box>
    </Paper>
  );
};

export default StoresPerformanceChart;
