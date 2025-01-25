import { Stack, HStack, Heading, Button, Card, CardHeader, CardBody, Tabs, TabList, Tab, Badge, SimpleGrid, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { StoreStatsGrid } from './components/StoreStatsGrid';
import { StoreFilters } from './components/StoreFilters';
import { StoreCard } from './components/StoreCard';
import Pagination from '../../../shared/components/Pagination';
import { StoreDetailsModal } from '../../../shared/components/modals/stores/StoreDetailsModal';

const StoresManagement = () => {
  // بيانات تجريبية للمتاجر
  const stores = [
    {
      id: 1,
      name: "كافيه السعادة",
      type: "مقهى",
      owner: "أحمد محمد",
      email: "cafe@example.com",
      phone: "0501234567",
      location: "الرياض - حي النرجس",
      status: "active",
      joinDate: "2024-01-15",
      ordersCount: 156,
      rating: 4.8,
      revenue: 15600,
    },
    // ...يمكن إضافة المزيد من البيانات التجريبية
  ];

  // إضافة ترقيم الصفحات
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 9,
    totalItems: stores.length // تعيين القيمة الابتدائية من طول المصفوفة
  });

  // إضافة فلترة متقدمة
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    status: '',
    dateRange: { start: null, end: null }
  });

  const [selectedStore, setSelectedStore] = useState<any>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const handleStoreAction = (action: string, store: any) => {
    switch (action) {
      case 'view':
        setSelectedStore(store);
        setIsDetailsModalOpen(true);
        break;
      case 'edit':
        // TODO: Implement edit functionality
        break;
      case 'suspend':
        // TODO: Implement suspend functionality
        break;
      default:
        break;
    }
  };

  return (
    <Stack spacing={6}>
      <HStack justify="space-between">
        <Heading size="lg">إدارة المتاجر</Heading>
        <Button colorScheme="blue">إضافة متجر جديد</Button>
      </HStack>

      <StoreStatsGrid />
      <StoreFilters onFilterChange={filters => setFilters(filters)} />

      <Card>
        <CardHeader>
          <Tabs onChange={(index) => {
            // Handle tab change
            const statusFilters = ['all', 'pending', 'active', 'suspended'];
            setFilters(prev => ({
              ...prev,
              status: statusFilters[index]
            }));
          }}>
            <TabList>
              <Tab>جميع المتاجر</Tab>
              <Tab>
                قيد المراجعة
                <Badge ml={2} colorScheme="yellow">4</Badge>
              </Tab>
              <Tab>المتاجر النشطة</Tab>
              <Tab>المتاجر الموقوفة</Tab>
            </TabList>
          </Tabs>
        </CardHeader>
        <CardBody>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
            {stores.map((store) => (
              <StoreCard 
                key={store.id}
                store={store}
                onAction={(action) => handleStoreAction(action, store)}
              />
            ))}
          </SimpleGrid>
        </CardBody>
      </Card>

      <StoreDetailsModal 
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        store={selectedStore}
      />

      <HStack justify="space-between" mt={4}>
        <Text>إجمالي النتائج: {pagination.totalItems}</Text>
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={Math.ceil(pagination.totalItems / pagination.itemsPerPage)}
          onPageChange={(page: number) => setPagination(prev => ({ ...prev, currentPage: page }))}
        />
      </HStack>
    </Stack>
  );
};

export default StoresManagement;
