import React from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Card,
  CardBody,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  HStack,
  Badge,
} from '@chakra-ui/react';
import { DashboardLayout } from '../../../components/layouts/DashboardLayout';
import { DataTable } from '../../../components/tables/DataTable';
import { FiEdit2 } from 'react-icons/fi';
import { useRouter } from 'next/router';

export default function StoreDetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  // مثال لبيانات المتجر
  const storeStats = [
    { label: 'إجمالي النقاط', value: '12,345' },
    { label: 'عدد العملاء', value: '234' },
    { label: 'عدد المعاملات', value: '1,234' },
    { label: 'معدل التقييم', value: '4.8' },
  ];

  const transactionsColumns = [
    { key: 'date', header: 'التاريخ' },
    { key: 'customer', header: 'العميل' },
    { key: 'points', header: 'النقاط' },
    { key: 'amount', header: 'المبلغ' },
  ];

  // بيانات تجريبية للمعاملات
  const transactions = [
    {
      date: '2024/01/21',
      customer: 'محمد أحمد',
      points: 100,
      amount: '500 ريال',
    },
    // ... المزيد من المعاملات
  ];

  return (
    <DashboardLayout>
      <Box p={8}>
        <HStack justify="space-between" mb={6}>
          <Heading size="lg">تفاصيل المتجر</Heading>
          <Button
            leftIcon={<FiEdit2 />}
            colorScheme="blue"
            onClick={() => router.push(`/stores/${id}/edit`)}
          >
            تعديل
          </Button>
        </HStack>

        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6} mb={8}>
          {storeStats.map((stat) => (
            <Card key={stat.label}>
              <CardBody>
                <Stat>
                  <StatLabel>{stat.label}</StatLabel>
                  <StatNumber>{stat.value}</StatNumber>
                </Stat>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>

        <Tabs>
          <TabList>
            <Tab>المعاملات</Tab>
            <Tab>العملاء</Tab>
            <Tab>التقييمات</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <DataTable
                columns={transactionsColumns}
                data={transactions}
              />
            </TabPanel>
            <TabPanel>
              {/* محتوى تب العملاء */}
            </TabPanel>
            <TabPanel>
              {/* محتوى تب التقييمات */}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </DashboardLayout>
  );
}
