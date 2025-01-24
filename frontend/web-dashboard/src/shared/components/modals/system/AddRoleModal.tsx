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

  // تعريف الصلاحيات المتاحة
  const permissions = {
    users: [
      { id: 'view_users', label: 'عرض المستخدمين' },
      { id: 'edit_users', label: 'تعديل المستخدمين' },
      { id: 'delete_users', label: 'حذف المستخدمين' }
    ],
    stores: [
      { id: 'view_stores', label: 'عرض المتاجر' },
      { id: 'approve_stores', label: 'الموافقة على المتاجر' },
      { id: 'edit_stores', label: 'تعديل المتاجر' },
      { id: 'manage_commissions', label: 'إدارة العمولات' }
    ],
    finance: [
      { id: 'view_reports', label: 'عرض التقارير المالية' },
      { id: 'manage_transactions', label: 'إدارة المعاملات' },
      { id: 'export_reports', label: 'تصدير التقارير' }
    ],
    system: [
      { id: 'manage_settings', label: 'إدارة إعدادات النظام' },
      { id: 'manage_roles', label: 'إدارة الصلاحيات' },
      { id: 'view_logs', label: 'عرض سجلات النظام' }
    ]
  };

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
          <VStack spacing={6} align="stretch">
            <FormControl isRequired>
              <FormLabel>اسم الدور</FormLabel>
              <Input placeholder="أدخل اسم الدور" />
            </FormControl>

            <FormControl>
              <FormLabel>وصف الدور</FormLabel>
              <Input placeholder="أدخل وصفاً مختصراً للدور" />
            </FormControl>

            <Divider />

            <Text fontWeight="bold">الصلاحيات</Text>

            <Grid templateColumns="repeat(1, 1fr)" gap={6}>
              {/* إدارة المستخدمين */}
              <FormControl>
                <FormLabel>إدارة المستخدمين</FormLabel>
                <CheckboxGroup>
                  <VStack align="start">
                    {permissions.users.map(perm => (
                      <Checkbox key={perm.id} value={perm.id}>
                        {perm.label}
                      </Checkbox>
                    ))}
                  </VStack>
                </CheckboxGroup>
              </FormControl>

              {/* إدارة المتاجر */}
              <FormControl>
                <FormLabel>إدارة المتاجر</FormLabel>
                <CheckboxGroup>
                  <VStack align="start">
                    {permissions.stores.map(perm => (
                      <Checkbox key={perm.id} value={perm.id}>
                        {perm.label}
                      </Checkbox>
                    ))}
                  </VStack>
                </CheckboxGroup>
              </FormControl>

              {/* الإدارة المالية */}
              <FormControl>
                <FormLabel>الإدارة المالية</FormLabel>
                <CheckboxGroup>
                  <VStack align="start">
                    {permissions.finance.map(perm => (
                      <Checkbox key={perm.id} value={perm.id}>
                        {perm.label}
                      </Checkbox>
                    ))}
                  </VStack>
                </CheckboxGroup>
              </FormControl>

              {/* إدارة النظام */}
              <FormControl>
                <FormLabel>إدارة النظام</FormLabel>
                <CheckboxGroup>
                  <VStack align="start">
                    {permissions.system.map(perm => (
                      <Checkbox key={perm.id} value={perm.id}>
                        {perm.label}
                      </Checkbox>
                    ))}
                  </VStack>
                </CheckboxGroup>
              </FormControl>
            </Grid>
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
            إضافة الدور
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddRoleModal;
