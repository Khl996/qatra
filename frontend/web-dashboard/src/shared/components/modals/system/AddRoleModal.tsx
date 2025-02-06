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
  Checkbox,
  CheckboxGroup,
  Grid,
  useToast,
  Divider,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';

interface AddRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddRoleModal = ({ isOpen, onClose }: AddRoleModalProps) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [permissions] = useState([
    { id: 'users_view', label: 'عرض المستخدمين' },
    { id: 'users_manage', label: 'إدارة المستخدمين' },
    { id: 'stores_view', label: 'عرض المتاجر' },
    { id: 'stores_manage', label: 'إدارة المتاجر' },
    { id: 'reports_view', label: 'عرض التقارير' },
    { id: 'system_manage', label: 'إدارة النظام' },
  ]);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // سيتم إضافة منطق حفظ البيانات هنا
      toast({
        title: 'تم إضافة الدور بنجاح',
        status: 'success',
        duration: 3000,
      });
      onClose();
    } catch (error) {
      toast({
        title: 'حدث خطأ',
        description: 'لم نتمكن من إضافة الدور',
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
        <ModalHeader>إضافة دور جديد</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>اسم الدور</FormLabel>
              <Input placeholder="مثال: مدير المتاجر" />
            </FormControl>
            <FormControl>
              <FormLabel>وصف الدور</FormLabel>
              <Input placeholder="وصف مختصر للدور" />
            </FormControl>
            <FormControl>
              <FormLabel>الصلاحيات</FormLabel>
              <CheckboxGroup>
                <VStack align="start" spacing={2}>
                  {permissions.map(permission => (
                    <Checkbox key={permission.id} value={permission.id}>
                      {permission.label}
                    </Checkbox>
                  ))}
                </VStack>
              </CheckboxGroup>
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" ml={3} isLoading={isLoading} onClick={handleSubmit}>
            حفظ
          </Button>
          <Button variant="ghost" onClick={onClose}>
            إلغاء
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddRoleModal;
