import React from 'react';
import { Line } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';

interface AnalyticsChartProps {
  type: string;
  data: ChartData<'line'>;
  options?: ChartOptions<'line'>;
  height?: number;
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ type, data, options, height = 300 }) => {
  return (
    <div style={{ height }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default AnalyticsChart;
