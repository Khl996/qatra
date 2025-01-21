import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  VStack,
  Checkbox,
  Text,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Box
} from '@chakra-ui/react';

interface RolePermissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    name: string;
    permissions: string[];
  };
}

const mockPermissions = [
  {
    module: 'المتاجر',
    permissions: [
      { id: 'store_view', name: 'عرض المتاجر' },
      { id: 'store_create', name: 'إضافة متجر' },
      { id: 'store_edit', name: 'تعديل متجر' },
      { id: 'store_delete', name: 'حذف متجر' }
    ]
  },
  {
    module: 'المستخدمين',
    permissions: [
      { id: 'user_view', name: 'عرض المستخدمين' },
      { id: 'user_create', name: 'إضافة مستخدم' },
      { id: 'user_edit', name: 'تعديل مستخدم' }
    ]
  }
];

export const RolePermissionsModal: React.FC<RolePermissionsModalProps> = ({
  isOpen,
  onClose,
  initialData
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {initialData ? 'تعديل الدور' : 'إضافة دور جديد'}
        </ModalHeader>
        <ModalBody>
          <VStack spacing={6} align="stretch">
            <FormControl>
              <FormLabel>اسم الدور</FormLabel>
              <Input placeholder="أدخل اسم الدور" defaultValue={initialData?.name} />
            </FormControl>

            <Box>
              <Text fontWeight="bold" mb={4}>الصلاحيات</Text>
              {mockPermissions.map((section, idx) => (
                <Box key={section.module} mb={4}>
                  <Text color="gray.600" mb={2}>{section.module}</Text>
                  <VStack align="start" spacing={2}>
                    {section.permissions.map(permission => (
                      <Checkbox key={permission.id}>
                        {permission.name}
                      </Checkbox>
                    ))}
                  </VStack>
                  {idx < mockPermissions.length - 1 && <Divider my={4} />}
                </Box>
              ))}
            </Box>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" ml={3} onClick={onClose}>
            إلغاء
          </Button>
          <Button colorScheme="blue">
            حفظ
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
