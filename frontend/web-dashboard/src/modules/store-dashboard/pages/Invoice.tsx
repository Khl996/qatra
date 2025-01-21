import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Divider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useToast,
} from '@chakra-ui/react';
import { FiDownload, FiPrinter } from 'react-icons/fi';

export default function InvoicePage() {
  const toast = useToast();
  
  const invoiceData = {
    invoiceNumber: 'INV-2024-001',
    date: '2024/01/21',
    dueDate: '2024/02/21',
    storeName: 'كافيه السعادة',
    period: 'يناير 2024',
    totalSales: 45678.90,
    commission: 2283.95,
    vat: 342.59,
    totalDue: 2626.54
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    toast({
      title: 'جاري تحميل الفاتورة',
      status: 'success',
      duration: 3000,
    });
  };

  return (
    <Box p={8} maxW="800px" mx="auto">
      <HStack justify="space-between" mb={8} className="no-print">
        <Text fontSize="2xl" fontWeight="bold">الفاتورة</Text>
        <HStack spacing={4}>
          <Button leftIcon={<FiPrinter />} onClick={handlePrint}>
            طباعة
          </Button>
          <Button leftIcon={<FiDownload />} onClick={handleDownload}>
            تحميل PDF
          </Button>
        </HStack>
      </HStack>

      <VStack spacing={6} align="stretch" bg="white" p={8} borderRadius="lg" shadow="sm">
        <HStack justify="space-between">
          <Box>
            <Text fontSize="lg" fontWeight="bold">فاتورة رقم: {invoiceData.invoiceNumber}</Text>
            <Text color="gray.600">الفترة: {invoiceData.period}</Text>
          </Box>
          <Box textAlign="left">
            <Text>تاريخ الإصدار: {invoiceData.date}</Text>
            <Text>تاريخ الاستحقاق: {invoiceData.dueDate}</Text>
          </Box>
        </HStack>

        <Divider />

        <Box>
          <Text fontWeight="bold" mb={2}>معلومات المتجر</Text>
          <Text>{invoiceData.storeName}</Text>
        </Box>

        <Table variant="simple" mt={6}>
          <Thead>
            <Tr>
              <Th>البيان</Th>
              <Th isNumeric>المبلغ</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>إجمالي المبيعات</Td>
              <Td isNumeric>{invoiceData.totalSales.toLocaleString()} ريال</Td>
            </Tr>
            <Tr>
              <Td>العمولة (5%)</Td>
              <Td isNumeric>{invoiceData.commission.toLocaleString()} ريال</Td>
            </Tr>
            <Tr>
              <Td>ضريبة القيمة المضافة (15%)</Td>
              <Td isNumeric>{invoiceData.vat.toLocaleString()} ريال</Td>
            </Tr>
          </Tbody>
        </Table>

        <Divider />

        <HStack justify="space-between" fontSize="lg" fontWeight="bold">
          <Text>الإجمالي المستحق</Text>
          <Text>{invoiceData.totalDue.toLocaleString()} ريال</Text>
        </HStack>

        <Box mt={8} p={4} bg="gray.50" borderRadius="md">
          <Text fontSize="sm">ملاحظات:</Text>
          <Text fontSize="sm" color="gray.600">
            - يرجى تحويل المبلغ المستحق قبل تاريخ الاستحقاق
          </Text>
          <Text fontSize="sm" color="gray.600">
            - في حال وجود أي استفسار يرجى التواصل مع الدعم الفني
          </Text>
        </Box>
      </VStack>
    </Box>
  );
}
