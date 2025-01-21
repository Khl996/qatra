import React from 'react';
import {
  Box,
  Heading,
  Button,
  HStack,
  useDisclosure,
  Tag,
  TagLabel,
} from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';
import { DashboardLayout } from '../../components/layouts/DashboardLayout';
import { DataTable } from '../../components/tables/DataTable';

const columns = [
  { key: 'title', header: 'عنوان العرض' },
  { key: 'store', header: 'المتجر' },
  { 
    key: 'points', 
    header: 'النقاط المطلوبة',
    render: (value: number) => `${value} نقطة`
  },
  {
    key: 'status',
    header: 'الحالة',
    render: (value: string) => (
      <Tag colorScheme={value === 'active' ? 'green' : 'red'}>
        <TagLabel>{value === 'active' ? 'نشط' : 'منتهي'}</TagLabel>
      </Tag>
    )
  },
  { 
    key: 'expiry', 
    header: 'تاريخ الانتهاء' 
  }
];

const mockOffers = [
  {
    id: '1',
    title: 'خصم 50% على القهوة',
    store: 'كافيه السعادة',
    points: 200,
    status: 'active',
    expiry: '2024/02/01'
  },
  // ... المزيد من العروض
];

export default function OffersPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <DashboardLayout>
      <Box p={8}>
        <HStack justify="space-between" mb={6}>
          <Heading size="lg">إدارة العروض</Heading>
          <Button
            colorScheme="blue"
            leftIcon={<FiPlus />}
            onClick={onOpen}
          >
            إضافة عرض جديد
          </Button>
        </HStack>

        <DataTable
          columns={columns}
          data={mockOffers}
          onEdit={(offer) => console.log('Edit offer:', offer)}
          onDelete={(offer) => console.log('Delete offer:', offer)}
        />
      </Box>
    </DashboardLayout>
  );
}
