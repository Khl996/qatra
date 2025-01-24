import {
  Box,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  SimpleGrid,
  Select,
  HStack
} from '@chakra-ui/react';
import { useState } from 'react';
import LineChart from '../../../shared/components/ui/charts/LineChart';

const StatisticsPage = () => {
  const [period, setPeriod] = useState('month');

  const salesData = {
    labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
    datasets: [
      {
        label: 'المبيعات',
        data: [12000, 19000, 15000, 25000, 22000, 30000],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }
    ],
  };

  const pointsData = {
    labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
    datasets: [
      {
        label: 'النقاط المكتسبة',
        data: [1200, 1900, 1500, 2500, 2200, 3000],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      }
    ],
  };

  const customersData = {
    labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
    datasets: [
      {
        label: 'العملاء الجدد',
        data: [50, 65, 45, 70, 85, 90],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };

  return (
    <Stack spacing={6}>
      <Card>
        <CardHeader>
          <HStack justify="space-between">
            <Heading size="md">الإحصائيات</Heading>
            <Select
              maxW="200px"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
            >
              <option value="week">أسبوعي</option>
              <option value="month">شهري</option>
              <option value="year">سنوي</option>
            </Select>
          </HStack>
        </CardHeader>
      </Card>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
        <Card>
          <CardHeader>
            <Heading size="md">المبيعات</Heading>
          </CardHeader>
          <CardBody>
            <Box h="300px">
              <LineChart data={salesData} />
            </Box>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Heading size="md">النقاط</Heading>
          </CardHeader>
          <CardBody>
            <Box h="300px">
              <LineChart data={pointsData} />
            </Box>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Heading size="md">العملاء</Heading>
          </CardHeader>
          <CardBody>
            <Box h="300px">
              <LineChart data={customersData} />
            </Box>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Stack>
  );
};

export default StatisticsPage;
