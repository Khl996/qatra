import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface SalesChartProps {
  type: 'daily' | 'weekly' | 'monthly';
  dateRange: string;
}

export const SalesChart: React.FC<SalesChartProps> = ({ type, dateRange }) => {
  // بيانات تجريبية - سيتم استبدالها ببيانات حقيقية
  const data = [
    { date: '1/1', sales: 4000 },
    { date: '2/1', sales: 3000 },
    { date: '3/1', sales: 2000 },
    { date: '4/1', sales: 2780 },
    { date: '5/1', sales: 1890 },
    { date: '6/1', sales: 2390 },
    { date: '7/1', sales: 3490 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Area 
          type="monotone" 
          dataKey="sales" 
          stroke="#0088FE" 
          fill="#0088FE"
          fillOpacity={0.2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
