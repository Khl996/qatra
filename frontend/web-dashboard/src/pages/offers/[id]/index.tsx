import React from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Badge,
  SimpleGrid,
  Image,
  Button,
  HStack,
  useToast,
} from '@chakra-ui/react';
import { DashboardLayout } from '../../../components/layouts/DashboardLayout';
import { useRouter } from 'next/router';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

export default function OfferDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  const toast = useToast();

  const offerStats = [
    { label: 'عدد المستخدمين', value: '45' },
    { label: 'النقاط المستبدلة', value: '1,230' },
    { label: 'معدل الاستخدام', value: '76%' },
  ];

  return (
    <DashboardLayout>
      <Box p={8}>
        <HStack justify="space-between" mb={6}>
          <Heading size="lg">تفاصيل العرض</Heading>
          <HStack spacing={4}>
            <Button
              leftIcon={<FiEdit2 />}
              colorScheme="blue"
              onClick={() => router.push(`/offers/${id}/edit`)}
            >
              تعديل
            </Button>
            <Button
              leftIcon={<FiTrash2 />}
              colorScheme="red"
              variant="ghost"
            >
              حذف
            </Button>
          </HStack>
        </HStack>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          <VStack align="stretch" spacing={6}>
            <Box bg="white" p={6} borderRadius="lg" shadow="sm">
              <Text fontSize="xl" fontWeight="bold" mb={4}>
                خصم 50% على القهوة المختصة
              </Text>
              <Badge colorScheme="green" mb={4}>نشط</Badge>
              <Text color="gray.600" mb={4}>
                احصل على خصم 50% على جميع أنواع القهوة المختصة في كافيه السعادة
              </Text>
              <StatGroup>
                {offerStats.map((stat) => (
                  <Stat key={stat.label}>
                    <StatLabel>{stat.label}</StatLabel>
                    <StatNumber>{stat.value}</StatNumber>
                  </Stat>
                ))}
              </StatGroup>
            </Box>
          </VStack>

          <Box bg="white" p={6} borderRadius="lg" shadow="sm">
            <Text fontSize="lg" fontWeight="bold" mb={4}>
              سجل الاستخدام
            </Text>
            {/* سيتم إضافة جدول سجل الاستخدام هنا */}
          </Box>
        </SimpleGrid>
      </Box>
    </DashboardLayout>
  );
}
