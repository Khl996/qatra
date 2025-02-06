import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  Heading,
  SimpleGrid,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Spinner,
  Flex,
  Select,
  HStack,
} from '@chakra-ui/react';
import api from '../../../services/api';

interface FinanceStats {
  daily: {
    totalSales: number;
    totalCommission: number;
    transactionCount: number;
  };
  monthly: {
    totalSales: number;
    totalCommission: number;
    transactionCount: number;
  };
  yearly: {
    totalSales: number;
    totalCommission: number;
    transactionCount: number;
  };
}

interface Invoice {
  id: number;
  storeName: string;
  category: string;
  amount: number;
  commission: number;
  points: number;
  date: string;
  status: string;
}

const FinanceManagement = () => {
  const [stats, setStats] = useState<FinanceStats | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchFinanceData();
    fetchInvoices();
  }, [filter]);

  const fetchFinanceData = async () => {
    try {
      const response = await api.get('/api/admin/finance/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching finance stats:', error);
    }
  };

  const fetchInvoices = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/api/admin/finance/invoices?status=${filter}`);
      setInvoices(response.data.invoices || []);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Flex justify="center" align="center" minH="400px"><Spinner /></Flex>;
  }

  return (
    <Box p={4}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={6}>
        <Card>
          <CardHeader>
            <Heading size="sm">إحصائيات اليوم</Heading>
          </CardHeader>
          <CardBody>
            <Stat>
              <StatLabel>المبيعات</StatLabel>
              <StatNumber>{stats?.daily?.totalSales?.toFixed(2) || '0.00'} ر.س</StatNumber>
              <StatHelpText>
                العمولات: {stats?.daily?.totalCommission?.toFixed(2) || '0.00'} ر.س
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Heading size="sm">إحصائيات الشهر</Heading>
          </CardHeader>
          <CardBody>
            <Stat>
              <StatLabel>المبيعات</StatLabel>
              <StatNumber>{stats?.monthly?.totalSales?.toFixed(2) || '0.00'} ر.س</StatNumber>
              <StatHelpText>
                العمولات: {stats?.monthly?.totalCommission?.toFixed(2) || '0.00'} ر.س
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Heading size="sm">إحصائيات السنة</Heading>
          </CardHeader>
          <CardBody>
            <Stat>
              <StatLabel>المبيعات</StatLabel>
              <StatNumber>{stats?.yearly?.totalSales?.toFixed(2) || '0.00'} ر.س</StatNumber>
              <StatHelpText>
                العمولات: {stats?.yearly?.totalCommission?.toFixed(2) || '0.00'} ر.س
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
      </SimpleGrid>

      <Card>
        <CardHeader>
          <HStack justify="space-between">
            <Heading size="md">الفواتير</Heading>
            <Select
              w="200px"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">جميع الفواتير</option>
              <option value="pending">قيد المعالجة</option>
              <option value="completed">مكتملة</option>
              <option value="cancelled">ملغية</option>
            </Select>
          </HStack>
        </CardHeader>
        <CardBody>
          {invoices.length > 0 ? (
            <Table>
              <Thead>
                <Tr>
                  <Th>المتجر</Th>
                  <Th>التصنيف</Th>
                  <Th>المبلغ</Th>
                  <Th>العمولة</Th>
                  <Th>النقاط</Th>
                  <Th>التاريخ</Th>
                  <Th>الحالة</Th>
                </Tr>
              </Thead>
              <Tbody>
                {invoices.map((invoice) => (
                  <Tr key={invoice.id}>
                    <Td>{invoice.storeName}</Td>
                    <Td>{invoice.category}</Td>
                    <Td>{(invoice.amount || 0).toFixed(2)} ر.س</Td>
                    <Td>{(invoice.commission || 0).toFixed(2)} ر.س</Td>
                    <Td>{invoice.points || 0}</Td>
                    <Td>{new Date(invoice.date).toLocaleDateString('ar-SA')}</Td>
                    <Td>
                      <Badge
                        colorScheme={
                          invoice.status === 'completed' ? 'green' :
                          invoice.status === 'pending' ? 'yellow' : 'red'
                        }
                      >
                        {invoice.status === 'completed' ? 'مكتملة' :
                         invoice.status === 'pending' ? 'قيد المعالجة' : 'ملغية'}
                      </Badge>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          ) : (
            <Text textAlign="center" color="gray.500" py={4}>
              لا توجد فواتير للعرض
            </Text>
          )}
        </CardBody>
      </Card>
    </Box>
  );
};

export default FinanceManagement;
