import { useEffect, useState } from 'react';
import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Skeleton,
  useToast
} from '@chakra-ui/react';
import merchantApi from '../../../services/api/merchant';

interface PointsHistory {
  id: string;
  customerId: string;
  customerName: string;
  points: number;
  type: 'add' | 'redeem';
  date: string;
}

const defaultHistory: PointsHistory[] = [];

const MerchantPoints = () => {
  const [history, setHistory] = useState<PointsHistory[]>(defaultHistory);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    fetchPointsHistory();
  }, []);

  const fetchPointsHistory = async () => {
    try {
      setIsLoading(true);
      const data = await merchantApi.getPointsHistory();
      setHistory(data.history || defaultHistory);
    } catch (error) {
      toast({
        title: 'خطأ في جلب سجل النقاط',
        status: 'error',
        duration: 3000,
      });
      setHistory(defaultHistory);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box p={5}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5} mb={5}>
        {/* إحصائيات النقاط */}
      </SimpleGrid>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>العميل</Th>
            <Th>النقاط</Th>
            <Th>النوع</Th>
            <Th>التاريخ</Th>
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
              </Tr>
            ))
          ) : history.length ? (
            history.map(record => (
              <Tr key={record.id}>
                <Td>{record.customerName}</Td>
                <Td>{record.points}</Td>
                <Td>{record.type === 'add' ? 'إضافة' : 'استبدال'}</Td>
                <Td>{new Date(record.date).toLocaleDateString('ar-SA')}</Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={4} textAlign="center">لا يوجد سجل للنقاط</Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </Box>
  );
};

export default MerchantPoints;
