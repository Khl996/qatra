import React from 'react';
import {
  Box,
  Heading,
  HStack,
  Select,
  Card,
  CardBody,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { AdvancedAnalytics } from '../components/AdvancedAnalytics';

export default function Analytics() {
  return (
    <Box p={8}>
      <HStack justify="space-between" mb={6}>
        <Heading size="lg">التحليلات المتقدمة</Heading>
        <HStack spacing={4}>
          <Select placeholder="الفرع" maxW="200px">
            <option value="main">الفرع الرئيسي</option>
            <option value="branch1">الفرع الأول</option>
          </Select>
          <Select placeholder="الفترة" maxW="200px">
            <option value="today">اليوم</option>
            <option value="week">هذا الأسبوع</option>
            <option value="month">هذا الشهر</option>
          </Select>
        </HStack>
      </HStack>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={6}>
        <MetricCard
          title="إجمالي المبيعات"
          value="12,450 ريال"
          change={8.2}
        />
        <MetricCard
          title="عدد المعاملات"
          value="234"
          change={5.1}
        />
        <MetricCard
          title="متوسط قيمة الطلب"
          value="85 ريال"
          change={-2.3}
        />
        <MetricCard
          title="النقاط الممنوحة"
          value="2,345"
          change={12.5}
        />
      </SimpleGrid>

      <AdvancedAnalytics />
    </Box>
  );
}

const MetricCard = ({ title, value, change }: { 
  title: string;
  value: string;
  change: number;
}) => (
  <Card>
    <CardBody>
      <Text color="gray.500" fontSize="sm" mb={2}>{title}</Text>
      <Text fontSize="2xl" fontWeight="bold">{value}</Text>
      <Text 
        fontSize="sm" 
        color={change > 0 ? "green.500" : "red.500"}
      >
        {change > 0 ? '↑' : '↓'} {Math.abs(change)}%
      </Text>
    </CardBody>
  </Card>
);
