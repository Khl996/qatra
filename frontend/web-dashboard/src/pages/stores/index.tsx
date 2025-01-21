import React, { useState } from 'react';
import {
  Box,
  Heading,
  Button,
  useDisclosure,
  Badge,
  HStack,
  Text,
} from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';
import { DataTable } from '../../components/tables/DataTable';
import { DashboardLayout } from '../../components/layouts/DashboardLayout';

// بيانات تجريبية للمتاجر
const mockStores = [
  {
    id: '1',
    name: 'متجر البركة',
    owner: 'أحمد محمد',
    phone: '0512345678',
    status: 'نشط',
    points: 1200,
  },
  // ... المزيد من المتاجر
];

const columns = [
  { key: 'name', header: 'اسم المتجر' },
  { key: 'owner', header: 'المالك' },
  { key: 'phone', header: 'رقم الجوال' },
  {
    key: 'status',
    header: 'الحالة',
    render: (value: string) => (
      <Badge colorScheme={value === 'نشط' ? 'green' : 'red'}>
        {value}
      </Badge>
    ),
  },
  {
    key: 'points',
    header: 'النقاط',
    render: (value: number) => (
      <Text fontWeight="bold" color="blue.500">
        {value}
      </Text>
    ),
  },
];

export default function StoresPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleEdit = (store: any) => {
    console.log('Edit store:', store);
  };

  const handleDelete = (store: any) => {
    console.log('Delete store:', store);
  };

  return (
    <DashboardLayout>
      <Box p={8}>
        <HStack justify="space-between" mb={6}>
          <Heading size="lg">إدارة المتاجر</Heading>
          <Button
            colorScheme="blue"
            leftIcon={<FiPlus />}
            onClick={onOpen}
          >
            إضافة متجر
          </Button>
        </HStack>

        <DataTable
          columns={columns}
          data={mockStores}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Box>
    </DashboardLayout>
  );
}
