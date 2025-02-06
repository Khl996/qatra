import { useState } from 'react';
import {
  Box,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Heading,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Switch,
  VStack,
  Button,
  useToast,
  Divider,
  Text
} from '@chakra-ui/react';
import api from '../../../services/api';

interface SystemSettings {
  siteName: string;
  commissionRate: number;
  minimumPoints: number;
  enableRegistration: boolean;
  maintenanceMode: boolean;
  supportEmail: string;
  supportPhone: string;
}

const SystemSettings = () => {
  const [settings, setSettings] = useState<SystemSettings>({
    siteName: 'قطرة',
    commissionRate: 5,
    minimumPoints: 100,
    enableRegistration: true,
    maintenanceMode: false,
    supportEmail: 'support@qatra.com',
    supportPhone: '0557401178'
  });
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSave = async () => {
    try {
      setIsLoading(true);
      await api.put('/api/admin/settings', settings);
      toast({
        title: "تم حفظ الإعدادات بنجاح",
        status: "success",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "خطأ في حفظ الإعدادات",
        status: "error",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box p={4}>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
        <Card>
          <CardHeader>
            <Heading size="md">الإعدادات العامة</Heading>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <FormControl>
                <FormLabel>اسم الموقع</FormLabel>
                <Input
                  value={settings.siteName}
                  onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                />
              </FormControl>

              <FormControl>
                <FormLabel>نسبة العمولة (%)</FormLabel>
                <NumberInput
                  value={settings.commissionRate}
                  onChange={(value) => setSettings({ ...settings, commissionRate: Number(value) })}
                  min={0}
                  max={100}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl>
                <FormLabel>الحد الأدنى للنقاط</FormLabel>
                <NumberInput
                  value={settings.minimumPoints}
                  onChange={(value) => setSettings({ ...settings, minimumPoints: Number(value) })}
                  min={0}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <Divider />

              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">تفعيل التسجيل</FormLabel>
                <Switch
                  isChecked={settings.enableRegistration}
                  onChange={(e) => setSettings({ ...settings, enableRegistration: e.target.checked })}
                />
              </FormControl>

              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">وضع الصيانة</FormLabel>
                <Switch
                  isChecked={settings.maintenanceMode}
                  onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                />
              </FormControl>
            </VStack>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Heading size="md">معلومات الدعم الفني</Heading>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <FormControl>
                <FormLabel>البريد الإلكتروني للدعم</FormLabel>
                <Input
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                />
              </FormControl>

              <FormControl>
                <FormLabel>رقم هاتف الدعم</FormLabel>
                <Input
                  type="tel"
                  value={settings.supportPhone}
                  onChange={(e) => setSettings({ ...settings, supportPhone: e.target.value })}
                />
              </FormControl>

              <Box mt={4}>
                <Text color="gray.500" fontSize="sm">
                  * سيتم عرض معلومات الدعم الفني للمستخدمين والمتاجر في حال واجهتهم أي مشكلة.
                </Text>
              </Box>
            </VStack>
          </CardBody>
        </Card>

        <Box gridColumn={{ lg: "1 / -1" }}>
          <Button
            colorScheme="blue"
            size="lg"
            w="full"
            onClick={handleSave}
            isLoading={isLoading}
          >
            حفظ الإعدادات
          </Button>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default SystemSettings;
