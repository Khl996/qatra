import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  Textarea,
  InputGroup,
  InputLeftAddon,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';

interface AddStoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddStoreModal = ({ isOpen, onClose }: AddStoreModalProps) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // سيتم إضافة منطق حفظ البيانات هنا
      toast({
        title: 'تم إضافة المتجر بنجاح',
        status: 'success',
        duration: 3000,
      });
      onClose();
    } catch (error) {
      toast({
        title: 'حدث خطأ',
        description: 'لم نتمكن من إضافة المتجر',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>إضافة متجر جديد</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>اسم المتجر</FormLabel>
              <Input placeholder="أدخل اسم المتجر" />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>نوع المتجر</FormLabel>
              <Select placeholder="اختر نوع المتجر">
                <option value="restaurant">مطعم</option>
                <option value="cafe">مقهى</option>
                <option value="shop">متجر</option>
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>رقم الجوال</FormLabel>
              <InputGroup>
                <InputLeftAddon children="+966" />
                <Input type="tel" placeholder="5xxxxxxxx" />
              </InputGroup>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>البريد الإلكتروني</FormLabel>
              <Input type="email" placeholder="example@domain.com" />
            </FormControl>

            <FormControl>
              <FormLabel>نسبة العمولة</FormLabel>
              <InputGroup>
                <Input type="number" defaultValue={10} />
                <InputLeftAddon children="%" />
              </InputGroup>
            </FormControl>

            <FormControl>
              <FormLabel>وصف المتجر</FormLabel>
              <Textarea placeholder="أدخل وصف المتجر" />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" ml={3} onClick={onClose}>
            إلغاء
          </Button>
          <Button
            colorScheme="blue"
            isLoading={isLoading}
            onClick={handleSubmit}
          >
            إضافة المتجر
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddStoreModal;
