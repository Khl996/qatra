import React from 'react';
import {
  Box,
  Heading,
  Button,
  SimpleGrid,
  Card,
  CardBody,
  Text,
  Badge,
  HStack,
  VStack,
  Progress,
  useDisclosure,
  IconButton,
} from '@chakra-ui/react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';

export default function StoreOffers() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const mockOffers = [
    {
      id: '1',
      title: 'خصم 50% على القهوة',
      points: 200,
      used: 45,
      total: 100,
      expiry: '2024/02/01',
      isActive: true,
    },
    // ... المزيد من العروض
  ];

  return (
    <Box p={8}>
      <HStack justify="space-between" mb={6}>
        <Heading size="lg">إدارة العروض</Heading>
        <Button leftIcon={<FiPlus />} colorScheme="blue" onClick={onOpen}>
          إضافة عرض جديد
        </Button>
      </HStack>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {mockOffers.map(offer => (
          <Card key={offer.id}>
            <CardBody>
              <VStack spacing={4}>
                <HStack justify="space-between" width="100%">
                  <Badge colorScheme={offer.isActive ? 'green' : 'red'}>
                    {offer.isActive ? 'نشط' : 'منتهي'}
                  </Badge>
                  <HStack>
                    <IconButton
                      aria-label="تعديل"
                      icon={<FiEdit2 />}
                      size="sm"
                      variant="ghost"
                    />
                    <IconButton
                      aria-label="حذف"
                      icon={<FiTrash2 />}
                      size="sm"
                      variant="ghost"
                      colorScheme="red"
                    />
                  </HStack>
                </HStack>

                <Text fontSize="lg" fontWeight="bold">{offer.title}</Text>
                <Text color="blue.500">{offer.points} نقطة</Text>
                
                <Box width="100%">
                  <Text mb={2}>الاستخدام: {offer.used}/{offer.total}</Text>
                  <Progress 
                    value={(offer.used / offer.total) * 100} 
                    colorScheme="blue"
                    borderRadius="full"
                  />
                </Box>

                <Text fontSize="sm" color="gray.500">
                  ينتهي في: {offer.expiry}
                </Text>
              </VStack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
}
