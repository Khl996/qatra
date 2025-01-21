import React from 'react';
import {
  VStack,
  FormControl,
  FormLabel,
  Switch,
  Card,
  CardBody,
  Text,
  Select,
  Button,
} from '@chakra-ui/react';

export const PreferencesTab = () => {
  return (
    <VStack spacing={6}>
      <Card>
        <CardBody>
          <Text fontSize="lg" fontWeight="bold" mb={4}>تفضيلات التواصل</Text>
          <VStack spacing={4}>
            <FormControl display="flex" alignItems="center">
              <FormLabel mb={0}>إشعارات SMS</FormLabel>
              <Switch defaultChecked />
            </FormControl>
            
            <FormControl display="flex" alignItems="center">
              <FormLabel mb={0}>إشعارات التطبيق</FormLabel>
              <Switch defaultChecked />
            </FormControl>

            <FormControl display="flex" alignItems="center">
              <FormLabel mb={0}>البريد الإلكتروني التسويقي</FormLabel>
              <Switch defaultChecked />
            </FormControl>
          </VStack>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <Text fontSize="lg" fontWeight="bold" mb={4}>تفضيلات التسوق</Text>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>المنتجات المفضلة</FormLabel>
              <Select placeholder="اختر التصنيف">
                <option value="coffee">القهوة</option>
                <option value="food">الطعام</option>
                <option value="drinks">المشروبات</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>أوقات التسوق المفضلة</FormLabel>
              <Select placeholder="اختر الوقت">
                <option value="morning">صباحاً</option>
                <option value="evening">مساءً</option>
                <option value="night">ليلاً</option>
              </Select>
            </FormControl>
          </VStack>
        </CardBody>
      </Card>

      <Button colorScheme="blue" size="lg">
        حفظ التفضيلات
      </Button>
    </VStack>
  );
};
