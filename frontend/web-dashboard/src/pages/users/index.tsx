import React from 'react';
import {
  Box,
  Heading,
  HStack,
  Badge,
  Avatar,
  Text,
} from '@chakra-ui/react';
import { DataTable } from '../../components/tables/DataTable';
import { DashboardLayout } from '../../components/layouts/DashboardLayout';

// بيانات تجريبية للمستخدمين
const mockUsers = [
  {
    id: '1',
    name: 'محمد أحمد',
    phone: '0512345678',
    email: 'mohammed@example.com',
    points: 450,
    status: 'نشط',
  },
  // ... المزيد من المستخدمين
];

const columns = [
  {
    key: 'name',
    header: 'الاسم',
    render: (value: string) => (
      <HStack>
        <Avatar size="sm" name={value} />
        <Text>{value}</Text>
      </HStack>
    ),
  },
  { key: 'phone', header: 'رقم الجوال' },
  { key: 'email', header: 'البريد الإلكتروني' },
  {
    key: 'points',
    header: 'النقاط',
    render: (value: number) => (
      <Text fontWeight="bold" color="blue.500">
        {value}
      </Text>
    ),
  },
  {
    key: 'status',
    header: 'الحالة',
    render: (value: string) => (
      <Badge colorScheme={value === 'نشط' ? 'green' : 'red'}>
        {value}
      </Badge>
    ),
  },
];

export default function UsersPage() {
  const handleEdit = (user: any) => {
    console.log('Edit user:', user);
  };

  const handleDelete = (user: any) => {
    console.log('Delete user:', user);
  };

  return (
    <DashboardLayout>
      <Box p={8}>
        <Heading size="lg" mb={6}>إدارة المستخدمين</Heading>
        
        <DataTable
          columns={columns}
          data={mockUsers}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Box>
    </DashboardLayout>
  );
}
