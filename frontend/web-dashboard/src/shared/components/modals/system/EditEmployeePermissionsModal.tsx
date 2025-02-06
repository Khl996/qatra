import { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  Select,
  Text,
  Alert,
  AlertIcon,
  Divider,
  Stack,
  useToast
} from '@chakra-ui/react';
import api from '../../../../services/api';

interface EditEmployeePermissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  employeeId?: string;
  employeeName?: string;  // إضافة اسم الموظف كخاصية اختيارية
}

const EditEmployeePermissionsModal = ({ isOpen, onClose, employeeId, employeeName = 'غير محدد' }: EditEmployeePermissionsModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [error, setError] = useState('');
  const toast = useToast();

  useEffect(() => {
    if (employeeId && isOpen) {
      fetchEmployeeData();
    }
  }, [employeeId, isOpen]);

  const fetchEmployeeData = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/api/admin/employees/${employeeId}`);
      setRole(response.data.role);
      setSelectedPermissions(response.data.permissions || []);
    } catch (error) {
      toast({
        title: "خطأ في جلب البيانات",
        status: "error",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await api.put(`/api/admin/employees/${employeeId}/permissions`, {
        role,
        permissions: selectedPermissions
      });
      toast({
        title: "تم تحديث الصلاحيات بنجاح",
        status: "success",
        duration: 3000,
      });
      onClose();
    } catch (error) {
      setError('حدث خطأ أثناء تحديث الصلاحيات');
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
          {error && (
            <Alert status="error" mb={4}>
              <AlertIcon />
              {error}
            </Alert>
          )}

          <FormControl mb={4}>
            <FormLabel>الدور الوظيفي</FormLabel>
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="اختر الدور"
            >
              <option value="admin">مدير النظام</option>
              <option value="supervisor">مشرف</option>
              <option value="support">دعم فني</option>
            </Select>
          </FormControl>

          <Divider my={4} />

          <Text fontSize="lg" fontWeight="bold" mb={4}>
            الصلاحيات
          </Text>

          <Stack spacing={6}>
            {/* إدارة المستخدمين */}
            <FormControl as="fieldset">
              <FormLabel as="legend">المستخدمين</FormLabel>
              <VStack align="start">
                <CheckboxGroup value={selectedPermissions} onChange={(values) => setSelectedPermissions(values as string[])}>
                  <Checkbox value="users_view">عرض المستخدمين</Checkbox>
                  <Checkbox value="users_manage">إدارة المستخدمين</Checkbox>
                </CheckboxGroup>
              </VStack>
            </FormControl>

            {/* إدارة المتاجر */}
            <FormControl as="fieldset">
              <FormLabel as="legend">المتاجر</FormLabel>
              <VStack align="start">
                <CheckboxGroup value={selectedPermissions} onChange={(values) => setSelectedPermissions(values as string[])}>
                  <Checkbox value="stores_view">عرض المتاجر</Checkbox>
                  <Checkbox value="stores_manage">إدارة المتاجر</Checkbox>
                  <Checkbox value="stores_approve">الموافقة على المتاجر</Checkbox>
                </CheckboxGroup>
              </VStack>
            </FormControl>

            {/* التقارير والإحصائيات */}
            <FormControl as="fieldset">
              <FormLabel as="legend">التقارير</FormLabel>
              <VStack align="start">
                <CheckboxGroup value={selectedPermissions} onChange={(values) => setSelectedPermissions(values as string[])}>
                  <Checkbox value="reports_view">عرض التقارير</Checkbox>
                  <Checkbox value="reports_export">تصدير التقارير</Checkbox>
                </CheckboxGroup>
              </VStack>
            </FormControl>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" ml={3} onClick={handleSubmit} isLoading={isLoading}>
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

export default EditEmployeePermissionsModal;
