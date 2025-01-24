import {
  Box,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Button,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  HStack,
  Divider,
  SimpleGrid,
} from '@chakra-ui/react';
import { FiDownload, FiCreditCard } from 'react-icons/fi';

const FinancePage = () => {
  // بيانات تجريبية للفواتير
  const invoices = [
    {
      id: 'INV-2024-01',
      period: 'يناير 2024',
      totalSales: 10000,
      commission: 500, // 5%
      dueDate: '2024-02-05',
      status: 'pending', // pending, paid, overdue
      paidAt: null
    },
    {
      id: 'INV-2023-12',
      period: 'ديسمبر 2023',
      totalSales: 12000,
      commission: 600,
      dueDate: '2024-01-05',
      status: 'paid',
      paidAt: '2024-01-03'
    }
  ];

  const handlePayInvoice = (invoiceId: string) => {
    // TODO: فتح بوابة الدفع
    console.log('Paying invoice:', invoiceId);
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    // TODO: تحميل الفاتورة
    console.log('Downloading invoice:', invoiceId);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'yellow', text: 'في انتظار الدفع' },
      paid: { color: 'green', text: 'مدفوعة' },
      overdue: { color: 'red', text: 'متأخرة' }
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge colorScheme={config.color}>{config.text}</Badge>;
  };

  return (
    <Stack spacing={6}>
      <Card>
        <CardHeader>
          <Heading size="md">الفواتير الشهرية</Heading>
        </CardHeader>
        <CardBody>
          <Text mb={4}>
            يتم إصدار الفاتورة في بداية كل شهر ويستحق دفعها خلال 5 أيام.
            نسبة العمولة 5% من إجمالي المبيعات.
          </Text>
          
          {/* الفاتورة الحالية */}
          <Card variant="outline" mb={6}>
            <CardBody>
              <Stack spacing={4}>
                <HStack justify="space-between">
                  <Heading size="sm">الفاتورة الحالية</Heading>
                  {getStatusBadge('pending')}
                </HStack>
                <Divider />
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                  <Stat>
                    <StatLabel>إجمالي المبيعات</StatLabel>
                    <StatNumber>10,000 ر.س</StatNumber>
                  </Stat>
                  <Stat>
                    <StatLabel>العمولة المستحقة (5%)</StatLabel>
                    <StatNumber>500 ر.س</StatNumber>
                  </Stat>
                  <Stat>
                    <StatLabel>تاريخ الاستحقاق</StatLabel>
                    <StatNumber>5 فبراير 2024</StatNumber>
                    <StatHelpText>متبقي 3 أيام</StatHelpText>
                  </Stat>
                </SimpleGrid>
                <HStack spacing={4}>
                  <Button
                    leftIcon={<FiCreditCard />}
                    colorScheme="blue"
                    onClick={() => handlePayInvoice('INV-2024-01')}
                  >
                    دفع الفاتورة
                  </Button>
                  <Button
                    leftIcon={<FiDownload />}
                    variant="outline"
                    onClick={() => handleDownloadInvoice('INV-2024-01')}
                  >
                    تحميل PDF
                  </Button>
                </HStack>
              </Stack>
            </CardBody>
          </Card>

          {/* سجل الفواتير */}
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>رقم الفاتورة</Th>
                <Th>الفترة</Th>
                <Th isNumeric>إجمالي المبيعات</Th>
                <Th isNumeric>العمولة</Th>
                <Th>تاريخ الاستحقاق</Th>
                <Th>الحالة</Th>
                <Th>الإجراءات</Th>
              </Tr>
            </Thead>
            <Tbody>
              {invoices.map((invoice) => (
                <Tr key={invoice.id}>
                  <Td>{invoice.id}</Td>
                  <Td>{invoice.period}</Td>
                  <Td isNumeric>{invoice.totalSales.toLocaleString()} ر.س</Td>
                  <Td isNumeric>{invoice.commission.toLocaleString()} ر.س</Td>
                  <Td>{invoice.dueDate}</Td>
                  <Td>{getStatusBadge(invoice.status)}</Td>
                  <Td>
                    <Button
                      size="sm"
                      leftIcon={<FiDownload />}
                      variant="ghost"
                      onClick={() => handleDownloadInvoice(invoice.id)}
                    >
                      تحميل
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </Stack>
  );
};

export default FinancePage;
