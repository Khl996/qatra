import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Button,
  HStack,
  useToast,
  Spinner,
  Flex,
  Select,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { FiSearch, FiCheck, FiX } from 'react-icons/fi';
import api from '../../../services/api';

interface Store {
  id: number;
  name: string;
  email: string;
  phone: string;
  category: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

const StoresManagement = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('pending'); // لعرض المتاجر المعلقة افتراضياً
  const [searchQuery, setSearchQuery] = useState('');
  const toast = useToast();

  useEffect(() => {
    fetchStores();
  }, [filter]);

  const fetchStores = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/api/admin/stores?status=${filter}`);
      setStores(response.data.stores);
    } catch (error) {
      toast({
        title: "خطأ في جلب بيانات المتاجر",
        status: "error",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (storeId: number) => {
    try {
      await api.put(`/api/admin/stores/${storeId}/approve`);
      toast({
        title: "تم قبول المتجر بنجاح",
        status: "success",
        duration: 3000,
      });
      fetchStores();
    } catch (error) {
      toast({
        title: "حدث خطأ أثناء قبول المتجر",
        status: "error",
        duration: 3000,
      });
    }
  };

  const handleReject = async (storeId: number) => {
    try {
      await api.put(`/api/admin/stores/${storeId}/reject`);
      toast({
        title: "تم رفض المتجر",
        status: "success",
        duration: 3000,
      });
      fetchStores();
    } catch (error) {
      toast({
        title: "حدث خطأ أثناء رفض المتجر",
        status: "error",
        duration: 3000,
      });
    }
  };

  const filteredStores = stores.filter(store => 
    store.name.includes(searchQuery) || 
    store.email.includes(searchQuery) ||
    store.phone.includes(searchQuery)
  );

  if (isLoading) {
    return (
      <Flex justify="center" align="center" minH="400px">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Box p={4}>
      <HStack mb={6} spacing={4}>
        <InputGroup maxW="300px">
          <InputLeftElement pointerEvents="none">
            <FiSearch color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="بحث..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          maxW="200px"
        >
          <option value="all">جميع المتاجر</option>
          <option value="pending">قيد الانتظار</option>
          <option value="approved">مفعل</option>
          <option value="rejected">مرفوض</option>
        </Select>
      </HStack>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>اسم المتجر</Th>
            <Th>البريد الإلكتروني</Th>
            <Th>رقم الجوال</Th>
            <Th>التصنيف</Th>
            <Th>الحالة</Th>
            <Th>تاريخ التسجيل</Th>
            <Th>الإجراءات</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredStores.map((store) => (
            <Tr key={store.id}>
              <Td>{store.name}</Td>
              <Td>{store.email}</Td>
              <Td>{store.phone}</Td>
              <Td>{store.category}</Td>
              <Td>
                <Badge
                  colorScheme={
                    store.status === 'approved' ? 'green' : 
                    store.status === 'pending' ? 'yellow' : 'red'
                  }
                >
                  {store.status === 'approved' ? 'مفعل' : 
                   store.status === 'pending' ? 'قيد الانتظار' : 'مرفوض'}
                </Badge>
              </Td>
              <Td>{new Date(store.createdAt).toLocaleDateString('ar-SA')}</Td>
              <Td>
                <HStack spacing={2}>
                  {store.status === 'pending' && (
                    <>
                      <Button
                        size="sm"
                        colorScheme="green"
                        leftIcon={<FiCheck />}
                        onClick={() => handleApprove(store.id)}
                      >
                        قبول
                      </Button>
                      <Button
                        size="sm"
                        colorScheme="red"
                        leftIcon={<FiX />}
                        onClick={() => handleReject(store.id)}
                      >
                        رفض
                      </Button>
                    </>
                  )}
                  <Button
                    size="sm"
                    colorScheme="blue"
                    onClick={() => window.location.href = `/admin/stores/${store.id}`}
                  >
                    عرض
                  </Button>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default StoresManagement;
