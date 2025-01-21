import React from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  Card,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  HStack,
  Select,
} from '@chakra-ui/react';

export default function SalesTracking() {
  const stats = [
    { label: 'المبيعات اليومية', value: '2,450 ريال', change: 12.5 },
    { label: 'النقاط الممنوحة', value: '450', change: 8.2 },
    { label: 'النقاط المستبدلة', value: '120', change: -2.5 },
    { label: 'عدد المعاملات', value: '24', change: 15.3 },
  ];

  const recentTransactions = [
    {
      id: '1',
      customer: 'أحمد محمد',
      amount: '150 ريال',
      points: '+30',
      date: '2024/01/21 12:30',
      type: 'purchase',
    },
    // ... المزيد من المعاملات
  ];

  return (
    <Box p={8}>
      <HStack justify="space-between" mb={6}>
        <Heading size="lg">تتبع المبيعات والنقاط</Heading>
        <Select width="200px" defaultValue="today">
          <option value="today">اليوم</option>
          <option value="week">هذا الأسبوع</option>
          <option value="month">هذا الشهر</option>
        </Select>
      </HStack>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
        {stats.map(stat => (
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
                <Th>المبلغ</Th>
                <Th>النقاط</Th>
                <Th>التاريخ</Th>
                <Th>النوع</Th>
              </Tr>
            </Thead>
            <Tbody>
              {recentTransactions.map(tx => (
                <Tr key={tx.id}>
                  <Td>{tx.customer}</Td>
                  <Td>{tx.amount}</Td>
                  <Td color={tx.points.startsWith('+') ? 'green.500' : 'red.500'}>
                    {tx.points}
                  </Td>
                  <Td>{tx.date}</Td>
                  <Td>{tx.type === 'purchase' ? 'مشتريات' : 'استبدال'}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </Box>
  );
}
