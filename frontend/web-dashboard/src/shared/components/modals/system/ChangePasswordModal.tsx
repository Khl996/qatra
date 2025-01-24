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
  useToast,
  Text,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { useState } from 'react';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  employeeId?: number;
  employeeName?: string;
}

const ChangePasswordModal = ({ isOpen, onClose, employeeId, employeeName }: ChangePasswordModalProps) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      toast({
        title: 'خطأ',
        description: 'كلمة المرور غير متطابقة',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    setIsLoading(true);
    try {
      // سيتم إضافة منطق حفظ البيانات هنا
      toast({
        title: 'تم تغيير كلمة المرور بنجاح',
        status: 'success',
        duration: 3000,
      });
      onClose();
    } catch (error) {
      toast({
        title: 'حدث خطأ',
        description: 'لم نتمكن من تغيير كلمة المرور',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>تغيير كلمة المرور</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <Text>
              تغيير كلمة المرور للموظف: <strong>{employeeName}</strong>
            </Text>

            <Alert status="info" borderRadius="md">
              <AlertIcon />
              يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل
            </Alert>

            <FormControl isRequired>
              <FormLabel>كلمة المرور الجديدة</FormLabel>
              <Input 
                type="password" 
                placeholder="أدخل كلمة المرور الجديدة"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>تأكيد كلمة المرور</FormLabel>
              <Input 
                type="password" 
                placeholder="أعد إدخال كلمة المرور"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
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
            isDisabled={!password || !confirmPassword}
          >
            حفظ التغييرات
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ChangePasswordModal;
