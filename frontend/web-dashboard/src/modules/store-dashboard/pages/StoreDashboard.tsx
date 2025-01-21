import React from 'react';
import {
  Box,
  SimpleGrid,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Card,
  CardBody,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
} from '@chakra-ui/react';

export default function StoreDashboard() {
  const stats = [
    { label: 'رصيد النقاط', value: '12,345', change: 23.36 },
    { label: 'العملاء النشطين', value: '234', change: 12.5 },
    { label: 'العروض النشطة', value: '8', change: -2.3 },
    { label: 'إجمالي المبيعات', value: '45,678 ريال', change: 8.32 },
  ];

  const recentTransactions = [
    { id: '1', customer: 'أحمد محمد', points: 100, amount: '500 ريال', date: '2024/01/21' },
    { id: '2', customer: 'سارة علي', points: 50, amount: '250 ريال', date: '2024/01/21' },
    // ... المزيد من المعاملات
  ];

  return (
    <Box p={8}>
      <Heading mb={6}>لوحة التحكم</Heading>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardBody>
              <Stat>
                <StatLabel>{stat.label}</StatLabel>
                <StatNumber>{stat.value}</StatNumber>
                <StatHelpText>
                  <StatArrow type={stat.change > 0 ? 'increase' : 'decrease'} />
                  {Math.abs(stat.change)}%
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>

      <Card>
        <CardBody>
          <Heading size="md" mb={4}>آخر المعاملات</Heading>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>العميل</Th>
                <Th>النقاط</Th>
                <Th>المبلغ</Th>
                <Th>التاريخ</Th>
                <Th>الحالة</Th>
              </Tr>
            </Thead>
            <Tbody>
              {recentTransactions.map((tx) => (
                <Tr key={tx.id}>
                  <Td>{tx.customer}</Td>
                  <Td>{tx.points}</Td>
                  <Td>{tx.amount}</Td>
                  <Td>{tx.date}</Td>
                  <Td>
                    <Badge colorScheme="green">تم</Badge>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </Box>
  );
}
