import React from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Select,
  HStack,
  Grid
} from '@chakra-ui/react';
import { DashboardLayout } from '../../components/layouts/DashboardLayout';
import { StatCard } from '../../components/charts/StatCard';
import { PointsChart, StoresUsageChart } from '../../components/charts/AnalyticsCharts';

export default function ReportsPage() {
  const overallStats = [
    { title: 'إجمالي النقاط', value: '124,567', change: 12.5 },
    { title: 'عدد المتاجر النشطة', value: '234', change: 5.2 },
    { title: 'عدد المستخدمين', value: '5,678', change: 8.3 },
    { title: 'متوسط قيمة المعاملة', value: '157 ريال', change: -2.1 },
  ];

  return (
    <DashboardLayout>
      <Box p={8}>
        <HStack justify="space-between" mb={6}>
          <Heading size="lg">التقارير والإحصائيات</Heading>
          <Select width="200px" placeholder="اختر الفترة" defaultValue="month">
            <option value="week">آخر أسبوع</option>
            <option value="month">آخر شهر</option>
            <option value="quarter">آخر 3 شهور</option>
            <option value="year">آخر سنة</option>
          </Select>
        </HStack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
          {overallStats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </SimpleGrid>

        <Tabs>
          <TabList>
            <Tab>تحليل النقاط</Tab>
            <Tab>نشاط المتاجر</Tab>
            <Tab>تقارير العروض</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                <PointsChart />
                <StoresUsageChart />
              </Grid>
            </TabPanel>
            <TabPanel>
              {/* تحليلات المتاجر */}
            </TabPanel>
            <TabPanel>
              {/* تحليلات العروض */}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </DashboardLayout>
  );
}
