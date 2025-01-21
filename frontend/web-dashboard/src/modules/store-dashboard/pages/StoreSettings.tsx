import React from 'react';
import {
  Box,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Switch,
  Button,
  Divider,
  SimpleGrid,
  useToast,
  Card,
  CardBody,
  Text,
} from '@chakra-ui/react';

export default function StoreSettings() {
  const toast = useToast();

  const handleSave = () => {
    toast({
      title: 'تم حفظ الإعدادات',
      status: 'success',
      duration: 3000,
    });
  };

  return (
    <Box p={8}>
      <Heading size="lg" mb={6}>إعدادات المتجر</Heading>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
        <Card>
          <CardBody>
            <VStack spacing={6}>
              <Text fontSize="lg" fontWeight="bold" mb={4}>
                الإعدادات الأساسية
              </Text>
              
              <FormControl>
                <FormLabel>نسبة النقاط (لكل ريال)</FormLabel>
                <Input defaultValue="2" type="number" />
              </FormControl>

              <FormControl>
                <FormLabel>الحد الأدنى للمشتريات</FormLabel>
                <Input defaultValue="50" type="number" />
              </FormControl>

              <Divider />

              <FormControl display="flex" alignItems="center">
                <FormLabel mb={0}>تفعيل برنامج النقاط</FormLabel>
                <Switch defaultChecked />
              </FormControl>

              <FormControl display="flex" alignItems="center">
                <FormLabel mb={0}>السماح باستبدال النقاط</FormLabel>
                <Switch defaultChecked />
              </FormControl>
            </VStack>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <VStack spacing={6}>
              <Text fontSize="lg" fontWeight="bold" mb={4}>
                إعدادات الإشعارات
              </Text>

              <FormControl display="flex" alignItems="center">
                <FormLabel mb={0}>إشعارات المعاملات الجديدة</FormLabel>
                <Switch defaultChecked />
              </FormControl>

              <FormControl display="flex" alignItems="center">
                <FormLabel mb={0}>إشعارات استبدال النقاط</FormLabel>
                <Switch defaultChecked />
              </FormControl>

              <FormControl display="flex" alignItems="center">
                <FormLabel mb={0}>التقارير الأسبوعية عبر البريد</FormLabel>
                <Switch />
              </FormControl>
            </VStack>
          </CardBody>
        </Card>

        <Button colorScheme="blue" size="lg" onClick={handleSave}>
          حفظ الإعدادات
        </Button>
      </SimpleGrid>
    </Box>
  );
}
