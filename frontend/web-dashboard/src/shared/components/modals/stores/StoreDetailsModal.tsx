import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Grid,
  GridItem,
  VStack,
  HStack,
  Text,
  Badge,
  Divider,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
import { FiMail, FiPhone, FiMapPin, FiCalendar } from 'react-icons/fi';

interface StoreDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  storeId?: number;
}

const StoreDetailsModal = ({ isOpen, onClose, storeId }: StoreDetailsModalProps) => {
  // بيانات تجريبية للمتجر
  const storeData = {
    name: 'مطعم السعادة',
    type: 'مطعم',
    status: 'active',
    email: 'info@saadah.com',
    phone: '0501234567',
    joinDate: '2024-01-15',
    location: 'الرياض، حي الورود',
    commission: '10%',
    stats: {
      ordersCount: 156,
      totalRevenue: '15,650',
      avgOrderValue: '100',
      pointsIssued: '1,560'
    },
    recentTransactions: [
      {
        id: 1,
        date: '2024-01-23',
        amount: '150',
        points: '15',
        status: 'completed'
      },
      {
        id: 2,
        date: '2024-01-22',
        amount: '200',
        points: '20',
        status: 'completed'
      }
    ]
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack justify="space-between">
            <VStack align="start" spacing={1}>
              <Text fontSize="xl">{storeData.name}</Text>
              <HStack>
                <Badge colorScheme="blue">{storeData.type}</Badge>
                <Badge colorScheme="green">نشط</Badge>
              </HStack>
            </VStack>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        
        <ModalBody pb={6}>
          <Tabs>
            <TabList>
              <Tab>نظرة عامة</Tab>
              <Tab>المعاملات</Tab>
              <Tab>النقاط</Tab>
              <Tab>التقارير</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <VStack spacing={6} align="stretch">
                  {/* معلومات الاتصال */}
                  <Box>
                    <Text fontWeight="bold" mb={3}>معلومات الاتصال</Text>
                    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                      <GridItem>
                        <HStack>
                          <FiMail />
                          <Text>{storeData.email}</Text>
                        </HStack>
                      </GridItem>
                      <GridItem>
                        <HStack>
                          <FiPhone />
                          <Text>{storeData.phone}</Text>
                        </HStack>
                      </GridItem>
                      <GridItem>
                        <HStack>
                          <FiMapPin />
                          <Text>{storeData.location}</Text>
                        </HStack>
                      </GridItem>
                      <GridItem>
                        <HStack>
                          <FiCalendar />
                          <Text>تاريخ الانضمام: {storeData.joinDate}</Text>
                        </HStack>
                      </GridItem>
                    </Grid>
                  </Box>

                  <Divider />

                  {/* الإحصائيات */}
                  <Box>
                    <Text fontWeight="bold" mb={3}>الإحصائيات</Text>
                    <Grid templateColumns="repeat(4, 1fr)" gap={4}>
                      <Stat>
                        <StatLabel>عدد الطلبات</StatLabel>
                        <StatNumber>{storeData.stats.ordersCount}</StatNumber>
                      </Stat>
                      <Stat>
                        <StatLabel>إجمالي الإيرادات</StatLabel>
                        <StatNumber>{storeData.stats.totalRevenue} ر.س</StatNumber>
                      </Stat>
                      <Stat>
                        <StatLabel>متوسط قيمة الطلب</StatLabel>
                        <StatNumber>{storeData.stats.avgOrderValue} ر.س</StatNumber>
                      </Stat>
                      <Stat>
                        <StatLabel>النقاط الممنوحة</StatLabel>
                        <StatNumber>{storeData.stats.pointsIssued}</StatNumber>
                      </Stat>
                    </Grid>
                  </Box>
                </VStack>
              </TabPanel>

              <TabPanel>
                <Table>
                  <Thead>
                    <Tr>
                      <Th>التاريخ</Th>
                      <Th>المبلغ</Th>
                      <Th>النقاط</Th>
                      <Th>الحالة</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {storeData.recentTransactions.map(transaction => (
                      <Tr key={transaction.id}>
                        <Td>{transaction.date}</Td>
                        <Td>{transaction.amount} ر.س</Td>
                        <Td>{transaction.points}</Td>
                        <Td>
                          <Badge colorScheme="green">
                            {transaction.status === 'completed' ? 'مكتمل' : 'معلق'}
                          </Badge>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TabPanel>

              {/* يمكن إضافة المزيد من التفاصيل في التبويبات الأخرى */}
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default StoreDetailsModal;
