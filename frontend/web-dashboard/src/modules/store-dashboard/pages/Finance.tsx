import React from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  Card,
  CardBody,
  Stack,
  Text,
  Divider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Button,
  HStack,
  Select,
} from '@chakra-ui/react';
import { FiDownload } from 'react-icons/fi';

export default function Finance() {
  const currentPeriod = {
    totalSales: 45678.90,
    commission: 2283.95, // 5% من المبيعات
    paidAmount: 1500,
    dueAmount: 783.95,
    dueDate: '2024/02/01',
  };

  const transactions = [
    {
      id: '1',
      date: '2024/01/20',
      description: 'عمولة شهر ديسمبر',
      amount: 1500,
      status: 'paid',
      reference: 'INV-001'
    },
    {
      id: '2',
      date: '2024/01/15',
      description: 'عمولة شهر نوفمبر',
      amount: 1350,
      status: 'paid',
      reference: 'INV-002'
    },
  ];

  return (
    <Box p={8}>
      <HStack justify="space-between" mb={6}>
        <Heading size="lg">التقارير المالية</Heading>
        <HStack spacing={4}>
          <Select placeholder="اختر الشهر" w="200px">
            <option value="1">يناير 2024</option>
            <option value="2">ديسمبر 2023</option>
          </Select>
          <Button leftIcon={<FiDownload />} variant="outline">
            تصدير التقرير
          </Button>
        </HStack>
      </HStack>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
        <Card>
          <CardBody>
            <Stack>
              <Text color="gray.500">إجمالي المبيعات</Text>
              <Text fontSize="2xl" fontWeight="bold">
                {currentPeriod.totalSales.toLocaleString()} ريال
              </Text>
            </Stack>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Stack>
              <Text color="gray.500">العمولة المستحقة (5%)</Text>
              <Text fontSize="2xl" fontWeight="bold" color="blue.500">
                {currentPeriod.commission.toLocaleString()} ريال
              </Text>
            </Stack>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Stack>
              <Text color="gray.500">المبلغ المدفوع</Text>
              <Text fontSize="2xl" fontWeight="bold" color="green.500">
                {currentPeriod.paidAmount.toLocaleString()} ريال
              </Text>
            </Stack>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Stack>
              <Text color="gray.500">المبلغ المستحق</Text>
              <Text fontSize="2xl" fontWeight="bold" color="red.500">
                {currentPeriod.dueAmount.toLocaleString()} ريال
              </Text>
              <Text fontSize="sm" color="gray.500">
                تاريخ الاستحقاق: {currentPeriod.dueDate}
              </Text>
            </Stack>
          </CardBody>
        </Card>
      </SimpleGrid>

      <Card>
        <CardBody>
          <Heading size="md" mb={4}>سجل المدفوعات</Heading>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>التاريخ</Th>
                <Th>الوصف</Th>
                <Th>رقم المرجع</Th>
                <Th>المبلغ</Th>
                <Th>الحالة</Th>
              </Tr>
            </Thead>
            <Tbody>
              {transactions.map(tx => (
                <Tr key={tx.id}>
                  <Td>{tx.date}</Td>
                  <Td>{tx.description}</Td>
                  <Td>{tx.reference}</Td>
                  <Td>{tx.amount.toLocaleString()} ريال</Td>
                  <Td>
                    <Badge colorScheme={tx.status === 'paid' ? 'green' : 'red'}>
                      {tx.status === 'paid' ? 'مدفوع' : 'غير مدفوع'}
                    </Badge>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </CardBody>
      </Card>

      <Card mt={6}>
        <CardBody>
          <Heading size="md" mb={4}>تفاصيل العمولة</Heading>
          <Text mb={4}>
            يتم احتساب العمولة بنسبة 5% من إجمالي المبيعات الشهرية
          </Text>
          <Divider mb={4} />
          <SimpleGrid columns={2} spacing={4}>
            <Box>
              <Text color="gray.500" mb={2}>طريقة الدفع</Text>
              <Text>تحويل بنكي</Text>
            </Box>
            <Box>
              <Text color="gray.500" mb={2}>دورة الفوترة</Text>
              <Text>شهرياً</Text>
            </Box>
          </SimpleGrid>
        </CardBody>
      </Card>
    </Box>
  );
}
