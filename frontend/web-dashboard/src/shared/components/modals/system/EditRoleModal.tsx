import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input, VStack, Checkbox, CheckboxGroup, Grid, useToast, Divider, Text, Alert, AlertIcon, Stack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

interface EditRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  roleId?: string;
}

const EditRoleModal = ({ isOpen, onClose, roleId }: EditRoleModalProps) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // تعريف الصلاحيات المتاحة
  const permissions = {
    users: [
      { id: 'view_users', label: 'عرض المستخدمين', defaultChecked: true },
      { id: 'edit_users', label: 'تعديل المستخدمين', defaultChecked: true },
      { id: 'delete_users', label: 'حذف المستخدمين', defaultChecked: false }
    ],
    stores: [
      { id: 'view_stores', label: 'عرض المتاجر', defaultChecked: true },
      { id: 'approve_stores', label: 'الموافقة على المتاجر', defaultChecked: true },
      { id: 'edit_stores', label: 'تعديل المتاجر', defaultChecked: true },
      { id: 'manage_commissions', label: 'إدارة العمولات', defaultChecked: false }
    ],
    finance: [
      { id: 'view_reports', label: 'عرض التقارير المالية', defaultChecked: true },
      { id: 'manage_transactions', label: 'إدارة المعاملات', defaultChecked: false },
      { id: 'export_reports', label: 'تصدير التقارير', defaultChecked: true }
    ],
    system: [
      { id: 'manage_settings', label: 'إدارة إعدادات النظام', defaultChecked: false },
      { id: 'manage_roles', label: 'إدارة الصلاحيات', defaultChecked: false },
      { id: 'view_logs', label: 'عرض سجلات النظام', defaultChecked: true }
    ]
  };

  useEffect(() => {
    if (roleId) {
      // جلب بيانات الدور
    }
  }, [roleId]);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // سيتم إضافة منطق حفظ البيانات هنا
      toast({
        title: 'تم تحديث الدور بنجاح',
        status: 'success',
        duration: 3000,
      });
      onClose();
    } catch (error) {
      toast({
        title: 'حدث خطأ',
        description: 'لم نتمكن من تحديث الدور',
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
        <ModalHeader>تعديل الدور</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={6} align="stretch">
            <Text>
              تعديل الدور: <strong>{roleId}</strong>
            </Text>

            <Alert status="info" borderRadius="md">
              <AlertIcon />
              سيتم تطبيق التغييرات على جميع المستخدمين المرتبطين بهذا الدور
            </Alert>

            <FormControl isRequired>
              <FormLabel>اسم الدور</FormLabel>
              <Input defaultValue={roleId} placeholder="أدخل اسم الدور" />
            </FormControl>

            <Divider />

            <Text fontWeight="bold">الصلاحيات</Text>

            <Stack spacing={6}>
              {/* إدارة المستخدمين */}
              <FormControl>
                <FormLabel fontWeight="bold">إدارة المستخدمين</FormLabel>
                <VStack align="start" spacing={2}>
                  {permissions.users.map(perm => (
                    <Checkbox 
                      key={perm.id} 
                      defaultChecked={perm.defaultChecked}
                    >
                      {perm.label}
                    </Checkbox>
                  ))}
                </VStack>
              </FormControl>

              {/* إدارة المتاجر */}
              <FormControl>
                <FormLabel fontWeight="bold">إدارة المتاجر</FormLabel>
                <VStack align="start" spacing={2}>
                  {permissions.stores.map(perm => (
                    <Checkbox 
                      key={perm.id} 
                      defaultChecked={perm.defaultChecked}
                    >
                      {perm.label}
                    </Checkbox>
                  ))}
                </VStack>
              </FormControl>

              {/* الإدارة المالية */}
              <FormControl>
                <FormLabel fontWeight="bold">الإدارة المالية</FormLabel>
                <VStack align="start" spacing={2}>
                  {permissions.finance.map(perm => (
                    <Checkbox 
                      key={perm.id} 
                      defaultChecked={perm.defaultChecked}
                    >
                      {perm.label}
                    </Checkbox>
                  ))}
                </VStack>
              </FormControl>

              {/* إدارة النظام */}
              <FormControl>
                <FormLabel fontWeight="bold">إدارة النظام</FormLabel>
                <VStack align="start" spacing={2}>
                  {permissions.system.map(perm => (
                    <Checkbox 
                      key={perm.id} 
                      defaultChecked={perm.defaultChecked}
                    >
                      {perm.label}
                    </Checkbox>
                  ))}
                </VStack>
              </FormControl>
            </Stack>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" ml={3} isLoading={isLoading} onClick={handleSubmit}>
            حفظ التغييرات
          </Button>
          <Button variant="ghost" onClick={onClose}>
            إلغاء
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditRoleModal;
