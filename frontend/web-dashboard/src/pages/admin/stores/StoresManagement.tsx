import {
  Box,
  Heading,
  Card,
  CardHeader,
  CardBody,
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  IconButton,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { FiSearch, FiFilter, FiMoreVertical } from 'react-icons/fi';
import { useState } from 'react';
import AddStoreModal from '../../../shared/components/modals/stores/AddStoreModal';
import StoreDetailsModal from '../../../shared/components/modals/stores/StoreDetailsModal';

const StoresManagement = () => {
  const [isAddStoreModalOpen, setIsAddStoreModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedStoreId, setSelectedStoreId] = useState<number>();
  
  const stores = [
    {
      id: 1,
      name: 'مطعم السعادة',
      type: 'مطعم',
      status: 'active',
      joinDate: '2024-01-15',
      ordersCount: 156,
      revenue: '15,650'
    },
    {
      id: 2,
      name: 'قهوة المختصين',
      type: 'مقهى',
      status: 'pending',
      joinDate: '2024-01-22',
      ordersCount: 0,
      revenue: '0'
    },
    // يمكن إضافة المزيد من البيانات التجريبية هنا
  ];

  const handleViewDetails = (storeId: number) => {
    setSelectedStoreId(storeId);
    setIsDetailsModalOpen(true);
  };

  return (
    <Stack spacing={6}>
      <Flex justify="space-between" align="center">
        <Heading size="lg">إدارة المتاجر</Heading>
        <Button 
          colorScheme="blue"
          onClick={() => setIsAddStoreModalOpen(true)}
        >
          إضافة متجر جديد
        </Button>
      </Flex>

      <Card>
        <CardHeader>
          <Stack spacing={4}>
            <Flex gap={4}>
              <InputGroup w="300px">
                <InputLeftElement pointerEvents="none">
                  <FiSearch />
                </InputLeftElement>
                <Input placeholder="البحث عن متجر..." />
              </InputGroup>
              <Select placeholder="نوع المتجر" w="200px">
                <option value="restaurant">مطعم</option>
                <option value="cafe">مقهى</option>
                <option value="shop">متجر</option>
              </Select>
              <Select placeholder="الحالة" w="200px">
                <option value="active">نشط</option>
                <option value="pending">قيد المراجعة</option>
                <option value="suspended">معلق</option>
              </Select>
              <IconButton
                aria-label="فلترة"
                icon={<FiFilter />}
                variant="outline"
              />
            </Flex>
          </Stack>
        </CardHeader>
        <CardBody>
          <Table>
            <Thead>
              <Tr>
                <Th>اسم المتجر</Th>
                <Th>النوع</Th>
                <Th>الحالة</Th>
                <Th>تاريخ الانضمام</Th>
                <Th>عدد الطلبات</Th>
                <Th>الإيرادات</Th>
                <Th>الإجراءات</Th>
              </Tr>
            </Thead>
            <Tbody>
              {stores.map(store => (
                <Tr key={store.id}>
                  <Td fontWeight="medium">{store.name}</Td>
                  <Td>{store.type}</Td>
                  <Td>
                    <Badge
                      colorScheme={store.status === 'active' ? 'green' : 'yellow'}
                    >
                      {store.status === 'active' ? 'نشط' : 'قيد المراجعة'}
                    </Badge>
                  </Td>
                  <Td>{store.joinDate}</Td>
                  <Td isNumeric>{store.ordersCount}</Td>
                  <Td isNumeric>{store.revenue} ر.س</Td>
                  <Td>
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        icon={<FiMoreVertical />}
                        variant="ghost"
                        size="sm"
                      />
                      <MenuList>
                        <MenuItem onClick={() => handleViewDetails(store.id)}>عرض التفاصيل</MenuItem>
                        <MenuItem>تعديل البيانات</MenuItem>
                        <MenuItem>إدارة العمولات</MenuItem>
                        <MenuItem color="red.500">تعليق المتجر</MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </CardBody>
      </Card>

      <AddStoreModal 
        isOpen={isAddStoreModalOpen}
        onClose={() => setIsAddStoreModalOpen(false)}
      />
      
      <StoreDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        storeId={selectedStoreId}
      />
    </Stack>
  );
};

export default StoresManagement;
