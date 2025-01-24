import {
  Box,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  HStack,
  Select,
  Input,
  FormControl,
  FormLabel,
  Button,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FiDownload, FiFilter } from 'react-icons/fi';
import DataTable from '../../../shared/components/ui/tables/DataTable';

const SalesPage = () => {
  const [dateRange, setDateRange] = useState({
    from: '',
    to: '',
  });

  // بيانات تجريبية للمبيعات
  const salesData = [
    {
      id: '1',
      date: '2024-01-23',
      customerName: 'أحمد محمد',
      amount: 500,
      pointsEarned: 5000,
      paymentMethod: 'بطاقة',
      status: 'مكتمل'
    },
    {
      id: '2',
      date: '2024-01-23',
      customerName: 'محمد علي',
      amount: 750,
      pointsEarned: 7500,
      paymentMethod: 'نقداً',
      status: 'مكتمل'
    },
    // يمكن إضافة المزيد من البيانات
  ];

  const columns = [
    { key: 'date', label: 'التاريخ' },
    { key: 'customerName', label: 'اسم العميل' },
    { key: 'amount', label: 'المبلغ' },
    { key: 'pointsEarned', label: 'النقاط المكتسبة' },
    { key: 'paymentMethod', label: 'طريقة الدفع' },
    { key: 'status', label: 'الحالة' },
  ];

  const handleExportData = () => {
    // TODO: تنفيذ تصدير البيانات
    console.log('Exporting sales data...');
  };

  return (
    <Stack spacing={6}>
      <Card>
        <CardHeader>
          <HStack justify="space-between">
            <Heading size="md">سجل المبيعات</Heading>
            <HStack spacing={4}>
              <Tooltip label="تصدير البيانات">
                <IconButton
                  aria-label="تصدير البيانات"
                  icon={<FiDownload />}
                  onClick={handleExportData}
                />
              </Tooltip>
              <Button leftIcon={<FiFilter />}>تصفية</Button>
            </HStack>
          </HStack>
        </CardHeader>
        <CardBody>
          <Stack spacing={6}>
            <HStack spacing={4}>
              <FormControl maxW="200px">
                <FormLabel>من تاريخ</FormLabel>
                <Input
                  type="date"
                  value={dateRange.from}
                  onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                />
              </FormControl>
              <FormControl maxW="200px">
                <FormLabel>إلى تاريخ</FormLabel>
                <Input
                  type="date"
                  value={dateRange.to}
                  onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                />
              </FormControl>
              <FormControl maxW="200px">
                <FormLabel>طريقة الدفع</FormLabel>
                <Select placeholder="الكل">
                  <option value="cash">نقداً</option>
                  <option value="card">بطاقة</option>
                </Select>
              </FormControl>
            </HStack>

            <DataTable
              columns={columns}
              data={salesData}
              currentPage={1}
              totalPages={1}
            />
          </Stack>
        </CardBody>
      </Card>
    </Stack>
  );
};

export default SalesPage;
