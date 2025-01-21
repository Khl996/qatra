import React from 'react';
import {
  Box,
  SimpleGrid,
  Card,
  CardBody,
  Text,
  VStack,
  HStack,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatArrow,
  StatHelpText,
} from '@chakra-ui/react';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const AdvancedAnalytics = () => {
  const salesData = [
    { time: '9:00', sales: 2400 },
    { time: '12:00', sales: 4200 },
    { time: '15:00', sales: 3800 },
    { time: '18:00', sales: 5600 },
    { time: '21:00', sales: 4800 },
  ];

  const categoryData = [
    { name: 'مشروبات ساخنة', value: 400 },
    { name: 'مشروبات باردة', value: 300 },
    { name: 'حلويات', value: 200 },
    { name: 'وجبات', value: 300 },
  ];

  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
      <Card>
        <CardBody>
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            تحليل المبيعات اليومية
          </Text>
          <Box height="300px">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#0088FE" 
                  strokeWidth={2} 
                />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            توزيع المبيعات حسب الفئة
          </Text>
          <Box height="300px">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            أداء العروض
          </Text>
          <VStack spacing={4}>
            {['خصم القهوة', 'عرض الإفطار', 'عرض نهاية الأسبوع'].map((offer) => (
              <Box key={offer}>
                <HStack justify="space-between" mb={2}>
                  <Text>{offer}</Text>
                  <Text>65%</Text>
                </HStack>
                <Progress value={65} colorScheme="blue" size="sm" />
              </Box>
            ))}
          </VStack>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            مؤشرات الأداء
          </Text>
          <SimpleGrid columns={2} spacing={4}>
            <Stat>
              <StatLabel>معدل العائد</StatLabel>
              <StatNumber>23%</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                8.2%
              </StatHelpText>
            </Stat>
            <Stat>
              <StatLabel>معدل التفاعل</StatLabel>
              <StatNumber>82%</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                12.5%
              </StatHelpText>
            </Stat>
          </SimpleGrid>
        </CardBody>
      </Card>
    </SimpleGrid>
  );
};
