import {
  Box,
  Button,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  SimpleGrid,
  Text,
  Badge,
  HStack,
  Icon,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Switch,
  useToast,
  Select
} from '@chakra-ui/react';
import { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiTag } from 'react-icons/fi';

interface OfferCondition {
  type: 'POINTS' | 'QUANTITY' | 'AMOUNT';
  value: number;
  productId?: string;
}

interface OfferReward {
  type: 'PERCENTAGE_DISCOUNT' | 'FIXED_DISCOUNT' | 'FREE_PRODUCT' | 'EXTRA_QUANTITY';
  value: number;
  productId?: string;
}

interface Offer {
  id: string;
  title: string;
  description: string;
  condition: OfferCondition;
  reward: OfferReward;
  isActive: boolean;
  expiryDate: string;
}

const OffersManagementPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [offers, setOffers] = useState<Offer[]>([
    {
      id: '1',
      title: 'اشترِ 4 واحصل على 1 مجاناً',
      description: 'عند شراء 4 أكواب قهوة تحصل على كوب مجاني',
      condition: {
        type: 'QUANTITY',
        value: 4,
        productId: 'coffee-1'
      },
      reward: {
        type: 'FREE_PRODUCT',
        value: 1,
        productId: 'coffee-1'
      },
      isActive: true,
      expiryDate: '2024-12-31'
    },
    {
      id: '2',
      title: 'خصم 15% على المشروبات',
      description: 'خصم 15% على جميع المشروبات عند استبدال 500 نقطة',
      condition: {
        type: 'POINTS',
        value: 500
      },
      reward: {
        type: 'PERCENTAGE_DISCOUNT',
        value: 15
      },
      isActive: true,
      expiryDate: '2024-12-31'
    }
  ]);

  const [newOffer, setNewOffer] = useState<Omit<Offer, 'id'>>({
    title: '',
    description: '',
    condition: {
      type: 'POINTS',
      value: 0
    },
    reward: {
      type: 'PERCENTAGE_DISCOUNT',
      value: 0
    },
    isActive: true,
    expiryDate: ''
  });

  const toast = useToast();

  const handleCreateOffer = () => {
    const offer: Offer = {
      ...newOffer,
      id: Math.random().toString(36).substr(2, 9)
    };
    
    setOffers([...offers, offer]);
    toast({
      title: 'تم إنشاء العرض بنجاح',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    onClose();
  };

  // تحويل نوع العرض إلى نص مفهوم
  const getOfferTypeText = (offer: Offer) => {
    switch (offer.condition.type) {
      case 'POINTS':
        return `استبدال ${offer.condition.value} نقطة`;
      case 'QUANTITY':
        return `شراء ${offer.condition.value} قطع`;
      case 'AMOUNT':
        return `إنفاق ${offer.condition.value} ريال`;
      default:
        return '';
    }
  };

  // تحويل نوع المكافأة إلى نص مفهوم
  const getRewardTypeText = (offer: Offer) => {
    switch (offer.reward.type) {
      case 'PERCENTAGE_DISCOUNT':
        return `خصم ${offer.reward.value}%`;
      case 'FIXED_DISCOUNT':
        return `خصم ${offer.reward.value} ريال`;
      case 'FREE_PRODUCT':
        return `${offer.reward.value} قطعة مجانية`;
      case 'EXTRA_QUANTITY':
        return `${offer.reward.value} قطع إضافية`;
      default:
        return '';
    }
  };

  return (
    <Stack spacing={6}>
      <Card>
        <CardHeader>
          <HStack justify="space-between">
            <Heading size="md">إدارة العروض</Heading>
            <Button
              leftIcon={<FiPlus />}
              colorScheme="blue"
              onClick={onOpen}
            >
              إضافة عرض جديد
            </Button>
          </HStack>
        </CardHeader>
      </Card>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {offers.map((offer) => (
          <Card key={offer.id}>
            <CardBody>
              <HStack justify="space-between" mb={3}>
                <Badge
                  colorScheme={offer.isActive ? 'green' : 'gray'}
                  borderRadius="full"
                  px={2}
                >
                  {offer.isActive ? 'نشط' : 'غير نشط'}
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

              <Stack spacing={3}>
                <Heading size="md" display="flex" alignItems="center">
                  <Icon as={FiTag} mr={2} />
                  {offer.title}
                </Heading>
                <Text fontSize="sm">{offer.description}</Text>
                <Stack spacing={1}>
                  <Text fontWeight="bold">شروط العرض:</Text>
                  <Text>{getOfferTypeText(offer)}</Text>
                  <Text fontWeight="bold">المكافأة:</Text>
                  <Text>{getRewardTypeText(offer)}</Text>
                </Stack>
                <Text fontSize="sm" color="gray.500">
                  ينتهي في: {new Date(offer.expiryDate).toLocaleDateString('ar-SA')}
                </Text>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>

      {/* Modal إضافة عرض جديد */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>إضافة عرض جديد</ModalHeader>
          <ModalBody>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>نوع العرض</FormLabel>
                <Select
                  value={newOffer.condition.type}
                  onChange={(e) => setNewOffer({
                    ...newOffer,
                    condition: { ...newOffer.condition, type: e.target.value as OfferCondition['type'] }
                  })}
                >
                  <option value="POINTS">استبدال نقاط</option>
                  <option value="QUANTITY">شراء كمية محددة</option>
                  <option value="AMOUNT">إنفاق مبلغ محدد</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>نوع المكافأة</FormLabel>
                <Select
                  value={newOffer.reward.type}
                  onChange={(e) => setNewOffer({
                    ...newOffer,
                    reward: { ...newOffer.reward, type: e.target.value as OfferReward['type'] }
                  })}
                >
                  <option value="PERCENTAGE_DISCOUNT">خصم بالنسبة المئوية</option>
                  <option value="FIXED_DISCOUNT">خصم بمبلغ ثابت</option>
                  <option value="FREE_PRODUCT">منتج مجاني</option>
                  <option value="EXTRA_QUANTITY">كمية إضافية</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>عنوان العرض</FormLabel>
                <Input
                  value={newOffer.title}
                  onChange={(e) => setNewOffer({ ...newOffer, title: e.target.value })}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>وصف العرض</FormLabel>
                <Textarea
                  value={newOffer.description}
                  onChange={(e) => setNewOffer({ ...newOffer, description: e.target.value })}
                />
              </FormControl>

              <SimpleGrid columns={2} spacing={4}>
                <FormControl isRequired>
                  <FormLabel>النقاط المطلوبة</FormLabel>
                  <NumberInput
                    min={0}
                    value={newOffer.condition.value}
                    onChange={(_, value) => setNewOffer({ ...newOffer, condition: { ...newOffer.condition, value } })}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>نسبة الخصم (%)</FormLabel>
                  <NumberInput
                    min={0}
                    max={100}
                    value={newOffer.reward.value}
                    onChange={(_, value) => setNewOffer({ ...newOffer, reward: { ...newOffer.reward, value } })}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
              </SimpleGrid>

              <FormControl isRequired>
                <FormLabel>تاريخ انتهاء العرض</FormLabel>
                <Input
                  type="date"
                  value={newOffer.expiryDate}
                  onChange={(e) => setNewOffer({ ...newOffer, expiryDate: e.target.value })}
                />
              </FormControl>

              <FormControl display="flex" alignItems="center">
                <Switch
                  id="offer-active"
                  isChecked={newOffer.isActive}
                  onChange={(e) => setNewOffer({ ...newOffer, isActive: e.target.checked })}
                  mr={2}
                />
                <FormLabel htmlFor="offer-active" mb={0}>
                  العرض نشط
                </FormLabel>
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              إلغاء
            </Button>
            <Button colorScheme="blue" onClick={handleCreateOffer}>
              إنشاء العرض
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
};

export default OffersManagementPage;
