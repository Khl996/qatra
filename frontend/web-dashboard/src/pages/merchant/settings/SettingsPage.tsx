import {
  Box,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  HStack,
  Switch,
  Select,
  Avatar,
  IconButton,
  useToast,
  Text,
  Divider,
  SimpleGrid,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { FiUpload, FiTrash2, FiBell } from 'react-icons/fi';

const SettingsPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const toast = useToast();
  
  const [storeSettings, setStoreSettings] = useState({
    name: 'مطعم السعادة',
    phone: '0512345678',
    email: 'info@example.com',
    address: 'شارع الملك فهد، الرياض',
    workingHours: '9:00 AM - 11:00 PM',
    logo: '/store-logo.png'
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    app: true,
    salesReport: true,
    lowPoints: true
  });

  const handleSaveProfile = () => {
    toast({
      title: 'تم حفظ التغييرات',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleDeleteAccount = () => {
    // TODO: تنفيذ حذف الحساب
    onClose();
    toast({
      title: 'تم حذف الحساب',
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Stack spacing={6}>
      <Card>
        <CardHeader>
          <Heading size="md">إعدادات المتجر</Heading>
        </CardHeader>
        <CardBody>
          <Tabs>
            <TabList>
              <Tab>الملف الشخصي</Tab>
              <Tab>الإشعارات</Tab>
              <Tab>الأمان</Tab>
            </TabList>

            <TabPanels>
              {/* Profile Settings */}
              <TabPanel>
                <Stack spacing={6}>
                  <HStack spacing={8} align="start">
                    <VStack>
                      <Avatar
                        size="2xl"
                        name={storeSettings.name}
                        src={storeSettings.logo}
                      />
                      <Button leftIcon={<FiUpload />} size="sm">
                        تغيير الشعار
                      </Button>
                    </VStack>
                    
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} flex={1}>
                      <FormControl>
                        <FormLabel>اسم المتجر</FormLabel>
                        <Input
                          value={storeSettings.name}
                          onChange={(e) => setStoreSettings({
                            ...storeSettings,
                            name: e.target.value
                          })}
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel>رقم الجوال</FormLabel>
                        <Input
                          value={storeSettings.phone}
                          onChange={(e) => setStoreSettings({
                            ...storeSettings,
                            phone: e.target.value
                          })}
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel>البريد الإلكتروني</FormLabel>
                        <Input
                          type="email"
                          value={storeSettings.email}
                          onChange={(e) => setStoreSettings({
                            ...storeSettings,
                            email: e.target.value
                          })}
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel>العنوان</FormLabel>
                        <Input
                          value={storeSettings.address}
                          onChange={(e) => setStoreSettings({
                            ...storeSettings,
                            address: e.target.value
                          })}
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel>ساعات العمل</FormLabel>
                        <Input
                          value={storeSettings.workingHours}
                          onChange={(e) => setStoreSettings({
                            ...storeSettings,
                            workingHours: e.target.value
                          })}
                        />
                      </FormControl>
                    </SimpleGrid>
                  </HStack>

                  <Button colorScheme="blue" onClick={handleSaveProfile}>
                    حفظ التغييرات
                  </Button>
                </Stack>
              </TabPanel>

              {/* Notification Settings */}
              <TabPanel>
                <Stack spacing={6}>
                  <VStack align="stretch" spacing={4}>
                    <Heading size="sm" mb={2}>قنوات الإشعارات</Heading>
                    <HStack justify="space-between">
                      <Text>إشعارات البريد الإلكتروني</Text>
                      <Switch
                        isChecked={notifications.email}
                        onChange={(e) => setNotifications({
                          ...notifications,
                          email: e.target.checked
                        })}
                      />
                    </HStack>
                    <HStack justify="space-between">
                      <Text>إشعارات الرسائل النصية</Text>
                      <Switch
                        isChecked={notifications.sms}
                        onChange={(e) => setNotifications({
                          ...notifications,
                          sms: e.target.checked
                        })}
                      />
                    </HStack>
                    <HStack justify="space-between">
                      <Text>إشعارات التطبيق</Text>
                      <Switch
                        isChecked={notifications.app}
                        onChange={(e) => setNotifications({
                          ...notifications,
                          app: e.target.checked
                        })}
                      />
                    </HStack>

                    <Divider />

                    <Heading size="sm" mb={2}>أنواع الإشعارات</Heading>
                    <HStack justify="space-between">
                      <Text>تقرير المبيعات اليومي</Text>
                      <Switch
                        isChecked={notifications.salesReport}
                        onChange={(e) => setNotifications({
                          ...notifications,
                          salesReport: e.target.checked
                        })}
                      />
                    </HStack>
                    <HStack justify="space-between">
                      <Text>تنبيه نقاط العملاء المنخفضة</Text>
                      <Switch
                        isChecked={notifications.lowPoints}
                        onChange={(e) => setNotifications({
                          ...notifications,
                          lowPoints: e.target.checked
                        })}
                      />
                    </HStack>
                  </VStack>

                  <Button colorScheme="blue" onClick={handleSaveProfile}>
                    حفظ الإعدادات
                  </Button>
                </Stack>
              </TabPanel>

              {/* Security Settings */}
              <TabPanel>
                <Stack spacing={6}>
                  <VStack align="stretch" spacing={4}>
                    <Heading size="sm">تغيير كلمة المرور</Heading>
                    <FormControl>
                      <FormLabel>كلمة المرور الحالية</FormLabel>
                      <Input type="password" />
                    </FormControl>
                    <FormControl>
                      <FormLabel>كلمة المرور الجديدة</FormLabel>
                      <Input type="password" />
                    </FormControl>
                    <FormControl>
                      <FormLabel>تأكيد كلمة المرور الجديدة</FormLabel>
                      <Input type="password" />
                    </FormControl>
                    <Button colorScheme="blue">
                      تحديث كلمة المرور
                    </Button>

                    <Divider my={4} />

                    <Heading size="sm" color="red.500">حذف الحساب</Heading>
                    <Text color="gray.600">
                      تحذير: سيؤدي حذف حسابك إلى إزالة جميع بياناتك بشكل نهائي.
                    </Text>
                    <Button
                      colorScheme="red"
                      variant="outline"
                      leftIcon={<FiTrash2 />}
                      onClick={onOpen}
                    >
                      حذف الحساب
                    </Button>
                  </VStack>
                </Stack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>

      {/* Delete Account Confirmation Dialog */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>
              تأكيد حذف الحساب
            </AlertDialogHeader>

            <AlertDialogBody>
              هل أنت متأكد من رغبتك في حذف حسابك؟ لا يمكن التراجع عن هذا الإجراء.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                إلغاء
              </Button>
              <Button colorScheme="red" onClick={handleDeleteAccount} mr={3}>
                حذف الحساب
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Stack>
  );
};

export default SettingsPage;
