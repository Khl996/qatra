import React from 'react';
import {
  Box,
  SimpleGrid,
  Heading,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Card,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  HStack
} from '@chakra-ui/react';
import { DashboardLayout } from '../../../components/layouts/DashboardLayout';

export default function StoreAnalyticsPage() {
  return (
    <DashboardLayout>
      <Box p={8}>
        <HStack justify="space-between" mb={6}>
          <Heading size="lg">تحليلات المتجر</Heading>
          <Select w="200px" defaultValue="month">
            <option value="week">آخر أسبوع</option>
            <option value="month">آخر شهر</option>
            <option value="year">آخر سنة</option>
          </Select>
        </HStack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel>إجمالي النقاط</StatLabel>
                <StatNumber>12,345</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  23.36%
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Stat>
                <StatLabel>العملاء النشطين</StatLabel>
                <StatNumber>345</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  12.5%
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Stat>
                <StatLabel>متوسط قيمة الطلب</StatLabel>
                <StatNumber>187 ريال</StatNumber>
                <StatHelpText>
                  <StatArrow type="decrease" />
                  5.5%
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Stat>
                <StatLabel>معدل التفاعل</StatLabel>
                <StatNumber>82%</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  8.2%
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </SimpleGrid>

        <Tabs>
          <TabList>
            <Tab>تحليل النقاط</Tab>
            <Tab>نشاط العملاء</Tab>
            <Tab>العروض والمكافآت</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              {/* سيتم إضافة رسوم بيانية للنقاط */}
            </TabPanel>
            <TabPanel>
              {/* سيتم إضافة تحليل نشاط العملاء */}
            </TabPanel>
            <TabPanel>
              {/* سيتم إضافة إحصائيات العروض */}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </DashboardLayout>
  );
}
