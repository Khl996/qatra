import React from 'react';
import { Line } from 'react-chartjs-2';

interface SystemStatusChartProps {
  data: any;
  options: any;
}

const SystemStatusChart: React.FC<SystemStatusChartProps> = ({ data, options }) => {
  return <Line data={data} options={options} />;
};

export default SystemStatusChart;