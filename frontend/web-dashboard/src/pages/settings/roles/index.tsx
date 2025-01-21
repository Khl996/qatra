import React from 'react';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  HStack,
  Badge,
  IconButton,
  useDisclosure
} from '@chakra-ui/react';
import { FiEdit2, FiPlus } from 'react-icons/fi';
import { DashboardLayout } from '../../../components/layouts/DashboardLayout';
import { RolePermissionsModal } from '../../../components/modals/RolePermissionsModal';

const mockRoles = [
  {
    id: '1',
    name: 'مدير النظام',
    permissionsCount: 12,
    usersCount: 3
  },
  {
    id: '2',
    name: 'مدير متجر',
    permissionsCount: 8,
    usersCount: 15
  }
];

export default function RolesPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <DashboardLayout>
      <Box p={8}>
        <HStack justify="space-between" mb={6}>
          <Heading size="lg">إدارة الأدوار والصلاحيات</Heading>
          <Button
            colorScheme="blue"
            leftIcon={<FiPlus />}
            onClick={onOpen}
          >
            إضافة دور جديد
          </Button>
        </HStack>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>اسم الدور</Th>
              <Th>عدد الصلاحيات</Th>
              <Th>عدد المستخدمين</Th>
              <Th>الإجراءات</Th>
            </Tr>
          </Thead>
          <Tbody>
            {mockRoles.map(role => (
              <Tr key={role.id}>
                <Td fontWeight="medium">{role.name}</Td>
                <Td>
                  <Badge colorScheme="blue">
                    {role.permissionsCount} صلاحية
                  </Badge>
                </Td>
                <Td>
                  <Badge colorScheme="green">
                    {role.usersCount} مستخدم
                  </Badge>
                </Td>
                <Td>
                  <IconButton
                    aria-label="تعديل"
                    icon={<FiEdit2 />}
                    size="sm"
                    onClick={onOpen}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <RolePermissionsModal isOpen={isOpen} onClose={onClose} />
      </Box>
    </DashboardLayout>
  );
}
