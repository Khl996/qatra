import React from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  Card,
  CardBody,
  Text,
  VStack,
  HStack,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Icon,
} from '@chakra-ui/react';
import { FiDownload, FiFilter } from 'react-icons/fi';

export default function DetailedReports() {
  return (
    <Box p={8}>
      <HStack justify="space-between" mb={6}>
        <Heading size="lg">التقارير التفصيلية</Heading>
        <HStack spacing={4}>
          <Select placeholder="نوع التقرير" w="200px">
            <option value="sales">المبيعات</option>
            <option value="points">النقاط</option>
            <option value="customers">العملاء</option>
          </Select>
          <Button leftIcon={<FiDownload />}>تصدير التقرير</Button>
        </HStack>
      </HStack>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mb={8}>
        <Card>
          <CardBody>
            <VStack align="start">
              <Text color="gray.500">إجمالي المبيعات</Text>
              <Text fontSize="2xl" fontWeight="bold">45,678 ريال</Text>
              <Text color="green.500" fontSize="sm">+12.5% عن الشهر السابق</Text>
            </VStack>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <VStack align="start">
              <Text color="gray.500">النقاط الممنوحة</Text>
              <Text fontSize="2xl" fontWeight="bold">2,345</Text>
              <Text color="green.500" fontSize="sm">+8.3% عن الشهر السابق</Text>
            </VStack>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <VStack align="start">
              <Text color="gray.500">النقاط المستبدلة</Text>
              <Text fontSize="2xl" fontWeight="bold">1,234</Text>
              <Text color="red.500" fontSize="sm">-2.1% عن الشهر السابق</Text>
            </VStack>
          </CardBody>
        </Card>
      </SimpleGrid>

      <Card>
        <CardBody>
          <HStack justify="space-between" mb={4}>
            <Text fontSize="lg" fontWeight="bold">تفاصيل المعاملات</Text>
            <Button leftIcon={<FiFilter />} variant="ghost">
              تصفية
            </Button>
          </HStack>

          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>التاريخ</Th>
                <Th>العميل</Th>
                <Th>المبلغ</Th>
                <Th>النقاط</Th>
                <Th>النوع</Th>
              </Tr>
            </Thead>
            <Tbody>
              {/* سيتم إضافة بيانات المعاملات هنا */}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </Box>
  );
}
