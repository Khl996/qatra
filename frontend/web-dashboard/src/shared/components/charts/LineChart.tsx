import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { baseChartOptions } from '@shared/config/chartConfig';

interface LineChartProps {
  data: any;
  height?: number;
}

export default function LineChart({ data, height = 300 }: LineChartProps) {
  return (
    <div style={{ height }}>
      <Line data={data} options={baseChartOptions} />
    </div>
  );
}
