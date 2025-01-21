import React from 'react';
import {
  Box,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Card,
  CardBody,
  useToast,
  Text,
  Divider,
} from '@chakra-ui/react';

export default function AddPoints() {
  const toast = useToast();
  const [userInfo, setUserInfo] = React.useState<any>(null);
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [amount, setAmount] = React.useState('');

  const handleSearch = () => {
    // محاكاة البحث عن المستخدم
    setUserInfo({
      name: 'أحمد محمد',
      id: '123456',
      currentPoints: 450
    });
  };

  const handleAddPoints = () => {
    toast({
      title: 'تمت العملية بنجاح',
      description: `تم إضافة ${Math.floor(Number(amount) * 2)} نقطة للعميل`,
      status: 'success',
      duration: 3000,
    });
  };

  return (
    <Box p={8}>
      <Heading mb={6}>إضافة نقاط</Heading>

      <Card maxW="600px" mx="auto">
        <CardBody>
          <VStack spacing={6}>
            <FormControl>
              <FormLabel>رقم جوال العميل</FormLabel>
              <Input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="05xxxxxxxx"
                mb={2}
              />
              <Button colorScheme="blue" onClick={handleSearch}>
                بحث
              </Button>
            </FormControl>

            {userInfo && (
              <>
                <Divider />
                <Box w="100%">
                  <Text fontWeight="bold" mb={2}>معلومات العميل</Text>
                  <Text>الاسم: {userInfo.name}</Text>
                  <Text>رقم العضوية: {userInfo.id}</Text>
                  <Text>النقاط الحالية: {userInfo.currentPoints}</Text>
                </Box>
                <Divider />
                <FormControl>
                  <FormLabel>مبلغ المشتريات</FormLabel>
                  <Input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="أدخل المبلغ"
                    type="number"
                  />
                  {amount && (
                    <Text fontSize="sm" color="blue.500" mt={2}>
                      سيتم إضافة {Math.floor(Number(amount) * 2)} نقطة
                    </Text>
                  )}
                </FormControl>

                <Button
                  colorScheme="green"
                  w="100%"
                  onClick={handleAddPoints}
                  isDisabled={!amount}
                >
                  إضافة النقاط
                </Button>
              </>
            )}
          </VStack>
        </CardBody>
      </Card>
    </Box>
  );
}
