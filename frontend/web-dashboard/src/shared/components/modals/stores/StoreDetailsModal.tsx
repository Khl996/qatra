import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, VStack, HStack, Text, Badge, StatGroup, Stat, StatLabel, StatNumber, Avatar, Grid, GridItem, Divider } from '@chakra-ui/react';
import { FiMapPin, FiPhone, FiMail, FiUser } from 'react-icons/fi';

interface StoreDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  store: any;
}

export const StoreDetailsModal = ({ isOpen, onClose, store }: StoreDetailsModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>تفاصيل المتجر</ModalHeader>
        <ModalBody>
          <VStack align="stretch" spacing={6}>
            <HStack spacing={4}>
              <Avatar size="xl" name={store?.name} src={store?.logo} />
              <VStack align="start" spacing={1}>
                <Text fontSize="xl" fontWeight="bold">{store?.name}</Text>
                <Badge colorScheme={store?.status === 'active' ? 'green' : 'yellow'}>
                  {store?.status === 'active' ? 'نشط' : 'قيد المراجعة'}
                </Badge>
                <Text fontSize="sm" color="gray.500">{store?.type}</Text>
              </VStack>
            </HStack>

            <Divider />

            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <GridItem>
                <VStack align="start" spacing={2}>
                  <HStack>
                    <FiUser />
                    <Text>المالك: {store?.owner}</Text>
                  </HStack>
                  <HStack>
                    <FiPhone />
                    <Text>الهاتف: {store?.phone}</Text>
                  </HStack>
                  <HStack>
                    <FiMail />
                    <Text>البريد: {store?.email}</Text>
                  </HStack>
                  <HStack>
                    <FiMapPin />
                    <Text>العنوان: {store?.location}</Text>
                  </HStack>
                </VStack>
              </GridItem>

              <GridItem>
                <StatGroup>
                  <Stat>
                    <StatLabel>الطلبات</StatLabel>
                    <StatNumber>{store?.ordersCount}</StatNumber>
                  </Stat>
                  <Stat>
                    <StatLabel>التقييم</StatLabel>
                    <StatNumber>{store?.rating}</StatNumber>
                  </Stat>
                </StatGroup>
              </GridItem>
            </Grid>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <HStack spacing={2}>
            <Button colorScheme="blue" onClick={() => {}}>تعديل البيانات</Button>
            <Button variant="ghost" onClick={onClose}>إغلاق</Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
