import React from 'react';
import {
  Box,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Switch,
  Button,
  Divider,
  Text,
  useToast,
} from '@chakra-ui/react';
import { DashboardLayout } from '../../components/layouts/DashboardLayout';

export default function SettingsPage() {
  const toast = useToast();

  const handleSave = () => {
    toast({
      title: 'تم حفظ الإعدادات',
      status: 'success',
      duration: 3000,
    });
  };

  return (
    <DashboardLayout>
      <Box p={8}>
        <Heading size="lg" mb={6}>إعدادات النظام</Heading>

        <VStack spacing={6} align="stretch">
          <Box bg="white" p={6} borderRadius="lg" boxShadow="sm">
            <Text fontSize="lg" fontWeight="bold" mb={4}>
              إعدادات النقاط
            </Text>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>قيمة النقطة (بالريال)</FormLabel>
                <NumberInput defaultValue={0.1} min={0.1} step={0.1}>
                  <NumberInputField />
                </NumberInput>
              </FormControl>

              <FormControl>
                <FormLabel>الحد الأدنى للنقاط المطلوبة للاستبدال</FormLabel>
                <NumberInput defaultValue={100} min={1}>
                  <NumberInputField />
                </NumberInput>
              </FormControl>
            </VStack>
          </Box>

          <Divider />

          <Box bg="white" p={6} borderRadius="lg" boxShadow="sm">
            <Text fontSize="lg" fontWeight="bold" mb={4}>
              إعدادات النظام
            </Text>
            <VStack spacing={4}>
              <FormControl display="flex" alignItems="center">
                <FormLabel mb={0}>تفعيل التسجيل التلقائي للمستخدمين</FormLabel>
                <Switch defaultChecked />
              </FormControl>

              <FormControl display="flex" alignItems="center">
                <FormLabel mb={0}>تفعيل الإشعارات</FormLabel>
                <Switch defaultChecked />
              </FormControl>
            </VStack>
          </Box>

          <Button colorScheme="blue" size="lg" onClick={handleSave}>
            حفظ الإعدادات
          </Button>
        </VStack>
      </Box>
    </DashboardLayout>
  );
}
