import { useState, useEffect } from 'react';
import {
  Box,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Button,
  HStack,
  Flex,
  Icon,
  Progress,
  useToast,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Stack,
  useDisclosure
} from '@chakra-ui/react';
import { FiCpu, FiHardDrive, FiServer, FiActivity } from 'react-icons/fi';
import api from '../../../services/api';
import AddRoleModal from '../../../shared/components/modals/system/AddRoleModal';
import EditRoleModal from '../../../shared/components/modals/system/EditRoleModal';
import AddEmployeeModal from '../../../shared/components/modals/system/AddEmployeeModal';
import EditEmployeePermissionsModal from '../../../shared/components/modals/system/EditEmployeePermissionsModal';
import DataTable from '../../../shared/components/ui/tables/DataTable';

interface SystemStats {
  cpu: {
    usage: number;
    cores: number;
  };
  memory: {
    total: number;
    used: number;
    free: number;
  };
  storage: {
    total: number;
    used: number;
    free: number;
  };
  uptime: number;
  lastBackup: string;
}

interface SystemActivity {
  id: number;
  type: string;
  description: string;
  status: string;
  timestamp: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  createdAt: string;
}

interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

const SystemManagement = () => {
  const { isOpen: modalOpen, onOpen, onClose } = useDisclosure();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [activities, setActivities] = useState<SystemActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [roles, setRoles] = useState<Role[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const toast = useToast();

  useEffect(() => {
    fetchSystemData();
  }, []);

  useEffect(() => {
    if (activeTab === 0) fetchRoles();
    if (activeTab === 1) fetchEmployees();
  }, [activeTab]);

  const fetchSystemData = async () => {
    try {
      setIsLoading(true);
      const [statsRes, activitiesRes] = await Promise.all([
        api.get('/api/admin/system/stats'),
        api.get('/api/admin/system/activities')
      ]);
      setStats(statsRes.data);
      setActivities(activitiesRes.data);
    } catch (error) {
      toast({
        title: "خطأ في جلب بيانات النظام",
        status: "error",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await api.get('/api/admin/system/roles');
      setRoles(response.data.roles);
    } catch (error) {
      toast({
        title: "خطأ في جلب الأدوار",
        status: "error",
        duration: 3000,
      });
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await api.get('/api/admin/system/employees');
      setEmployees(response.data.employees);
    } catch (error) {
      toast({
        title: "خطأ في جلب الموظفين",
        status: "error",
        duration: 3000,
      });
    }
  };

  const handleBackup = async () => {
    try {
      await api.post('/api/admin/system/backup');
      toast({
        title: "تم بدء النسخ الاحتياطي",
        status: "success",
        duration: 3000,
      });
      fetchSystemData();
    } catch (error) {
      toast({
        title: "خطأ في إنشاء النسخة الاحتياطية",
        status: "error",
        duration: 3000,
      });
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    return `${days}d ${hours}h ${minutes}m`;
  };

  const roleColumns = [
    { 
      header: 'اسم الدور', 
      accessor: 'name',
      render: (value: string) => <Text fontWeight="bold">{value}</Text>
    },
    { header: 'الوصف', accessor: 'description' },
    { 
      header: 'الصلاحيات', 
      accessor: 'permissions',
      render: (permissions: string[]) => (
        <HStack spacing={1}>
          {permissions.map(perm => (
            <Badge key={perm} colorScheme="blue" fontSize="xs">
              {perm}
            </Badge>
          ))}
        </HStack>
      )
    },
    { 
      header: 'تاريخ الإنشاء', 
      accessor: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString('ar-SA')
    }
  ];

  const employeeColumns = [
    { header: 'الاسم', accessor: 'name' },
    { header: 'البريد الإلكتروني', accessor: 'email' },
    { 
      header: 'الدور', 
      accessor: 'role',
      render: (role: string) => (
        <Badge colorScheme="blue">{role}</Badge>
      )
    },
    { 
      header: 'الحالة', 
      accessor: 'status',
      render: (status: string) => (
        <Badge colorScheme={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? 'نشط' : 'غير نشط'}
        </Badge>
      )
    }
  ];

  const handleItemSelect = (item: any) => {
    setSelectedItem(item);
    onOpen();
  };

  const getCpuColor = (usage: number | undefined) => {
    if (!usage) return 'blue';
    return usage > 80 ? 'red' : 
           usage > 60 ? 'yellow' : 'blue';
  };

  const getMemoryUsagePercentage = () => {
    if (!stats?.memory) return 0;
    return (stats.memory.used / stats.memory.total) * 100;
  };

  const getStorageUsagePercentage = () => {
    if (!stats?.storage) return 0;
    return (stats.storage.used / stats.storage.total) * 100;
  };

  if (isLoading) {
    return <Flex justify="center" align="center" minH="400px"><Spinner /></Flex>;
  }

  return (
    <Box p={4}>
      <Tabs index={activeTab} onChange={setActiveTab}>
        <TabList>
          <Tab>الأدوار والصلاحيات</Tab>
          <Tab>الموظفين</Tab>
          <Tab>سجل النظام</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Stack spacing={4}>
              <HStack justify="space-between">
                <Heading size="md">إدارة الأدوار والصلاحيات</Heading>
                <Button colorScheme="blue" onClick={onOpen}>
                  إضافة دور جديد
                </Button>
              </HStack>
              <DataTable
                columns={roleColumns}
                data={roles}
                isLoading={isLoading}
              />
            </Stack>
          </TabPanel>

          <TabPanel>
            <Stack spacing={4}>
              <HStack justify="space-between">
                <Heading size="md">إدارة الموظفين</Heading>
                <Button colorScheme="blue" onClick={onOpen}>
                  إضافة موظف
                </Button>
              </HStack>
              <DataTable
                columns={employeeColumns}
                data={employees}
                isLoading={isLoading}
              />
            </Stack>
          </TabPanel>

          <TabPanel>
            <HStack mb={6} justify="space-between">
              <Heading size="md">حالة النظام</Heading>
              <Button
                colorScheme="blue"
                leftIcon={<Icon as={FiHardDrive} />}
                onClick={handleBackup}
              >
                نسخة احتياطية جديدة
              </Button>
            </HStack>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={6}>
              <Card>
                <CardBody>
                  <Stat>
                    <HStack mb={2}>
                      <Icon as={FiCpu} color="blue.500" />
                      <StatLabel>المعالج</StatLabel>
                    </HStack>
                    <StatNumber>{stats?.cpu?.usage ?? 0}%</StatNumber>
                    <Progress
                      value={stats?.cpu?.usage ?? 0}
                      colorScheme={getCpuColor(stats?.cpu?.usage)}
                      size="sm"
                      mt={2}
                    />
                    <StatHelpText>{stats?.cpu?.cores ?? 0} نواة</StatHelpText>
                  </Stat>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <Stat>
                    <HStack mb={2}>
                      <Icon as={FiServer} color="green.500" />
                      <StatLabel>الذاكرة</StatLabel>
                    </HStack>
                    <StatNumber>
                      {formatBytes(stats?.memory?.used ?? 0)} / {formatBytes(stats?.memory?.total ?? 0)}
                    </StatNumber>
                    <Progress
                      value={getMemoryUsagePercentage()}
                      colorScheme="green"
                      size="sm"
                      mt={2}
                    />
                  </Stat>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <Stat>
                    <HStack mb={2}>
                      <Icon as={FiHardDrive} color="purple.500" />
                      <StatLabel>التخزين</StatLabel>
                    </HStack>
                    <StatNumber>
                      {formatBytes(stats?.storage?.used ?? 0)} / {formatBytes(stats?.storage?.total ?? 0)}
                    </StatNumber>
                    <Progress
                      value={getStorageUsagePercentage()}
                      colorScheme="purple"
                      size="sm"
                      mt={2}
                    />
                  </Stat>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <Stat>
                    <HStack mb={2}>
                      <Icon as={FiActivity} color="orange.500" />
                      <StatLabel>وقت التشغيل</StatLabel>
                    </HStack>
                    <StatNumber>{formatUptime(stats?.uptime ?? 0)}</StatNumber>
                    <StatHelpText>
                      آخر نسخة احتياطية: {new Date(stats?.lastBackup ?? Date.now()).toLocaleDateString('ar-SA')}
                    </StatHelpText>
                  </Stat>
                </CardBody>
              </Card>
            </SimpleGrid>

            <Card>
              <CardHeader>
                <Heading size="md">سجل النظام</Heading>
              </CardHeader>
              <CardBody>
                <Table>
                  <Thead>
                    <Tr>
                      <Th>النوع</Th>
                      <Th>الوصف</Th>
                      <Th>الحالة</Th>
                      <Th>التوقيت</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {activities.map((activity) => (
                      <Tr key={activity.id}>
                        <Td>{activity.type}</Td>
                        <Td>{activity.description}</Td>
                        <Td>
                          <Badge
                            colorScheme={
                              activity.status === 'success' ? 'green' :
                              activity.status === 'warning' ? 'yellow' : 'red'
                            }
                          >
                            {activity.status === 'success' ? 'ناجح' :
                             activity.status === 'warning' ? 'تحذير' : 'خطأ'}
                          </Badge>
                        </Td>
                        <Td>{new Date(activity.timestamp).toLocaleString('ar-SA')}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </CardBody>
            </Card>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <AddRoleModal 
        isOpen={modalOpen && activeTab === 0 && !selectedItem} 
        onClose={onClose} 
      />
      <EditRoleModal 
        isOpen={modalOpen && activeTab === 0 && !!selectedItem} 
        onClose={onClose} 
        roleId={selectedItem?.id}
      />
      <AddEmployeeModal 
        isOpen={modalOpen && activeTab === 1 && !selectedItem} 
        onClose={onClose} 
      />
      <EditEmployeePermissionsModal 
        isOpen={modalOpen && activeTab === 1 && !!selectedItem} 
        onClose={onClose} 
        employeeId={selectedItem?.id}
      />
    </Box>
  );
};

export default SystemManagement;
