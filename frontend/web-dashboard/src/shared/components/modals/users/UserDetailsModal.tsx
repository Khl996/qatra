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
  VStack,
  HStack,
  Text,
  Badge,
  Box,
  Avatar,
  Grid,
  GridItem,
  Divider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from '@chakra-ui/react';
import { FiMail, FiPhone, FiMapPin, FiCalendar } from 'react-icons/fi';

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: number;
}

const UserDetailsModal = ({ isOpen, onClose, userId }: UserDetailsModalProps) => {
  // بيانات تجريبية للمستخدم
  const userData = {
    id: 1,
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    phone: '0501234567',
    joinDate: '2024-01-10',
    location: 'الرياض',
    status: 'active',
    points: {
      current: 450,
      total: 750,
      expired: 100,
      lastEarned: '2024-01-20'
    },
    orders: {
      total: 23,
      completed: 20,
      cancelled: 3,
      totalSpent: '2,345'
    },
    recentTransactions: [
      {
        id: 1,
        date: '2024-01-20',
        store: 'مطعم السعادة',
        amount: 150,
        points: 15,
        status: 'completed'
      },
      {
        id: 2,
        date: '2024-01-18',
        store: 'قهوة المختصين',
        amount: 75,
        points: 7,
        status: 'completed'
      }
    ]
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack spacing={4}>
            <Avatar size="md" name={userData.name} />
            <Box>
              <Text fontSize="xl" fontWeight="bold">{userData.name}</Text>
              <HStack>
                <Badge colorScheme={userData.status === 'active' ? 'green' : 'red'}>
                  {userData.status === 'active' ? 'نشط' : 'غير نشط'}
                </Badge>
                <Text fontSize="sm" color="gray.500">
                  ID: {String(userData.id).padStart(6, '0')}
                </Text>
              </HStack>
            </Box>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        
        <ModalBody pb={6}>
          <Tabs>
            <TabList>
              <Tab>المعلومات الشخصية</Tab>
              <Tab>نقاط الولاء</Tab>
              <Tab>سجل الطلبات</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <VStack spacing={6} align="stretch">
                  <Box>
                    <Text fontWeight="bold" mb={3}>معلومات الاتصال</Text>
                    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                      <GridItem>
                        <HStack>
                          <FiMail />
                          <Text>{userData.email}</Text>
                        </HStack>
                      </GridItem>
                      <GridItem>
                        <HStack>
                          <FiPhone />
                          <Text>{userData.phone}</Text>
                        </HStack>
                      </GridItem>
                      <GridItem>
                        <HStack>
                          <FiMapPin />
                          <Text>{userData.location}</Text>
                        </HStack>
                      </GridItem>
                      <GridItem>
                        <HStack>
                          <FiCalendar />
                          <Text>تاريخ الانضمام: {userData.joinDate}</Text>
                        </HStack>
                      </GridItem>
                    </Grid>
                  </Box>

                  <Divider />

                  <Box>
                    <Text fontWeight="bold" mb={3}>إحصائيات النشاط</Text>
                    <Grid templateColumns="repeat(4, 1fr)" gap={4}>
                      <Stat>
                        <StatLabel>إجمالي الطلبات</StatLabel>
                        <StatNumber>{userData.orders.total}</StatNumber>
                      </Stat>
                      <Stat>
                        <StatLabel>الطلبات المكتملة</StatLabel>
                        <StatNumber>{userData.orders.completed}</StatNumber>
                      </Stat>
                      <Stat>
                        <StatLabel>النقاط الحالية</StatLabel>
                        <StatNumber>{userData.points.current}</StatNumber>
                      </Stat>
                      <Stat>
                        <StatLabel>إجمالي الإنفاق</StatLabel>
                        <StatNumber>{userData.orders.totalSpent} ر.س</StatNumber>
                      </Stat>
                    </Grid>
                  </Box>
                </VStack>
              </TabPanel>

              <TabPanel>
                <VStack spacing={6} align="stretch">
                  <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                    <Stat>
                      <StatLabel>النقاط الحالية</StatLabel>
                      <StatNumber>{userData.points.current}</StatNumber>
                      <StatHelpText>صالحة للاستخدام</StatHelpText>
                    </Stat>
                    <Stat>
                      <StatLabel>إجمالي النقاط المكتسبة</StatLabel>
                      <StatNumber>{userData.points.total}</StatNumber>
                    </Stat>
                    <Stat>
                      <StatLabel>النقاط المنتهية</StatLabel>
                      <StatNumber>{userData.points.expired}</StatNumber>
                    </Stat>
                  </Grid>

                  <Box>
                    <Text fontWeight="bold" mb={3}>سجل النقاط</Text>
                    <Table>
                      <Thead>
                        <Tr>
                          <Th>التاريخ</Th>
                          <Th>المتجر</Th>
                          <Th>المبلغ</Th>
                          <Th>النقاط</Th>
                          <Th>الحالة</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {userData.recentTransactions.map(transaction => (
                          <Tr key={transaction.id}>
                            <Td>{transaction.date}</Td>
                            <Td>{transaction.store}</Td>
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
                  </Box>
                </VStack>
              </TabPanel>

              <TabPanel>
                {/* يمكن إضافة سجل الطلبات هنا */}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UserDetailsModal;
