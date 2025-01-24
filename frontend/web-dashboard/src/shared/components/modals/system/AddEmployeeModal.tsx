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
  VStack,
  Select,
  InputGroup,
  InputLeftAddon,
  Switch,
  useToast,
  Divider,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddEmployeeModal = ({ isOpen, onClose }: AddEmployeeModalProps) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // سيتم إضافة منطق حفظ البيانات هنا
      toast({
        title: 'تم إضافة الموظف بنجاح',
        status: 'success',
        duration: 3000,
      });
      onClose();
    } catch (error) {
      toast({
        title: 'حدث خطأ',
        description: 'لم نتمكن من إضافة الموظف',
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
        <ModalHeader>إضافة موظف جديد</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>الاسم الكامل</FormLabel>
              <Input placeholder="أدخل اسم الموظف" />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>البريد الإلكتروني</FormLabel>
              <Input type="email" placeholder="example@qatra.com" />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>رقم الجوال</FormLabel>
              <InputGroup>
                <InputLeftAddon children="+966" />
                <Input type="tel" placeholder="5xxxxxxxx" />
              </InputGroup>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>الدور الوظيفي</FormLabel>
              <Select placeholder="اختر الدور الوظيفي">
                <option value="admin">مدير نظام</option>
                <option value="store_manager">مشرف متاجر</option>
                <option value="accountant">محاسب</option>
                <option value="support">دعم فني</option>
              </Select>
            </FormControl>

            <Divider />
            <Text fontWeight="bold" alignSelf="start">إعدادات الحساب</Text>

            <FormControl>
              <FormLabel>كلمة المرور</FormLabel>
              <Input type="password" placeholder="أدخل كلمة المرور" />
            </FormControl>

            <FormControl>
              <FormLabel>تأكيد كلمة المرور</FormLabel>
              <Input type="password" placeholder="أعد إدخال كلمة المرور" />
            </FormControl>

            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">تفعيل المصادقة الثنائية</FormLabel>
              <Switch defaultChecked />
            </FormControl>

            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">تفعيل الحساب مباشرة</FormLabel>
              <Switch defaultChecked />
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
            إضافة الموظف
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddEmployeeModal;
