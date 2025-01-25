import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  HStack,
  Button,
  Badge,
} from '@chakra-ui/react';
import { FiShoppingBag, FiUsers, FiDollarSign, FiCheckCircle } from 'react-icons/fi';
import { LineChart } from '../../../shared/components/ui/charts';
import { JoinRequestModal } from '../../../shared/components/modals/dashboard/JoinRequestModal';

// إضافة واجهة للطلب
interface JoinRequest {
  id: number;
  storeName: string;
  type: string;
  date: string;
  status: string;
  // يمكن إضافة المزيد من الحقول حسب الحاجة
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [selectedRequest, setSelectedRequest] = useState<JoinRequest | null>(null);
  const [isJoinRequestModalOpen, setIsJoinRequestModalOpen] = useState(false);

  // بيانات تجريبية للإحصائيات
  const stats = [
    {
      label: 'إجمالي المتاجر',
      value: '156',
      icon: FiShoppingBag,
      change: { value: 12, type: 'increase' as const },
      section: 'stores'
    },
    {
      label: 'المستخدمين النشطين',
      value: '2,453',
      icon: FiUsers,
      change: { value: 8, type: 'increase' as const },
      section: 'users'
    },
    {
      label: 'إجمالي العمولات',
      value: '45,650 ر.س',
      icon: FiDollarSign,
      change: { value: 15, type: 'increase' as const },
      section: 'finance'
    },
    {
      label: 'طلبات الانضمام',
      value: '4',
      icon: FiCheckCircle,
      change: { value: 2, type: 'decrease' as const },
      section: 'stores'
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
  const joinRequests: JoinRequest[] = [
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

  // معالجة الطلبات
  const handleAcceptRequest = async (id: number) => {
    try {
      // TODO: تنفيذ قبول الطلب
      setIsJoinRequestModalOpen(false);
      // تحديث القائمة
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  const handleRejectRequest = async (id: number) => {
    try {
      // TODO: تنفيذ رفض الطلب
      setIsJoinRequestModalOpen(false);
      // تحديث القائمة
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  // التنقل إلى الصفحات
  const navigateToSection = (section: string) => {
    switch (section) {
      case 'stores':
        navigate('/admin/stores');
        break;
      case 'users':
        navigate('/admin/users');
        break;
      case 'finance':
        navigate('/admin/finance');
        break;
      default:
        break;
    }
  };

  return (
    <Stack spacing={8}>
      {/* البطاقات الإحصائية مع إضافة التنقل */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
        {stats.map((stat) => (
          <Card 
            key={stat.label} 
            cursor="pointer"
            onClick={() => navigateToSection(stat.section)}
            _hover={{ transform: 'translateY(-2px)', shadow: 'md' }}
            transition="all 0.2s"
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

      {/* جدول طلبات الانضمام مع التفاعل */}
      <Card>
        <CardHeader>
          <HStack justify="space-between">
            <Heading size="md">طلبات الانضمام الجديدة</Heading>
            <Button 
              size="sm" 
              colorScheme="blue"
              onClick={() => navigate('/admin/stores?filter=pending')}
            >
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
                <Tr 
                  key={request.id}
                  cursor="pointer"
                  _hover={{ bg: 'gray.50' }}
                  onClick={() => {
                    setSelectedRequest(request);
                    setIsJoinRequestModalOpen(true);
                  }}
                >
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

      {/* إضافة المودال */}
      <JoinRequestModal
        isOpen={isJoinRequestModalOpen}
        onClose={() => setIsJoinRequestModalOpen(false)}
        request={selectedRequest}
        onAccept={handleAcceptRequest}
        onReject={handleRejectRequest}
      />
    </Stack>
  );
};

export default AdminDashboard;
