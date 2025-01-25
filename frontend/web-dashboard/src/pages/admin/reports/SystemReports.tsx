import {
  Box,
  Stack,
  Card,
  CardHeader,
  CardBody,
  Heading,
  HStack,
  Button,
  Select,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  SimpleGrid,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from '@chakra-ui/react';
import { LineChart, DoughnutChart } from '../../../shared/components/ui/charts';
import { useState } from 'react';
import { FiDownload } from 'react-icons/fi';
import ReportFilters from './components/ReportFilters';
import { ReportDetailsModal } from '../../../shared/components/modals/reports/ReportDetailsModal';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface DateRange {
  start: Date | null;
  end: Date | null;
}

const SystemReports = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedReport, setSelectedReport] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>({ start: null, end: null });

  const getTabIndexFromURL = () => {
    const type = searchParams.get('type');
    const tabTypes = ['overview', 'sales', 'stores', 'users'];
    return tabTypes.indexOf(type || 'overview');
  };

  const handleDateRangeChange = (range: DateRange) => {
    setDateRange(range);
    // TODO: Fetch data based on new date range
    console.log('Date range changed:', range);
  };

  // تحديث التبويب النشط بناءً على المعلمات في URL
  const handleTabChange = (index: number) => {
    const tabTypes = ['overview', 'sales', 'stores', 'users'];
    navigate(`/admin/reports?type=${tabTypes[index]}`);
  };

  // معالجة تصدير التقرير
  const handleExport = (format: 'pdf' | 'excel') => {
    console.log(`Exporting report as ${format}`);
    // TODO: تنفيذ التصدير
  };

  // معالجة عرض تفاصيل التقرير
  const handleViewDetails = (reportData: any) => {
    setSelectedReport(reportData);
    setIsDetailsModalOpen(true);
  };

  // بيانات تجريبية للرسوم البيانية
  const salesData = {
    labels: ['يناير', 'فبراير', 'مارس', 'ابريل', 'مايو', 'يونيو'],
    datasets: [{
      label: 'المبيعات',
      data: [12000, 19000, 15000, 25000, 22000, 30000],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    }]
  };

  const storesData = {
    labels: ['مطاعم', 'مقاهي', 'متاجر', 'خدمات'],
    datasets: [{
      data: [30, 25, 20, 15],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
      ],
    }]
  };

  return (
    <Stack spacing={6}>
      <HStack justify="space-between">
        <Heading size="lg">التقارير</Heading>
        <HStack>
          <Menu>
            <MenuButton as={Button} leftIcon={<FiDownload />} colorScheme="blue">
              تصدير التقرير
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => handleExport('pdf')}>
                تصدير PDF
              </MenuItem>
              <MenuItem onClick={() => handleExport('excel')}>
                تصدير Excel
              </MenuItem>
            </MenuList>
          </Menu>
          <Select
            placeholder="نوع التقرير"
            w="200px"
            onChange={(e) => navigate(`/admin/reports?type=${e.target.value}`)}
          >
            <option value="sales">المبيعات</option>
            <option value="stores">المتاجر</option>
            <option value="users">المستخدمين</option>
          </Select>
        </HStack>
      </HStack>

      <ReportFilters 
        onDateRangeChange={handleDateRangeChange}
        onFilterChange={(filters) => {
          // تحديث المعلمات في URL
          const params = new URLSearchParams(searchParams);
          Object.entries(filters).forEach(([key, value]) => {
            params.set(key, String(value));
          });
          navigate(`/admin/reports?${params.toString()}`);
        }}
      />

      <Tabs
        index={getTabIndexFromURL()}
        onChange={handleTabChange}
      >
        <TabList>
          <Tab>نظرة عامة</Tab>
          <Tab>المبيعات</Tab>
          <Tab>المتاجر</Tab>
          <Tab>المستخدمين</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
              {/* تقرير المبيعات */}
              <Card
                cursor="pointer"
                onClick={() => handleViewDetails(salesData)}
                _hover={{ transform: 'translateY(-2px)', shadow: 'md' }}
                transition="all 0.2s"
              >
                <CardHeader>
                  <Heading size="md">تحليل المبيعات</Heading>
                </CardHeader>
                <CardBody>
                  <Box h="300px">
                    <LineChart data={salesData} />
                  </Box>
                </CardBody>
              </Card>

              {/* توزيع المتاجر */}
              <Card
                cursor="pointer"
                onClick={() => handleViewDetails(storesData)}
                _hover={{ transform: 'translateY(-2px)', shadow: 'md' }}
                transition="all 0.2s"
              >
                <CardHeader>
                  <Heading size="md">توزيع المتاجر</Heading>
                </CardHeader>
                <CardBody>
                  <Box h="300px">
                    <DoughnutChart data={storesData} />
                  </Box>
                </CardBody>
              </Card>
            </SimpleGrid>
          </TabPanel>

          {/* المزيد من التفاصيل في باقي التابات */}
        </TabPanels>
      </Tabs>

      <ReportDetailsModal 
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        report={selectedReport}
      />
    </Stack>
  );
};

export default SystemReports;
