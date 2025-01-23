import React from 'react';
import { Bar } from 'react-chartjs-2';

interface StoresPerformanceChartProps {
  data: any;
  options: any;
}

const StoresPerformanceChart: React.FC<StoresPerformanceChartProps> = ({ data, options }) => {
  return <Bar data={data} options={options} />;
};

export default StoresPerformanceChart;