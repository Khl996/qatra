import React from 'react';
import {
  Box,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Avatar,
  Badge,
  Card,
  CardBody,
  Text,
  Button,
} from '@chakra-ui/react';
import { FiSearch, FiUserPlus } from 'react-icons/fi';

export default function CustomersPage() {
  const customers = [
    {
      id: '1',
      name: 'أحمد محمد',
      phone: '0512345678',
      points: 450,
      totalSpent: '2,345 ريال',
      visits: 12,
      lastVisit: '2024/01/20',
      status: 'active'
    },
    // ... المزيد من العملاء
  ];

  return (
    <Box p={8}>
      <HStack justify="space-between" mb={6}>
        <Heading size="lg">إدارة العملاء</Heading>
        <Button leftIcon={<FiUserPlus />} colorScheme="blue">
          إضافة عميل
        </Button>
      </HStack>

      <HStack spacing={4} mb={6}>
        <InputGroup maxW="320px">
          <InputLeftElement pointerEvents="none">
            <FiSearch />
          </InputLeftElement>
          <Input placeholder="بحث عن عميل..." />
        </InputGroup>
        <Select placeholder="تصفية حسب" maxW="200px">
          <option value="active">نشط</option>
          <option value="inactive">غير نشط</option>
          <option value="vip">VIP</option>
        </Select>
      </HStack>

      <Card mb={6}>
        <CardBody>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>العميل</Th>
                <Th>رقم الجوال</Th>
                <Th>النقاط</Th>
                <Th>إجمالي المشتريات</Th>
                <Th>عدد الزيارات</Th>
                <Th>آخر زيارة</Th>
                <Th>الحالة</Th>
              </Tr>
            </Thead>
            <Tbody>
              {customers.map((customer) => (
                <Tr key={customer.id}>
                  <Td>
                    <HStack>
                      <Avatar size="sm" name={customer.name} />
                      <Text>{customer.name}</Text>
                    </HStack>
                  </Td>
                  <Td>{customer.phone}</Td>
                  <Td color="blue.500" fontWeight="bold">
                    {customer.points}
                  </Td>
                  <Td>{customer.totalSpent}</Td>
                  <Td>{customer.visits}</Td>
                  <Td>{customer.lastVisit}</Td>
                  <Td>
                    <Badge colorScheme={customer.status === 'active' ? 'green' : 'red'}>
                      {customer.status === 'active' ? 'نشط' : 'غير نشط'}
                    </Badge>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            إحصائيات العملاء
          </Text>
          <SimpleGrid columns={4} spacing={4}>
            <Stat title="إجمالي العملاء" value="234" />
            <Stat title="العملاء النشطين" value="189" />
            <Stat title="متوسط النقاط" value="320" />
            <Stat title="معدل الزيارات" value="8.5" subtitle="شهرياً" />
          </SimpleGrid>
        </CardBody>
      </Card>
    </Box>
  );
}

const Stat = ({ title, value, subtitle }: { title: string; value: string; subtitle?: string }) => (
  <Box p={4} bg="gray.50" borderRadius="lg">
    <Text color="gray.600" fontSize="sm">{title}</Text>
    <Text fontSize="2xl" fontWeight="bold">{value}</Text>
    {subtitle && <Text fontSize="sm" color="gray.500">{subtitle}</Text>}
  </Box>
);
