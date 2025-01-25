import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Switch,
  VStack,
  useToast,
  FormErrorMessage,
  Textarea,
} from '@chakra-ui/react';
import { useState } from 'react';

interface OfferFormData {
  title: string;
  description: string;
  type: 'percentage' | 'fixed' | 'points';
  value: number;
  minPurchase?: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

interface OfferFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  offer?: Partial<OfferFormData>;
  onSubmit: (data: OfferFormData) => Promise<void>;
}

export const OfferFormModal = ({ isOpen, onClose, offer, onSubmit }: OfferFormModalProps) => {
  const [formData, setFormData] = useState<OfferFormData>({
    title: offer?.title || '',
    description: offer?.description || '',
    type: offer?.type || 'percentage',
    value: typeof offer?.value === 'number' ? offer.value : 0,
    minPurchase: typeof offer?.minPurchase === 'number' ? offer.minPurchase : 0,
    startDate: offer?.startDate || new Date().toISOString().split('T')[0],
    endDate: offer?.endDate || new Date().toISOString().split('T')[0],
    isActive: offer?.isActive ?? true,
  });
  const [errors, setErrors] = useState<Partial<OfferFormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async () => {
    // التحقق من صحة البيانات
    const newErrors: Partial<OfferFormData> = {};
    if (!formData.title) newErrors.title = 'عنوان العرض مطلوب';
    if (!formData.value) newErrors.value = 'قيمة العرض مطلوبة';
    if (!formData.startDate) newErrors.startDate = 'تاريخ البداية مطلوب';
    if (!formData.endDate) newErrors.endDate = 'تاريخ النهاية مطلوب';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      await onSubmit(formData);
      toast({
        title: offer ? 'تم تحديث العرض' : 'تم إضافة العرض',
        status: 'success',
        duration: 3000,
      });
      onClose();
    } catch (error) {
      toast({
        title: 'حدث خطأ',
        description: 'لم يتم حفظ العرض',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNumberChange = (field: keyof Pick<OfferFormData, 'value' | 'minPurchase'>, value: string | number) => {
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;
    setFormData(prev => ({
      ...prev,
      [field]: isNaN(numericValue) ? 0 : numericValue
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{offer ? 'تعديل العرض' : 'إضافة عرض جديد'}</ModalHeader>
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired isInvalid={!!errors.title}>
              <FormLabel>عنوان العرض</FormLabel>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
              <FormErrorMessage>{errors.title}</FormErrorMessage>
            </FormControl>

            <FormControl>
              <FormLabel>الوصف</FormLabel>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>نوع العرض</FormLabel>
              <Select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
              >
                <option value="percentage">نسبة خصم</option>
                <option value="fixed">خصم ثابت</option>
                <option value="points">نقاط إضافية</option>
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>قيمة العرض</FormLabel>
              <NumberInput
                value={formData.value.toString()}
                onChange={(valueString) => handleNumberChange('value', valueString)}
                min={0}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <FormControl>
              <FormLabel>الحد الأدنى للشراء</FormLabel>
              <NumberInput
                value={formData.minPurchase?.toString() || '0'}
                onChange={(valueString) => handleNumberChange('minPurchase', valueString)}
                min={0}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            {/* ...المزيد من حقول النموذج... */}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit} isLoading={isLoading}>
            {offer ? 'تحديث' : 'إضافة'}
          </Button>
          <Button variant="ghost" onClick={onClose}>
            إلغاء
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

// Export the type for use in other components
export type { OfferFormData };
