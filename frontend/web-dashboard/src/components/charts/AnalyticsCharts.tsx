import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { Box, Text } from '@chakra-ui/react';

const mockPointsData = [
  { name: 'يناير', points: 4000 },
  { name: 'فبراير', points: 3000 },
  { name: 'مارس', points: 2000 },
  { name: 'أبريل', points: 2780 },
  { name: 'مايو', points: 1890 },
  { name: 'يونيو', points: 2390 },
];

export const PointsChart = () => {
  return (
    <Box h="400px" w="100%">
      <Text mb={4} fontWeight="bold">تحليل النقاط الشهري</Text>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={mockPointsData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area 
            type="monotone" 
            dataKey="points" 
            stroke="#007AFF" 
            fill="#007AFF" 
            fillOpacity={0.2} 
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

const mockUsageData = [
  { name: 'متجر البركة', usage: 120 },
  { name: 'سوق الخير', usage: 98 },
  { name: 'كافيه السعادة', usage: 86 },
  { name: 'مطعم النور', usage: 75 },
];

export const StoresUsageChart = () => {
  return (
    <Box h="400px" w="100%">
      <Text mb={4} fontWeight="bold">أكثر المتاجر نشاطاً</Text>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={mockUsageData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="usage" fill="#007AFF" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};
