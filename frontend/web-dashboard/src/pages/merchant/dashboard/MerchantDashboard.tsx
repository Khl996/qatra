import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Icon,
  Text,
} from '@chakra-ui/react';
import { FiUsers, FiStar, FiDollarSign, FiShoppingBag } from 'react-icons/fi';
// تصحيح مسار الاستيراد
import LineChart from '../../../shared/components/ui/charts/LineChart';
// أو استخدام الاستيراد من ملف index
// import { LineChart } from '../../../shared/components/ui/charts';

const MerchantDashboard = () => {
  // للتأكد من عمل الصفحة
  console.log('Dashboard is rendering');

  // بيانات تجريبية
  type StatChangeType = 'increase' | 'decrease';
  const stats = [
    { label: 'إجمالي النقاط', value: '12,345', icon: FiStar, change: { value: 23, type: 'increase' as StatChangeType } },
    { label: 'العملاء النشطين', value: '432', icon: FiUsers, change: { value: 12, type: 'increase' as StatChangeType } },
    { label: 'المبيعات اليومية', value: '2,500 ر.س', icon: FiDollarSign, change: { value: 5, type: 'decrease' as StatChangeType } },
    { label: 'العروض النشطة', value: '6', icon: FiShoppingBag, change: { value: 8, type: 'increase' as StatChangeType } },
  ];

  const chartData = {
    labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
    datasets: [
      {
        label: 'المبيعات',
        data: [12, 19, 3, 5, 2, 3],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  // إضافة معالجة الأخطاء للرسم البياني
  const renderChart = () => {
    try {
      return <LineChart data={chartData} />;
    } catch (error) {
      console.error('Chart error:', error);
      return <Text>حدث خطأ في تحميل الرسم البياني</Text>;
    }
  };

  return (
    <Stack spacing={8}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardBody>
              <Stat>
                <StatLabel display="flex" alignItems="center">
                  <Icon as={stat.icon} mr={2} />
                  {stat.label}
                </StatLabel>
                <StatNumber>{stat.value}</StatNumber>
                <StatHelpText>
                  <StatArrow type={stat.change.type} />
                  {stat.change.value}%
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>

      <Card>
        <CardHeader>
          <Heading size="md">تحليل المبيعات</Heading>
        </CardHeader>
        <CardBody>
          <Box h="300px">
            {renderChart()}
          </Box>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <Heading size="md">آخر العمليات</Heading>
        </CardHeader>
        <CardBody>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>العميل</Th>
                <Th>النقاط</Th>
                <Th>المبلغ</Th>
                <Th>التاريخ</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>أحمد محمد</Td>
                <Td>150</Td>
                <Td>500 ر.س</Td>
                <Td>2024/01/23</Td>
              </Tr>
              {/* يمكن إضافة المزيد من الصفوف */}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </Stack>
  );
};

export default MerchantDashboard;
