import React, { useState } from 'react';
import {
  Box,
  Heading,
  Card,
  CardBody,
  SimpleGrid,
  HStack,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
import { FiDownload } from 'react-icons/fi';
import { SalesChart } from '../components/SalesChart';
import { ProductsTable } from '../components/ProductsTable';
import { CustomerSegments } from '../components/CustomerSegments';

export default function SalesReports() {
  const [dateRange, setDateRange] = useState('month');
  const [reportType, setReportType] = useState('daily');

  return (
    <Box p={8}>
      <HStack justify="space-between" mb={6}>
        <Heading size="lg">تقارير المبيعات</Heading>
        <HStack spacing={4}>
          <Select 
            value={dateRange} 
            onChange={(e) => setDateRange(e.target.value)}
            w="200px"
          >
            <option value="week">آخر أسبوع</option>
            <option value="month">آخر شهر</option>
            <option value="quarter">آخر 3 شهور</option>
            <option value="year">آخر سنة</option>
          </Select>
          <Button leftIcon={<FiDownload />}>تصدير التقرير</Button>
        </HStack>
      </HStack>

      <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={6} mb={6}>
        <SalesMetricCard 
          title="إجمالي المبيعات"
          value="45,678 ريال"
          change={12.5}
        />
        <SalesMetricCard 
          title="متوسط قيمة الطلب"
          value="157 ريال"
          change={-2.3}
        />
        <SalesMetricCard 
          title="عدد المعاملات"
          value="290"
          change={8.7}
        />
      </SimpleGrid>

      <Tabs>
        <TabList>
          <Tab>تحليل المبيعات</Tab>
          <Tab>المنتجات الأكثر مبيعاً</Tab>
          <Tab>شرائح العملاء</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Card>
              <CardBody>
                <HStack justify="space-between" mb={4}>
                  <Select 
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    w="200px"
                  >
                    <option value="daily">يومي</option>
                    <option value="weekly">أسبوعي</option>
                    <option value="monthly">شهري</option>
                  </Select>
                </HStack>
                <Box h="400px">
                  <SalesChart type={reportType} dateRange={dateRange} />
                </Box>
              </CardBody>
            </Card>
          </TabPanel>

          <TabPanel>
            <ProductsTable />
          </TabPanel>

          <TabPanel>
            <CustomerSegments />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

const SalesMetricCard = ({ 
  title, 
  value, 
  change 
}: { 
  title: string; 
  value: string; 
  change: number; 
}) => (
  <Card>
    <CardBody>
      <Box>
        <Text color="gray.500">{title}</Text>
        <Text fontSize="2xl" fontWeight="bold" mt={2}>
          {value}
        </Text>
        <Text 
          fontSize="sm" 
          color={change > 0 ? 'green.500' : 'red.500'}
          mt={1}
        >
          {change > 0 ? '↑' : '↓'} {Math.abs(change)}%
        </Text>
      </Box>
    </CardBody>
  </Card>
);
