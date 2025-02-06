import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  Heading,
  SimpleGrid,
  Select,
  HStack,
  Spinner,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  ButtonGroup
} from '@chakra-ui/react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import api from '../../../services/api';

// تسجيل مكونات Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// تكوين المخطط
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        display: false
      }
    },
    y: {
      beginAtZero: true
    }
  },
  plugins: {
    legend: {
      position: 'top' as const,
    }
  }
};

// تحديث واجهة البيانات لتشمل جميع أنواع التقارير
interface ReportData {
  // بيانات تقرير المبيعات
  totalSales: number;
  totalCommissions: number;
  storeTransactions: Array<{
    id: number;
    name: string;
    totalSales: number;
    commission: number;
    transactionCount: number;
  }>;
  monthlyData: {
    labels: string[];
    sales: number[];
    commissions: number[];
  };
  // بيانات تقرير أداء المتاجر
  rankings?: Array<{
    rank: number;
    id: number;
    name: string;
    category: string;
    totalSales: number;
    totalPoints: number;
    transactionCount: number;
    avgTransactionAmount: number;
    commission: number;
  }>;
  // بيانات تقرير النقاط
  pointsStats?: Array<{
    storeName: string;
    userName: string;
    totalPoints: number;
    avgPoints: number;
    transactionCount: number;
  }>;
}

const SystemReports = () => {
  const [activeTab, setActiveTab] = useState('sales');
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [period, setPeriod] = useState('month');
  const toast = useToast();

  useEffect(() => {
    fetchReportData();
  }, [period, activeTab]);

  const fetchReportData = async () => {
    try {
      setIsLoading(true);
      let endpoint = '';
      switch (activeTab) {
        case 'sales':
          endpoint = '/api/admin/reports';
          break;
        case 'points':
          endpoint = '/api/admin/reports/points';
          break;
        case 'stores':
          endpoint = '/api/admin/reports/stores-performance';
          break;
        case 'transactions':
          endpoint = '/api/admin/reports/transactions';
          break;
      }
      const response = await api.get(`${endpoint}?period=${period}`);
      setReportData(response.data);
    } catch (error) {
      toast({
        title: "خطأ في جلب البيانات",
        status: "error",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Box display="flex" justifyContent="center" p={10}><Spinner /></Box>;
  }

  return (
    <Box p={4}>
      <HStack mb={6} justify="space-between">
        <Heading size="md">التقارير</Heading>
        <HStack spacing={4}>
          <Select
            w="200px"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option value="week">آخر أسبوع</option>
            <option value="month">آخر شهر</option>
            <option value="year">آخر سنة</option>
          </Select>
          <ButtonGroup>
            <Button
              colorScheme={activeTab === 'sales' ? 'blue' : 'gray'}
              onClick={() => setActiveTab('sales')}
            >
              المبيعات والعمولات
            </Button>
            <Button
              colorScheme={activeTab === 'points' ? 'blue' : 'gray'}
              onClick={() => setActiveTab('points')}
            >
              النقاط
            </Button>
            <Button
              colorScheme={activeTab === 'stores' ? 'blue' : 'gray'}
              onClick={() => setActiveTab('stores')}
            >
              أداء المتاجر
            </Button>
            <Button
              colorScheme={activeTab === 'transactions' ? 'blue' : 'gray'}
              onClick={() => setActiveTab('transactions')}
            >
              العمليات
            </Button>
          </ButtonGroup>
        </HStack>
      </HStack>

      {/* عرض التقارير حسب التبويب النشط */}
      {activeTab === 'sales' && (
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={6}>
          <Card>
            <CardHeader>
              <Heading size="sm">المبيعات والعمولات</Heading>
            </CardHeader>
            <CardBody>
              {reportData && (
                <Box h="300px">
                  <Line
                    options={chartOptions}
                    data={{
                      labels: reportData.monthlyData.labels,
                      datasets: [
                        {
                          label: 'المبيعات',
                          data: reportData.monthlyData.sales,
                          borderColor: 'rgb(53, 162, 235)',
                          backgroundColor: 'rgba(53, 162, 235, 0.5)',
                          tension: 0.4
                        },
                        {
                          label: 'العمولات',
                          data: reportData.monthlyData.commissions,
                          borderColor: 'rgb(75, 192, 192)',
                          backgroundColor: 'rgba(75, 192, 192, 0.5)',
                          tension: 0.4
                        },
                      ],
                    }}
                  />
                </Box>
              )}
            </CardBody>
          </Card>
        </SimpleGrid>
      )}

      {activeTab === 'points' && (
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
          <Card>
            <CardHeader>
              <Heading size="sm">توزيع النقاط حسب المتجر</Heading>
            </CardHeader>
            <CardBody>
              <Box h="300px">
                {/* Pie chart for points distribution */}
              </Box>
            </CardBody>
          </Card>
          {/* More points reports... */}
        </SimpleGrid>
      )}

      {activeTab === 'stores' && (
        <Card>
          <CardHeader>
            <Heading size="sm">ترتيب المتاجر</Heading>
          </CardHeader>
          <CardBody>
            <Table>
              <Thead>
                <Tr>
                  <Th>الترتيب</Th>
                  <Th>المتجر</Th>
                  <Th>التصنيف</Th>
                  <Th>المبيعات</Th>
                  <Th>النقاط</Th>
                  <Th>العمليات</Th>
                  <Th>متوسط العملية</Th>
                </Tr>
              </Thead>
              <Tbody>
                {reportData?.rankings?.map((store: any) => (
                  <Tr key={store.id}>
                    <Td>{store.rank}</Td>
                    <Td>{store.name}</Td>
                    <Td>{store.category}</Td>
                    <Td>{store.totalSales} ر.س</Td>
                    <Td>{store.totalPoints}</Td>
                    <Td>{store.transactionCount}</Td>
                    <Td>{store.avgTransactionAmount.toFixed(2)} ر.س</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </CardBody>
        </Card>
      )}

      <Card>
        <CardHeader>
          <Heading size="sm">تفاصيل العمليات</Heading>
        </CardHeader>
        <CardBody>
          <Table>
            <Thead>
              <Tr>
                <Th>المتجر</Th>
                <Th>إجمالي المبيعات</Th>
                <Th>العمولة</Th>
                <Th>عدد العمليات</Th>
                <Th>الإجراءات</Th>
              </Tr>
            </Thead>
            <Tbody>
              {reportData?.storeTransactions.map((store) => (
                <Tr key={store.id}>
                  <Td>{store.name}</Td>
                  <Td>{store.totalSales} ر.س</Td>
                  <Td>{store.commission} ر.س</Td>
                  <Td>{store.transactionCount}</Td>
                  <Td>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      onClick={() => window.location.href = `/admin/stores/${store.id}/transactions`}
                    >
                      التفاصيل
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </Box>
  );
};

export default SystemReports;
