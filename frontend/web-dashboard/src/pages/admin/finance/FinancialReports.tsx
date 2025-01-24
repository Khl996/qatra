import {
  Box,
  Heading,
  Card,
  CardHeader,
  CardBody,
  Stack,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  HStack,
  Select,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { FiDownload, FiMoreVertical, FiDollarSign, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import { LineChart } from '../../../shared/components/ui/charts';

const FinancialReports = () => {
  const financialStats = [
    {
      label: 'إجمالي الإيرادات',
      value: '125,450 ر.س',
      change: '+15%',
      isIncrease: true
    },
    {
      label: 'إجمالي العمولات',
      value: '12,545 ر.س',
      change: '+12%',
      isIncrease: true
    },
    {
      label: 'متوسط العمولة',
      value: '10%',
      change: '-2%',
      isIncrease: false
    },
    {
      label: 'العمليات المالية',
      value: '1,234',
      change: '+8%',
      isIncrease: true
    }
  ];

  const transactions = [
    {
      id: 1,
      store: 'مطعم السعادة',
      date: '2024-01-23',
      amount: '1,500',
      commission: '150',
      status: 'completed'
    },
    {
      id: 2,
      store: 'قهوة المختصين',
      date: '2024-01-22',
      amount: '2,300',
      commission: '230',
      status: 'pending'
    }
  ];

  const revenueData = {
    labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
    datasets: [
      {
        label: 'الإيرادات',
        data: [30000, 45000, 35000, 50000, 49000, 60000],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'العمولات',
        data: [3000, 4500, 3500, 5000, 4900, 6000],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      }
    ],
  };

  return (
    <Stack spacing={6}>
      <Flex justify="space-between" align="center">
        <Heading size="lg">التقارير المالية</Heading>
        <HStack spacing={4}>
          <Select defaultValue="month" w="200px">
            <option value="month">الشهر الحالي</option>
            <option value="quarter">الربع الحالي</option>
            <option value="year">السنة الحالية</option>
          </Select>
          <Button leftIcon={<FiDownload />} colorScheme="blue">
            تصدير التقرير
          </Button>
        </HStack>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
        {financialStats.map((stat, index) => (
          <Card key={index}>
            <CardBody>
              <Stat>
                <StatLabel>{stat.label}</StatLabel>
                <StatNumber>{stat.value}</StatNumber>
                <StatHelpText color={stat.isIncrease ? 'green.500' : 'red.500'}>
                  <Box as="span" mr={2}>
                    {stat.isIncrease ? <FiTrendingUp /> : <FiTrendingDown />}
                  </Box>
                  {stat.change} مقارنة بالفترة السابقة
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>

      <Card>
        <CardHeader>
          <Heading size="md">تحليل الإيرادات والعمولات</Heading>
        </CardHeader>
        <CardBody>
          <Box h="300px">
            <LineChart data={revenueData} />
          </Box>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <Heading size="md">آخر العمليات المالية</Heading>
        </CardHeader>
        <CardBody>
          <Table>
            <Thead>
              <Tr>
                <Th>المتجر</Th>
                <Th>التاريخ</Th>
                <Th isNumeric>المبلغ</Th>
                <Th isNumeric>العمولة</Th>
                <Th>الحالة</Th>
                <Th>الإجراءات</Th>
              </Tr>
            </Thead>
            <Tbody>
              {transactions.map((transaction) => (
                <Tr key={transaction.id}>
                  <Td>{transaction.store}</Td>
                  <Td>{transaction.date}</Td>
                  <Td isNumeric>{transaction.amount} ر.س</Td>
                  <Td isNumeric>{transaction.commission} ر.س</Td>
                  <Td>
                    <Button
                      size="sm"
                      colorScheme={transaction.status === 'completed' ? 'green' : 'yellow'}
                      variant="subtle"
                    >
                      {transaction.status === 'completed' ? 'مكتمل' : 'معلق'}
                    </Button>
                  </Td>
                  <Td>
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        icon={<FiMoreVertical />}
                        variant="ghost"
                        size="sm"
                      />
                      <MenuList>
                        <MenuItem>تفاصيل العملية</MenuItem>
                        <MenuItem>طباعة الإيصال</MenuItem>
                        <MenuItem>تصدير PDF</MenuItem>
                      </MenuList>
                    </Menu>
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

export default FinancialReports;
