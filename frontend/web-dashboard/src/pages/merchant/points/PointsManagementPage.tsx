import {
  Box,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  Button,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
  Alert,
  AlertIcon,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FiPlus, FiSearch } from 'react-icons/fi';
import DataTable from '../../../shared/components/ui/tables/DataTable';

const PointsManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [billAmount, setBillAmount] = useState<number>(0);
  const [selectedCustomer, setSelectedCustomer] = useState<{
    name: string;
    phone: string;
    uniqueId: string;
  } | null>(null);
  const toast = useToast();

  // معامل تحويل النقاط (10 نقاط لكل ريال)
  const POINTS_MULTIPLIER = 10;

  // محاكاة البحث عن العميل
  const handleCustomerSearch = (value: string) => {
    setSearchTerm(value);
    // محاكاة طلب API للبحث عن العميل
    if (value) {
      // TODO: استبدال هذا بطلب API حقيقي
      setTimeout(() => {
        setSelectedCustomer({
          name: 'أحمد محمد',
          phone: '0501234567',
          uniqueId: '12345678',
        });
      }, 500);
    } else {
      setSelectedCustomer(null);
    }
  };

  const calculatePoints = (amount: number) => amount * POINTS_MULTIPLIER;

  const handleAddPoints = () => {
    if (!selectedCustomer) {
      toast({
        title: 'خطأ',
        description: 'الرجاء التحقق من بيانات العميل',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const pointsToAdd = calculatePoints(billAmount);
    
    // TODO: تنفيذ إضافة النقاط
    toast({
      title: 'تم إضافة النقاط بنجاح',
      description: `تم إضافة ${pointsToAdd} نقطة للعميل ${selectedCustomer.name}`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  // تعريف أعمدة الجدول
  const columns = [
    { key: 'customerName', label: 'اسم العميل' },
    { key: 'phone', label: 'رقم الجوال' },
    { key: 'pointsAdded', label: 'النقاط المضافة' },
    { key: 'billAmount', label: 'مبلغ الفاتورة' },
    { key: 'date', label: 'التاريخ' },
  ];

  // البيانات التجريبية لسجل النقاط
  const pointsHistory = [
    {
      id: 1,
      customerName: 'أحمد محمد',
      phone: '0501234567',
      pointsAdded: 500,
      billAmount: 50,
      date: new Date().toLocaleDateString('ar-SA')
    },
    {
      id: 2,
      customerName: 'محمد علي',
      phone: '0507654321',
      pointsAdded: 1000,
      billAmount: 100,
      date: new Date().toLocaleDateString('ar-SA')
    },
  ];

  return (
    <Stack spacing={6}>
      <Card>
        <CardHeader>
          <Heading size="md">إضافة نقاط</Heading>
        </CardHeader>
        <CardBody>
          <VStack spacing={6} align="stretch">
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <FormControl>
                <FormLabel>رقم الجوال أو الرقم الفريد</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <FiSearch color="gray.300" />
                  </InputLeftElement>
                  <Input
                    placeholder="أدخل رقم الجوال أو الرقم الفريد"
                    value={searchTerm}
                    onChange={(e) => handleCustomerSearch(e.target.value)}
                  />
                </InputGroup>
              </FormControl>

              <FormControl>
                <FormLabel>مبلغ الفاتورة</FormLabel>
                <NumberInput
                  value={billAmount}
                  onChange={(_, value) => setBillAmount(value)}
                  min={0}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                {billAmount > 0 && (
                  <Text fontSize="sm" color="green.500" mt={1}>
                    سيتم إضافة {calculatePoints(billAmount)} نقطة
                  </Text>
                )}
              </FormControl>
            </SimpleGrid>

            {selectedCustomer && (
              <Alert status="info" borderRadius="md">
                <AlertIcon />
                <VStack align="start" spacing={1}>
                  <Text fontWeight="bold">بيانات العميل:</Text>
                  <Text>الاسم: {selectedCustomer.name}</Text>
                  <Text>رقم الجوال: {selectedCustomer.phone}</Text>
                  <Text>الرقم الفريد: {selectedCustomer.uniqueId}</Text>
                </VStack>
              </Alert>
            )}

            <Box>
              <Button
                colorScheme="blue"
                leftIcon={<FiPlus />}
                onClick={handleAddPoints}
                isDisabled={!selectedCustomer || billAmount <= 0}
              >
                إضافة النقاط
              </Button>
            </Box>
          </VStack>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <Heading size="md">سجل النقاط</Heading>
        </CardHeader>
        <CardBody>
          <DataTable 
            columns={columns}
            data={pointsHistory}
            currentPage={1}
            totalPages={1}
          />
        </CardBody>
      </Card>    </Stack>  );
};

export default PointsManagementPage;
