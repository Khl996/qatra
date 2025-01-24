import {
  Box,
  Heading,
  Card,
  CardHeader,
  CardBody,
  Stack,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  Grid,
  GridItem,
  Select,
  Button,
  HStack,
  Text,
  Flex,
} from '@chakra-ui/react';
import { FiDownload, FiPrinter } from 'react-icons/fi';
import { LineChart, BarChart, DoughnutChart } from '../../../shared/components/ui/charts';

const SystemReports = () => {
  const storesData = {
    labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
    datasets: [{
      label: 'المتاجر الجديدة',
      data: [12, 19, 15, 25, 22, 30],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    }]
  };

  const usersData = {
    labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
    datasets: [{
      label: 'المستخدمين النشطين',
      data: [150, 230, 280, 420, 530, 650],
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  };

  const pointsDistributionData = {
    labels: ['مطاعم', 'مقاهي', 'متاجر', 'خدمات'],
    datasets: [{
      label: 'توزيع المتاجر',
      data: [35, 25, 20, 20],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      borderWidth: 1
    }]
  };

  return (
    <Stack spacing={6}>
      <Flex justify="space-between" align="center">
        <Heading size="lg">التقارير العامة</Heading>
        <HStack spacing={4}>
          <Select defaultValue="month" w="200px">
            <option value="week">الأسبوع الحالي</option>
            <option value="month">الشهر الحالي</option>
            <option value="quarter">الربع الحالي</option>
            <option value="year">السنة الحالية</option>
          </Select>
          <Button leftIcon={<FiPrinter />} colorScheme="blue" variant="outline">
            طباعة
          </Button>
          <Button leftIcon={<FiDownload />} colorScheme="blue">
            تصدير التقرير
          </Button>
        </HStack>
      </Flex>

      <Tabs variant="enclosed">
        <TabList>
          <Tab>تقرير المتاجر</Tab>
          <Tab>تقرير المستخدمين</Tab>
          <Tab>تقرير النقاط</Tab>
          <Tab>تقرير العمليات</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <GridItem colSpan={2}>
                <Card>
                  <CardHeader>
                    <Heading size="md">نمو المتاجر</Heading>
                  </CardHeader>
                  <CardBody>
                    <Box h="300px">
                      <LineChart data={storesData} />
                    </Box>
                  </CardBody>
                </Card>
              </GridItem>

              <GridItem colSpan={1}>
                <Card>
                  <CardHeader>
                    <Text fontSize="lg" fontWeight="bold">إحصائيات المتاجر</Text>
                  </CardHeader>
                  <CardBody>
                    <Stack spacing={4}>
                      <HStack justify="space-between">
                        <Text>إجمالي المتاجر النشطة:</Text>
                        <Text fontWeight="bold">156</Text>
                      </HStack>
                      <HStack justify="space-between">
                        <Text>متوسط العمولة:</Text>
                        <Text fontWeight="bold">10%</Text>
                      </HStack>
                      <HStack justify="space-between">
                        <Text>المتاجر الجديدة (هذا الشهر):</Text>
                        <Text fontWeight="bold">12</Text>
                      </HStack>
                    </Stack>
                  </CardBody>
                </Card>
              </GridItem>

              <GridItem colSpan={1}>
                <Card>
                  <CardHeader>
                    <Text fontSize="lg" fontWeight="bold">توزيع المتاجر</Text>
                  </CardHeader>
                  <CardBody>
                    <Box h="200px">
                      <DoughnutChart data={pointsDistributionData} />
                    </Box>
                  </CardBody>
                </Card>
              </GridItem>
            </Grid>
          </TabPanel>

          <TabPanel>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <GridItem colSpan={2}>
                <Card>
                  <CardHeader>
                    <Heading size="md">نشاط المستخدمين</Heading>
                  </CardHeader>
                  <CardBody>
                    <Box h="300px">
                      <BarChart data={usersData} />
                    </Box>
                  </CardBody>
                </Card>
              </GridItem>
            </Grid>
          </TabPanel>

          {/* يمكن إضافة المزيد من التقارير في الـ TabPanels الأخرى */}
        </TabPanels>
      </Tabs>
    </Stack>
  );
};

export default SystemReports;
