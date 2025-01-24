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
  HStack, // إضافة
  Button, // إضافة
  Badge, // إضافة
} from '@chakra-ui/react';
import { FiShoppingBag, FiUsers, FiDollarSign, FiCheckCircle } from 'react-icons/fi';
import { LineChart } from '../../../shared/components/ui/charts';

const AdminDashboard = () => {
  // بيانات تجريبية للإحصائيات
  const stats = [
    {
      label: 'إجمالي المتاجر',
      value: '156',
      icon: FiShoppingBag,
      change: { value: 12, type: 'increase' as const }
    },
    {
      label: 'المستخدمين النشطين',
      value: '2,453',
      icon: FiUsers,
      change: { value: 8, type: 'increase' as const }
    },
    {
      label: 'إجمالي العمولات',
      value: '45,650 ر.س',
      icon: FiDollarSign,
      change: { value: 15, type: 'increase' as const }
    },
    {
      label: 'طلبات الانضمام',
      value: '4',
      icon: FiCheckCircle,
      change: { value: 2, type: 'decrease' as const }
    }
  ];

  // بيانات تجريبية للرسم البياني
  const chartData = {
    labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
    datasets: [
      {
        label: 'العمولات الشهرية',
        data: [12000, 19000, 15000, 25000, 22000, 30000],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }
    ],
  };

  // بيانات تجريبية لطلبات الانضمام
  const joinRequests = [
    {
      id: 1,
      storeName: 'مطعم السعادة',
      type: 'مطعم',
      date: '2024-01-23',
      status: 'pending'
    },
    {
      id: 2,
      storeName: 'قهوة المختصين',
      type: 'مقهى',
      date: '2024-01-22',
      status: 'pending'
    }
  ];

  return (
    <Stack spacing={8}>
      {/* إحصائيات سريعة */}
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
                  {stat.change.value}% مقارنة بالشهر السابق
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>

      {/* تحليل العمولات */}
      <Card>
        <CardHeader>
          <Heading size="md">تحليل العمولات</Heading>
        </CardHeader>
        <CardBody>
          <Box h="300px">
            <LineChart data={chartData} />
          </Box>
        </CardBody>
      </Card>

      {/* طلبات الانضمام الجديدة */}
      <Card>
        <CardHeader>
          <HStack justify="space-between">
            <Heading size="md">طلبات الانضمام الجديدة</Heading>
            <Button size="sm" colorScheme="blue">
              عرض الكل
            </Button>
          </HStack>
        </CardHeader>
        <CardBody>
          <Table>
            <Thead>
              <Tr>
                <Th>اسم المتجر</Th>
                <Th>النوع</Th>
                <Th>تاريخ الطلب</Th>
                <Th>الحالة</Th>
                <Th>الإجراءات</Th>
              </Tr>
            </Thead>
            <Tbody>
              {joinRequests.map((request) => (
                <Tr key={request.id}>
                  <Td>{request.storeName}</Td>
                  <Td>{request.type}</Td>
                  <Td>{request.date}</Td>
                  <Td>
                    <Badge colorScheme="yellow">قيد المراجعة</Badge>
                  </Td>
                  <Td>
                    <HStack spacing={2}>
                      <Button size="sm" colorScheme="green">
                        قبول
                      </Button>
                      <Button size="sm" colorScheme="red" variant="outline">
                        رفض
                      </Button>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </Stack>
  );
};

export default AdminDashboard;
