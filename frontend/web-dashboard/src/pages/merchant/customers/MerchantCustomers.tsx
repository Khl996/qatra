import { useEffect, useState } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Skeleton,
  useToast,
  Text,
  Flex,
  Button
} from '@chakra-ui/react';
import merchantApi from '../../../services/api/merchant';

interface Customer {
  id: string;
  name: string;
  phone: string;
  totalPoints: number;
  lastVisit: string;
}

const defaultCustomers: Customer[] = [];

const MerchantCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>(defaultCustomers);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setIsLoading(true);
      const data = await merchantApi.getCustomers();
      setCustomers(data.customers || defaultCustomers);
    } catch (error) {
      toast({
        title: 'خطأ في جلب بيانات العملاء',
        status: 'error',
        duration: 3000,
      });
      setCustomers(defaultCustomers);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box p={5}>
      <Flex justify="space-between" mb={5}>
        <Text fontSize="2xl" fontWeight="bold">قائمة العملاء</Text>
        <Button colorScheme="blue">إضافة نقاط</Button>
      </Flex>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>اسم العميل</Th>
            <Th>رقم الجوال</Th>
            <Th>النقاط</Th>
            <Th>آخر زيارة</Th>
            <Th>الإجراءات</Th>
          </Tr>
        </Thead>
        <Tbody>
          {isLoading ? (
            [...Array(5)].map((_, i) => (
              <Tr key={i}>
                <Td><Skeleton height="20px" /></Td>
                <Td><Skeleton height="20px" /></Td>
                <Td><Skeleton height="20px" /></Td>
                <Td><Skeleton height="20px" /></Td>
                <Td><Skeleton height="20px" /></Td>
              </Tr>
            ))
          ) : customers.length ? (
            customers.map(customer => (
              <Tr key={customer.id}>
                <Td>{customer.name}</Td>
                <Td>{customer.phone}</Td>
                <Td>{customer.totalPoints}</Td>
                <Td>{new Date(customer.lastVisit).toLocaleDateString('ar-SA')}</Td>
                <Td>
                  <Button size="sm" colorScheme="blue" mr={2}>إضافة نقاط</Button>
                  <Button size="sm">التفاصيل</Button>
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={5} textAlign="center">لا يوجد عملاء</Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </Box>
  );
};

export default MerchantCustomers;
