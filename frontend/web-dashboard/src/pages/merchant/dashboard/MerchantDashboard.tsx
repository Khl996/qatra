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
  HStack,
  Button,
} from '@chakra-ui/react';
import { FiUsers, FiStar, FiDollarSign, FiShoppingBag, FiTag, FiBarChart2, FiFileText } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { LineChart } from '../../../shared/components/ui/charts';

const MerchantDashboard = () => {
  const navigate = useNavigate();

  // بيانات تجريبية
  const stats = [
    { 
      label: 'إجمالي النقاط', 
      value: '12,345', 
      icon: FiStar, 
      change: { value: 23, type: 'increase' as const },
      path: '/merchant/points',
      color: 'blue.500'
    },
    { label: 'العملاء النشطين', value: '432', icon: FiUsers, change: { value: 12, type: 'increase' as const }, path: '/merchant/customers' },
    { label: 'المبيعات اليومية', value: '2,500 ر.س', icon: FiDollarSign, change: { value: 5, type: 'decrease' as const }, path: '/merchant/sales' },
    { label: 'العروض النشطة', value: '6', icon: FiShoppingBag, change: { value: 8, type: 'increase' as const }, path: '/merchant/offers' },
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

  // تحديث التنقلات للصفحات الموجودة
  const quickActions = [
    {
      icon: FiStar,
      label: 'إدارة النقاط',
      path: '/merchant/points',
      colorScheme: 'blue'
    },
    {
      icon: FiTag,
      label: 'إدارة العروض',
      path: '/merchant/offers',
      colorScheme: 'green'
    },
    {
      icon: FiFileText,
      label: 'التقارير',
      path: '/merchant/reports',
      colorScheme: 'purple',
      variant: 'outline'
    }
  ];

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
          <Card 
            key={stat.label} 
            cursor="pointer"
            onClick={() => navigate(stat.path)}
            _hover={{ 
              transform: 'translateY(-2px)', 
              shadow: 'md',
              borderColor: stat.color 
            }}
            transition="all 0.2s"
            borderWidth="1px"
            borderColor="transparent"
          >
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

      {/* أزرار الوصول السريع محدثة */}
      <HStack spacing={4}>
        {quickActions.map((action) => (
          <Button
            key={action.path}
            leftIcon={<Icon as={action.icon} />}
            colorScheme={action.colorScheme}
            variant={action.variant}
            onClick={() => navigate(action.path)}
            _hover={{
              transform: 'translateY(-2px)',
              shadow: 'md'
            }}
            transition="all 0.2s"
          >
            {action.label}
          </Button>
        ))}
      </HStack>

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
