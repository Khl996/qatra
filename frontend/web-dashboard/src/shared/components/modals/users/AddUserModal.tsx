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
  InputGroup,
  InputLeftAddon,
  Select,
  Switch,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddUserModal = ({ isOpen, onClose }: AddUserModalProps) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // سيتم إضافة منطق حفظ البيانات هنا
      toast({
        title: 'تم إضافة المستخدم بنجاح',
        status: 'success',
        duration: 3000,
      });
      onClose();
    } catch (error) {
      toast({
        title: 'حدث خطأ',
        description: 'لم نتمكن من إضافة المستخدم',
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
        <ModalHeader>إضافة مستخدم جديد</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>الاسم الكامل</FormLabel>
              <Input placeholder="أدخل اسم المستخدم" />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>البريد الإلكتروني</FormLabel>
              <Input type="email" placeholder="example@domain.com" />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>رقم الجوال</FormLabel>
              <InputGroup>
                <InputLeftAddon children="+966" />
                <Input type="tel" placeholder="5xxxxxxxx" />
              </InputGroup>
            </FormControl>

            <FormControl>
              <FormLabel>الصلاحيات</FormLabel>
              <Select placeholder="اختر مستوى الصلاحيات">
                <option value="admin">مدير نظام</option>
                <option value="moderator">مشرف</option>
                <option value="viewer">مشاهد</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>كلمة المرور</FormLabel>
              <Input type="password" placeholder="أدخل كلمة المرور" />
            </FormControl>

            <FormControl>
              <FormLabel>تأكيد كلمة المرور</FormLabel>
              <Input type="password" placeholder="أعد إدخال كلمة المرور" />
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
            إضافة المستخدم
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddUserModal;
