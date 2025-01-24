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
  VStack,
  Select,
  useToast,
  Text,
  Divider,
  Alert,
  AlertIcon,
  Stack,
  Checkbox,
  CheckboxGroup,
} from '@chakra-ui/react';
import { useState } from 'react';

interface EditEmployeePermissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  employeeId?: number;
  employeeName?: string;
}

const EditEmployeePermissionsModal = ({ 
  isOpen, 
  onClose, 
  employeeId, 
  employeeName 
}: EditEmployeePermissionsModalProps) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');

  const roles = [
    { id: 'admin', name: 'مدير نظام' },
    { id: 'store_manager', name: 'مشرف متاجر' },
    { id: 'accountant', name: 'محاسب' },
    { id: 'support', name: 'دعم فني' },
  ];

  const permissions = {
    users: [
      { id: 'view_users', label: 'عرض المستخدمين' },
      { id: 'edit_users', label: 'تعديل المستخدمين' },
    ],
    stores: [
      { id: 'view_stores', label: 'عرض المتاجر' },
      { id: 'edit_stores', label: 'تعديل المتاجر' },
    ],
    finance: [
      { id: 'view_reports', label: 'عرض التقارير' },
      { id: 'manage_transactions', label: 'إدارة المعاملات' },
    ],
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // سيتم إضافة منطق حفظ البيانات هنا
      toast({
        title: 'تم تحديث الصلاحيات بنجاح',
        status: 'success',
        duration: 3000,
      });
      onClose();
    } catch (error) {
      toast({
        title: 'حدث خطأ',
        description: 'لم نتمكن من تحديث الصلاحيات',
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
        <ModalHeader>تعديل صلاحيات الموظف</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={6} align="stretch">
            <Text>
              تعديل صلاحيات الموظف: <strong>{employeeName}</strong>
            </Text>

            <Alert status="info" borderRadius="md">
              <AlertIcon />
              سيتم تطبيق الصلاحيات الجديدة فور حفظ التغييرات
            </Alert>

            <FormControl>
              <FormLabel>الدور الوظيفي</FormLabel>
              <Select 
                value={selectedRole} 
                onChange={(e) => setSelectedRole(e.target.value)}
                placeholder="اختر الدور الوظيفي"
              >
                {roles.map(role => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <Divider />

            <Text fontWeight="bold">الصلاحيات المخصصة</Text>

            <Stack spacing={6}>
              {Object.entries(permissions).map(([category, perms]) => (
                <FormControl key={category}>
                  <FormLabel>{category === 'users' ? 'المستخدمين' : category === 'stores' ? 'المتاجر' : 'المالية'}</FormLabel>
                  <CheckboxGroup>
                    <Stack spacing={2}>
                      {perms.map(perm => (
                        <Checkbox key={perm.id} value={perm.id}>
                          {perm.label}
                        </Checkbox>
                      ))}
                    </Stack>
                  </CheckboxGroup>
                </FormControl>
              ))}
            </Stack>
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
            حفظ التغييرات
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditEmployeePermissionsModal;
