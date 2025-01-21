import React from 'react';
import {
  Box,
  Heading,
  Card,
  CardBody,
  Stack,
  SimpleGrid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  HStack,
  Select,
  Text,
  Divider,
} from '@chakra-ui/react';
import { FiDownload, FiPrinter } from 'react-icons/fi';

export default function TaxReports() {
  const taxSummary = {
    totalSales: 45678.90,
    totalCommission: 2283.95,
    vatAmount: 342.59,
    totalDue: 2626.54,
    period: 'يناير 2024'
  };

  const monthlyBreakdown = [
    {
      id: '1',
      date: '2024/01',
      sales: 45678.90,
      commission: 2283.95,
      vat: 342.59,
      total: 2626.54,
      status: 'paid'
    },
    // ... المزيد من البيانات
  ];

  return (
    <Box p={8}>
      <HStack justify="space-between" mb={6}>
        <Heading size="lg">التقارير الضريبية</Heading>
        <HStack spacing={4}>
          <Select placeholder="اختر الفترة" w="200px">
            <option value="2024-Q1">الربع الأول 2024</option>
            <option value="2023-Q4">الربع الرابع 2023</option>
          </Select>
          <Button leftIcon={<FiPrinter />}>طباعة</Button>
          <Button leftIcon={<FiDownload />}>تصدير PDF</Button>
        </HStack>
      </HStack>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
        <Card>
          <CardBody>
            <Stack>
              <Text color="gray.500">إجمالي المبيعات</Text>
              <Text fontSize="2xl" fontWeight="bold">
                {taxSummary.totalSales.toLocaleString()} ريال
              </Text>
            </Stack>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Stack>
              <Text color="gray.500">إجمالي العمولة</Text>
              <Text fontSize="2xl" fontWeight="bold">
                {taxSummary.totalCommission.toLocaleString()} ريال
              </Text>
            </Stack>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Stack>
              <Text color="gray.500">ضريبة القيمة المضافة</Text>
              <Text fontSize="2xl" fontWeight="bold">
                {taxSummary.vatAmount.toLocaleString()} ريال
              </Text>
            </Stack>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Stack>
              <Text color="gray.500">الإجمالي المستحق</Text>
              <Text fontSize="2xl" fontWeight="bold" color="blue.500">
                {taxSummary.totalDue.toLocaleString()} ريال
              </Text>
            </Stack>
          </CardBody>
        </Card>
      </SimpleGrid>

      <Card>
        <CardBody>
          <Heading size="md" mb={4}>التفصيل الشهري</Heading>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>الفترة</Th>
                <Th>المبيعات</Th>
                <Th>العمولة</Th>
                <Th>الضريبة</Th>
                <Th>الإجمالي</Th>
                <Th>الحالة</Th>
                <Th>الفاتورة</Th>
              </Tr>
            </Thead>
            <Tbody>
              {monthlyBreakdown.map(month => (
                <Tr key={month.id}>
                  <Td>{month.date}</Td>
                  <Td>{month.sales.toLocaleString()} ريال</Td>
                  <Td>{month.commission.toLocaleString()} ريال</Td>
                  <Td>{month.vat.toLocaleString()} ريال</Td>
                  <Td fontWeight="bold">{month.total.toLocaleString()} ريال</Td>
                  <Td>
                    <Text color={month.status === 'paid' ? 'green.500' : 'red.500'}>
                      {month.status === 'paid' ? 'مدفوع' : 'غير مدفوع'}
                    </Text>
                  </Td>
                  <Td>
                    <Button size="sm" variant="outline">
                      عرض الفاتورة
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </CardBody>
      </Card>

      <Card mt={6}>
        <CardBody>
          <Heading size="md" mb={4}>ملاحظات ضريبية</Heading>
          <Text mb={2}>- يتم احتساب ضريبة القيمة المضافة 15% على إجمالي العمولة</Text>
          <Text mb={2}>- يجب الاحتفاظ بالفواتير الضريبية لمدة 5 سنوات</Text>
          <Text>- يتم إصدار الفواتير الضريبية شهرياً</Text>
        </CardBody>
      </Card>
    </Box>
  );
}
