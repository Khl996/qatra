import { Box } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import type { ChartData } from 'chart.js';
import { baseChartOptions } from '@/shared/config/chartConfig';

interface DoughnutChartProps {
  data: ChartData;
  title?: string;
  height?: number;
}

export default function DoughnutChart({ data, height = 300 }: DoughnutChartProps) {
  return (
    <Box sx={{ height }}>
      <Doughnut data={data} options={baseChartOptions} />
    </Box>
  );
}
