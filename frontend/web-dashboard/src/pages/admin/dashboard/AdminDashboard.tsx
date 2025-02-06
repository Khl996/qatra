import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Flex,
  Icon,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Badge,
  Spinner,
  useToast
} from '@chakra-ui/react';
import { FiUsers, FiShoppingBag, FiDollarSign, FiStar } from 'react-icons/fi';
import api from '../../../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [recentStores, setRecentStores] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const [statsRes, storesRes] = await Promise.all([
          api.get('/api/admin/dashboard/stats'),
          api.get('/api/admin/stores?limit=5')
        ]);
        
        console.log('Stats response:', statsRes.data); // للتأكد من البيانات
        console.log('Stores response:', storesRes.data); // للتأكد من البيانات
        
        setStats(statsRes.data);
        setRecentStores(storesRes.data.stores);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast({
          title: "خطأ في جلب البيانات",
          description: "تأكد من تشغيل الخادم",
          status: "error",
          duration: 3000,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <Flex justify="center" align="center" minH="400px">
        <Spinner size="xl" />
      </Flex>
    );
  }

  const statCards = [
    {
      title: 'المستخدمين',
      value: stats?.usersCount || 0,
      icon: FiUsers,
      onClick: () => navigate('/admin/users')
    },
    {
      title: 'المتاجر',
      value: stats?.storesCount || 0,
      icon: FiShoppingBag,
      badge: stats?.pendingStoresCount ? `${stats.pendingStoresCount} في الانتظار` : null,
      onClick: () => navigate('/admin/stores')
    },
    {
      title: 'النقاط',
      value: stats?.totalPoints || 0,
      icon: FiStar
    },
    {
      title: 'المبيعات',
      value: `${stats?.totalSales || 0} ر.س`,
      icon: FiDollarSign,
      onClick: () => navigate('/admin/finance')
    }
  ];

  return (
    <Box p={4}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={5} mb={8}>
        {statCards.map((card, idx) => (
          <Card 
            key={idx}
            cursor={card.onClick ? "pointer" : "default"}
            onClick={card.onClick}
            _hover={card.onClick ? { transform: 'translateY(-2px)' } : undefined}
            transition="0.2s"
          >
            <CardBody>
              <Flex justify="space-between" align="center">
                <Box>
                  <Text color="gray.500" fontSize="sm">{card.title}</Text>
                  <Text fontSize="2xl" fontWeight="bold" mt={2}>
                    {card.value}
                  </Text>
                  {card.badge && (
                    <Badge colorScheme="red" mt={2}>{card.badge}</Badge>
                  )}
                </Box>
                <Flex
                  w={12}
                  h={12}
                  align="center"
                  justify="center"
                  rounded="full"
                  bg="blue.50"
                >
                  <Icon as={card.icon} w={6} h={6} color="blue.500" />
                </Flex>
              </Flex>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>

      <Card>
        <CardHeader>
          <Heading size="md">آخر المتاجر المضافة</Heading>
        </CardHeader>
        <CardBody>
          <Table>
            <Thead>
              <Tr>
                <Th>اسم المتجر</Th>
                <Th>التصنيف</Th>
                <Th>الحالة</Th>
                <Th>تاريخ التسجيل</Th>
                <Th>الإجراءات</Th>
              </Tr>
            </Thead>
            <Tbody>
              {recentStores.map((store) => (
                <Tr key={store.id}>
                  <Td>{store.name}</Td>
                  <Td>{store.category}</Td>
                  <Td>
                    <Badge
                      colorScheme={store.status === 'approved' ? 'green' : 'yellow'}
                    >
                      {store.status === 'approved' ? 'مفعل' : 'في الانتظار'}
                    </Badge>
                  </Td>
                  <Td>{new Date(store.createdAt).toLocaleDateString('ar-SA')}</Td>
                  <Td>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      onClick={() => navigate(`/admin/stores/${store.id}`)}
                    >
                      عرض
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

export default AdminDashboard;
