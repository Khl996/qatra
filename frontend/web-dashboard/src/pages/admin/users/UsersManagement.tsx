import { useState, useEffect } from 'react';
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
  InputGroup,
  Input,
  InputLeftElement,
} from '@chakra-ui/react';
import { FiSearch, FiEdit2, FiLock } from 'react-icons/fi';
import api from '../../../services/api';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  uniqueCode: string;
  status: 'active' | 'blocked';
  createdAt: string;
}

const UsersManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const toast = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/api/admin/users');
      setUsers(response.data.users);
    } catch (error) {
      toast({
        title: "خطأ في جلب بيانات المستخدمين",
        status: "error",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBlockUser = async (userId: number) => {
    try {
      await api.put(`/api/admin/users/${userId}/block`);
      toast({
        title: "تم حظر المستخدم بنجاح",
        status: "success",
        duration: 3000,
      });
      fetchUsers();
    } catch (error) {
      toast({
        title: "حدث خطأ أثناء حظر المستخدم",
        status: "error",
        duration: 3000,
      });
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.includes(searchQuery) || 
    user.email.includes(searchQuery) ||
    user.phone.includes(searchQuery) ||
    user.uniqueCode.includes(searchQuery)
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
      <HStack mb={6}>
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
      </HStack>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>الاسم</Th>
            <Th>البريد الإلكتروني</Th>
            <Th>رقم الجوال</Th>
            <Th>الرمز التعريفي</Th>
            <Th>الحالة</Th>
            <Th>تاريخ التسجيل</Th>
            <Th>الإجراءات</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredUsers.map((user) => (
            <Tr key={user.id}>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>{user.phone}</Td>
              <Td>{user.uniqueCode}</Td>
              <Td>
                <Badge
                  colorScheme={user.status === 'active' ? 'green' : 'red'}
                >
                  {user.status === 'active' ? 'نشط' : 'محظور'}
                </Badge>
              </Td>
              <Td>{new Date(user.createdAt).toLocaleDateString('ar-SA')}</Td>
              <Td>
                <HStack spacing={2}>
                  <Button
                    size="sm"
                    colorScheme="blue"
                    leftIcon={<FiEdit2 />}
                    onClick={() => window.location.href = `/admin/users/${user.id}`}
                  >
                    تعديل
                  </Button>
                  <Button
                    size="sm"
                    colorScheme={user.status === 'active' ? 'red' : 'green'}
                    leftIcon={<FiLock />}
                    onClick={() => handleBlockUser(user.id)}
                  >
                    {user.status === 'active' ? 'حظر' : 'إلغاء الحظر'}
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

export default UsersManagement;
