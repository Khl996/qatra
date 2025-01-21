import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Avatar,
  Card,
  CardBody,
  SimpleGrid,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Button,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from '@chakra-ui/react';
import { FiMail, FiPhone, FiEdit2 } from 'react-icons/fi';
import { PointsRewardsTab } from '../components/PointsRewardsTab';
import { PreferencesTab } from '../components/PreferencesTab';

export default function CustomerDetails() {
  // بيانات تجريبية للعميل
  const customerData = {
    id: '1',
    name: 'أحمد محمد',
    phone: '0512345678',
    email: 'ahmed@example.com',
    joinDate: '2023/12/01',
    points: 450,
    totalSpent: '2,345',
    visitsCount: 12,
    lastVisit: '2024/01/20',
  };

  // سجل المعاملات
  const transactions = [
    {
      id: '1',
      date: '2024/01/20',
      type: 'purchase',
      amount: '150 ريال',
      points: '+30',
      notes: 'مشتريات عامة'
    },
    {
      id: '2',
      date: '2024/01/15',
      type: 'redeem',
      amount: '50 ريال',
      points: '-100',
      notes: 'استبدال نقاط'
    },
  ];

  return (
    <Box p={8}>
      <Card mb={6}>
        <CardBody>
          <HStack spacing={8} align="start">
            <Avatar 
              size="2xl" 
              name={customerData.name}
            />
            <VStack align="start" flex={1} spacing={4}>
              <HStack justify="space-between" width="full">
                <Heading size="lg">{customerData.name}</Heading>
                <Button leftIcon={<FiEdit2 />} colorScheme="blue" variant="outline">
                  تعديل البيانات
                </Button>
              </HStack>
              
              <SimpleGrid columns={2} spacing={4}>
                <HStack align="center">
                  <FiPhone />
                  <Text mr={2}>{customerData.phone}</Text>
                </HStack>
                <HStack align="center">
                  <FiMail />
                  <Text mr={2}>{customerData.email}</Text>
                </HStack>
              </SimpleGrid>

              <Text color="gray.500">
                تاريخ الانضمام: {customerData.joinDate}
              </Text>
            </VStack>
          </HStack>
        </CardBody>
      </Card>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={6}>
        <Card>
          <CardBody>
            <Stat>
              <StatLabel>النقاط الحالية</StatLabel>
              <StatNumber>{customerData.points}</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                20% زيادة
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Stat>
              <StatLabel>إجمالي المشتريات</StatLabel>
              <StatNumber>{customerData.totalSpent} ريال</StatNumber>
              <StatHelpText>منذ الانضمام</StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Stat>
              <StatLabel>عدد الزيارات</StatLabel>
              <StatNumber>{customerData.visitsCount}</StatNumber>
              <StatHelpText>آخر زيارة: {customerData.lastVisit}</StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Stat>
              <StatLabel>متوسط المشتريات</StatLabel>
              <StatNumber>195 ريال</StatNumber>
              <StatHelpText>لكل زيارة</StatHelpText>
            </Stat>
          </CardBody>
        </Card>
      </SimpleGrid>

      <Tabs>
        <TabList>
          <Tab>سجل المعاملات</Tab>
          <Tab>النقاط والمكافآت</Tab>
          <Tab>التفضيلات</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>التاريخ</Th>
                  <Th>نوع المعاملة</Th>
                  <Th>المبلغ</Th>
                  <Th>النقاط</Th>
                  <Th>ملاحظات</Th>
                </Tr>
              </Thead>
              <Tbody>
                {transactions.map(tx => (
                  <Tr key={tx.id}>
                    <Td>{tx.date}</Td>
                    <Td>
                      <Badge colorScheme={tx.type === 'purchase' ? 'green' : 'blue'}>
                        {tx.type === 'purchase' ? 'مشتريات' : 'استبدال'}
                      </Badge>
                    </Td>
                    <Td>{tx.amount}</Td>
                    <Td color={tx.points.startsWith('+') ? 'green.500' : 'red.500'}>
                      {tx.points}
                    </Td>
                    <Td>{tx.notes}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TabPanel>

          <TabPanel>
            <PointsRewardsTab 
              points={customerData.points} 
              nextReward={500}
            />
          </TabPanel>

          <TabPanel>
            <PreferencesTab />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
