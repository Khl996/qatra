import React from 'react';
import { Box } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';

interface DoughnutChartProps {
  data: ChartData<'doughnut'>;
  options?: ChartOptions<'doughnut'>;
  title?: string;
  height?: number;
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ data, options, title, height = 300 }) => {
  const defaultOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        align: 'center'
      }
    }
  };

  return (
    <Box sx={{ height }}>
      {title && <h3>{title}</h3>}
      <Doughnut data={data} options={options || defaultOptions} />
    </Box>
  );
};

export default DoughnutChart;
