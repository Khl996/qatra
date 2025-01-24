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
  InputGroup,
  InputLeftElement,
  Input,
  Select,
  IconButton,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Text,
  HStack,
} from '@chakra-ui/react';
import { FiSearch, FiFilter, FiMoreVertical, FiMail, FiPhone } from 'react-icons/fi';
import UserDetailsModal from '../../../shared/components/modals/users/UserDetailsModal';
import AddUserModal from '../../../shared/components/modals/users/AddUserModal';
import { useState } from 'react';

const UsersManagement = () => {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number>();

  const users = [
    {
      id: 1,
      name: 'أحمد محمد',
      email: 'ahmed@example.com',
      phone: '0501234567',
      joinDate: '2024-01-10',
      status: 'active',
      points: 450,
      ordersCount: 23
    },
    {
      id: 2,
      name: 'سارة خالد',
      email: 'sara@example.com',
      phone: '0559876543',
      joinDate: '2024-01-15',
      status: 'inactive',
      points: 120,
      ordersCount: 8
    },
    // يمكن إضافة المزيد من البيانات التجريبية
  ];

  const handleViewDetails = (userId: number) => {
    setSelectedUserId(userId);
    setIsDetailsModalOpen(true);
  };

  return (
    <Stack spacing={6}>
      <Flex justify="space-between" align="center">
        <Heading size="lg">إدارة المستخدمين</Heading>
        <HStack spacing={4}>
          <Button 
            colorScheme="blue"
            onClick={() => setIsAddUserModalOpen(true)}
          >
            إضافة مستخدم
          </Button>
          <Button variant="outline">تصدير البيانات</Button>
        </HStack>
      </Flex>

      <Card>
        <CardHeader>
          <Stack spacing={4}>
            <Flex gap={4}>
              <InputGroup w="300px">
                <InputLeftElement pointerEvents="none">
                  <FiSearch />
                </InputLeftElement>
                <Input placeholder="البحث عن مستخدم..." />
              </InputGroup>
              <Select placeholder="الحالة" w="200px">
                <option value="active">نشط</option>
                <option value="inactive">غير نشط</option>
                <option value="blocked">محظور</option>
              </Select>
              <IconButton
                aria-label="فلترة متقدمة"
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
                <Th>المستخدم</Th>
                <Th>معلومات الاتصال</Th>
                <Th>تاريخ الانضمام</Th>
                <Th>الحالة</Th>
                <Th>النقاط</Th>
                <Th>عدد الطلبات</Th>
                <Th>الإجراءات</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map(user => (
                <Tr key={user.id}>
                  <Td>
                    <HStack>
                      <Avatar size="sm" name={user.name} />
                      <Text fontWeight="medium">{user.name}</Text>
                    </HStack>
                  </Td>
                  <Td>
                    <Stack spacing={1} fontSize="sm">
                      <HStack>
                        <FiMail />
                        <Text>{user.email}</Text>
                      </HStack>
                      <HStack>
                        <FiPhone />
                        <Text>{user.phone}</Text>
                      </HStack>
                    </Stack>
                  </Td>
                  <Td>{user.joinDate}</Td>
                  <Td>
                    <Badge
                      colorScheme={user.status === 'active' ? 'green' : 'red'}
                    >
                      {user.status === 'active' ? 'نشط' : 'غير نشط'}
                    </Badge>
                  </Td>
                  <Td isNumeric>{user.points}</Td>
                  <Td isNumeric>{user.ordersCount}</Td>
                  <Td>
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        icon={<FiMoreVertical />}
                        variant="ghost"
                        size="sm"
                      />
                      <MenuList>
                        <MenuItem onClick={() => handleViewDetails(user.id)}>عرض التفاصيل</MenuItem>
                        <MenuItem>تعديل البيانات</MenuItem>
                        <MenuItem>سجل النقاط</MenuItem>
                        <MenuItem>سجل الطلبات</MenuItem>
                        <MenuItem color="red.500">حظر المستخدم</MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </CardBody>
      </Card>

      <AddUserModal 
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
      />

      <UserDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        userId={selectedUserId}
      />
    </Stack>
  );
};

export default UsersManagement;
