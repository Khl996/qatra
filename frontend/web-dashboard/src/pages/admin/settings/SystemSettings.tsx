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
  FormControl,
  FormLabel,
  Input,
  Switch,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Button,
  Divider,
  Text,
  HStack,
  VStack,
  InputGroup,
  InputRightAddon,
} from '@chakra-ui/react';

const SystemSettings = () => {
  return (
    <Stack spacing={6}>
      <Heading size="lg">إعدادات النظام</Heading>

      <Card>
        <CardBody>
          <Tabs>
            <TabList>
              <Tab>الإعدادات العامة</Tab>
              <Tab>إعدادات العمولات</Tab>
              <Tab>إعدادات النقاط</Tab>
              <Tab>الأمان</Tab>
            </TabList>

            <TabPanels>
              {/* الإعدادات العامة */}
              <TabPanel>
                <VStack spacing={6} align="stretch">
                  <FormControl>
                    <FormLabel>اسم التطبيق</FormLabel>
                    <Input defaultValue="قطرة" />
                  </FormControl>

                  <FormControl>
                    <FormLabel>البريد الإلكتروني للدعم</FormLabel>
                    <Input defaultValue="support@qatra.com" />
                  </FormControl>

                  <FormControl>
                    <FormLabel>رقم الجوال للدعم</FormLabel>
                    <Input defaultValue="0500000000" />
                  </FormControl>

                  <FormControl display="flex" alignItems="center">
                    <FormLabel mb="0">
                      تفعيل التسجيل للمتاجر الجديدة
                    </FormLabel>
                    <Switch defaultChecked />
                  </FormControl>

                  <FormControl display="flex" alignItems="center">
                    <FormLabel mb="0">
                      تفعيل الإشعارات التلقائية
                    </FormLabel>
                    <Switch defaultChecked />
                  </FormControl>
                </VStack>
              </TabPanel>

              {/* إعدادات العمولات */}
              <TabPanel>
                <VStack spacing={6} align="stretch">
                  <FormControl>
                    <FormLabel>العمولة الافتراضية للمتاجر الجديدة</FormLabel>
                    <InputGroup>
                      <NumberInput defaultValue={10} min={0} max={100} w="full">
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                      <InputRightAddon children="%" />
                    </InputGroup>
                  </FormControl>

                  <FormControl>
                    <FormLabel>الحد الأدنى للعمولة</FormLabel>
                    <InputGroup>
                      <NumberInput defaultValue={5} min={0} max={100} w="full">
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                      <InputRightAddon children="%" />
                    </InputGroup>
                  </FormControl>

                  <FormControl>
                    <FormLabel>دورة تحصيل العمولات</FormLabel>
                    <Select defaultValue="monthly">
                      <option value="weekly">أسبوعي</option>
                      <option value="monthly">شهري</option>
                      <option value="quarterly">ربع سنوي</option>
                    </Select>
                  </FormControl>
                </VStack>
              </TabPanel>

              {/* إعدادات النقاط */}
              <TabPanel>
                <VStack spacing={6} align="stretch">
                  <FormControl>
                    <FormLabel>نسبة النقاط من قيمة الفاتورة</FormLabel>
                    <InputGroup>
                      <NumberInput defaultValue={1} min={0} max={100} w="full">
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                      <InputRightAddon children="%" />
                    </InputGroup>
                  </FormControl>

                  <FormControl>
                    <FormLabel>صلاحية النقاط</FormLabel>
                    <InputGroup>
                      <NumberInput defaultValue={365} min={1} w="full">
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                      <InputRightAddon children="يوم" />
                    </InputGroup>
                  </FormControl>

                  <FormControl display="flex" alignItems="center">
                    <FormLabel mb="0">
                      تفعيل نظام النقاط
                    </FormLabel>
                    <Switch defaultChecked />
                  </FormControl>
                </VStack>
              </TabPanel>

              {/* إعدادات الأمان */}
              <TabPanel>
                <VStack spacing={6} align="stretch">
                  <FormControl>
                    <FormLabel>مدة صلاحية جلسة المستخدم</FormLabel>
                    <InputGroup>
                      <NumberInput defaultValue={24} min={1} w="full">
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                      <InputRightAddon children="ساعة" />
                    </InputGroup>
                  </FormControl>

                  <FormControl display="flex" alignItems="center">
                    <FormLabel mb="0">
                      تفعيل المصادقة الثنائية
                    </FormLabel>
                    <Switch defaultChecked />
                  </FormControl>

                  <FormControl display="flex" alignItems="center">
                    <FormLabel mb="0">
                      تفعيل تسجيل الدخول عبر البصمة
                    </FormLabel>
                    <Switch />
                  </FormControl>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>

      <HStack justify="flex-start" spacing={4}>
        <Button colorScheme="blue">
          حفظ التغييرات
        </Button>
        <Button variant="outline">
          إعادة تعيين
        </Button>
      </HStack>
    </Stack>
  );
};

export default SystemSettings;
