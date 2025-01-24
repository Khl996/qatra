import {
  Box,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  SimpleGrid,
  Button,
  Select,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Icon,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FiDownload, FiFileText, FiUsers, FiDollarSign, FiStar } from 'react-icons/fi';

const ReportsPage = () => {
  const [reportType, setReportType] = useState('sales');
  const [dateRange, setDateRange] = useState({
    from: '',
    to: ''
  });

  const reports = [
    {
      id: 'sales',
      title: 'تقرير المبيعات',
      icon: FiDollarSign,
      description: 'تفاصيل المبيعات والإيرادات'
    },
    {
      id: 'points',
      title: 'تقرير النقاط',
      icon: FiStar,
      description: 'حركات النقاط وعمليات الاستبدال'
    },
    {
      id: 'customers',
      title: 'تقرير العملاء',
      icon: FiUsers,
      description: 'نشاط العملاء والنقاط المكتسبة'
    }
  ];

  const handleGenerateReport = () => {
    console.log('Generating report:', {
      type: reportType,
      dateRange
    });
  };

  return (
    <Stack spacing={6}>
      <Card>
        <CardHeader>
          <Heading size="md">التقارير</Heading>
        </CardHeader>
        <CardBody>
          <Stack spacing={6}>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              {reports.map((report) => (
                <Card
                  key={report.id}
                  variant="outline"
                  cursor="pointer"
                  onClick={() => setReportType(report.id)}
                  bg={reportType === report.id ? 'blue.50' : 'transparent'}
                  borderColor={reportType === report.id ? 'blue.500' : 'gray.200'}
                >
                  <CardBody>
                    <Stack spacing={4}>
                      <Icon
                        as={report.icon}
                        boxSize={6}
                        color={reportType === report.id ? 'blue.500' : 'gray.500'}
                      />
                      <Stack spacing={1}>
                        <Heading size="sm">{report.title}</Heading>
                        <Text fontSize="sm" color="gray.600">
                          {report.description}
                        </Text>
                      </Stack>
                    </Stack>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>

            <Card variant="outline">
              <CardBody>
                <Stack spacing={6}>
                  <Heading size="sm">خيارات التقرير</Heading>
                  <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                    <FormControl>
                      <FormLabel>من تاريخ</FormLabel>
                      <Input
                        type="date"
                        value={dateRange.from}
                        onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>إلى تاريخ</FormLabel>
                      <Input
                        type="date"
                        value={dateRange.to}
                        onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>تنسيق التقرير</FormLabel>
                      <Select defaultValue="pdf">
                        <option value="pdf">PDF</option>
                        <option value="excel">Excel</option>
                      </Select>
                    </FormControl>
                  </SimpleGrid>

                  <HStack justify="flex-end">
                    <Button
                      colorScheme="blue"
                      leftIcon={<FiDownload />}
                      onClick={handleGenerateReport}
                      isDisabled={!dateRange.from || !dateRange.to}
                    >
                      تحميل التقرير
                    </Button>
                  </HStack>
                </Stack>
              </CardBody>
            </Card>
          </Stack>
        </CardBody>
      </Card>
    </Stack>
  );
};

export default ReportsPage;
