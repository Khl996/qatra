import { Box, Heading, Card, CardHeader, CardBody, FormControl, FormLabel, Input, Button, VStack } from '@chakra-ui/react';

const MerchantSettings = () => {
  return (
    <Box p={4}>
      <Heading mb={6} size="lg">إعدادات المتجر</Heading>
      <Card>
        <CardHeader>
          <Heading size="md">المعلومات الأساسية</Heading>
        </CardHeader>
        <CardBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>اسم المتجر</FormLabel>
              <Input placeholder="اسم المتجر" />
            </FormControl>
            <FormControl>
              <FormLabel>البريد الإلكتروني</FormLabel>
              <Input type="email" placeholder="البريد الإلكتروني" />
            </FormControl>
            <FormControl>
              <FormLabel>رقم الجوال</FormLabel>
              <Input type="tel" placeholder="رقم الجوال" />
            </FormControl>
            <Button colorScheme="blue" alignSelf="start">حفظ التغييرات</Button>
          </VStack>
        </CardBody>
      </Card>
    </Box>
  );
};

export default MerchantSettings;
