import {
  Stack,
  Card,
  CardHeader,
  CardBody,
  Heading,
  SimpleGrid,
  Input,
  Button,
  VStack,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  HStack,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';

interface PointTransaction {
  customerId: string;
  points: number;
  amount: number;
}

const PointsManagement = () => {
  const [customerId, setCustomerId] = useState('');
  const [amount, setAmount] = useState('');
  const toast = useToast();

  const calculatePoints = (amount: number) => {
    // مثال: نقطة واحدة لكل 10 ريال
    return Math.floor(amount / 10);
  };

  const handleAddPoints = async () => {
    if (!customerId || !amount) {
      toast({
        title: "خطأ في الإدخال",
        description: "الرجاء إدخال رقم العميل والمبلغ",
        status: "error",
        duration: 3000,
      });
      return;
    }

    const transaction: PointTransaction = {
      customerId,
      amount: parseFloat(amount),
      points: calculatePoints(parseFloat(amount))
    };

    try {
      // TODO: إرسال البيانات للباك إند
      toast({
        title: "تمت العملية بنجاح",
        description: `تم إضافة ${transaction.points} نقطة للعميل`,
        status: "success",
        duration: 3000,
      });
      
      // إعادة تعيين النموذج
      setCustomerId('');
      setAmount('');
    } catch (error) {
      toast({
        title: "حدث خطأ",
        description: "لم يتم إضافة النقاط",
        status: "error",
        duration: 3000,
      });
    }
  };

  return (
    <Stack spacing={6}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
        <Card>
          <CardHeader>
            <Heading size="md">إضافة نقاط</Heading>
          </CardHeader>
          <CardBody>
            <VStack spacing={4}>
              <Input
                placeholder="رقم العميل"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
              />
              <Input
                type="number"
                placeholder="مبلغ الفاتورة"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              {amount && (
                <Text color="gray.600">
                  سيتم إضافة {calculatePoints(parseFloat(amount) || 0)} نقطة
                </Text>
              )}
              <Button
                colorScheme="green"
                width="full"
                onClick={handleAddPoints}
              >
                إضافة النقاط
              </Button>
            </VStack>
          </CardBody>
        </Card>

        {/* إحصائيات النقاط */}
        <Card>
          <CardBody>
            <Stat>
              <StatLabel>إجمالي النقاط الممنوحة</StatLabel>
              <StatNumber>12,345</StatNumber>
            </Stat>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Stat>
              <StatLabel>عدد العملاء النشطين</StatLabel>
              <StatNumber>234</StatNumber>
            </Stat>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* سجل النقاط سيضاف هنا */}
    </Stack>
  );
};

export default PointsManagement;
