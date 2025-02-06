import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input, Select, VStack } from '@chakra-ui/react';
import { useState } from 'react';

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddEmployeeModal = ({ isOpen, onClose }: AddEmployeeModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>إضافة موظف جديد</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>الاسم</FormLabel>
              <Input placeholder="اسم الموظف" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>البريد الإلكتروني</FormLabel>
              <Input type="email" placeholder="البريد الإلكتروني" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>الدور</FormLabel>
              <Select placeholder="اختر الدور">
                <option value="admin">مدير النظام</option>
                <option value="moderator">مشرف المتاجر</option>
              </Select>
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" ml={3} isLoading={isLoading}>
            إضافة
          </Button>
          <Button variant="ghost" onClick={onClose}>
            إلغاء
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddEmployeeModal;
