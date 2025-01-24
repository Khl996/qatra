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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  HStack,
  Avatar,
  Badge,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Flex,
  InputGroup,
  InputLeftElement,
  Input,
  Select,
  Switch,
  FormControl,
  FormLabel,
  VStack,
  Checkbox,
  Divider,
} from '@chakra-ui/react';
import { FiSearch, FiMoreVertical, FiUserPlus, FiShield, FiKey } from 'react-icons/fi';
import AddRoleModal from '../../../shared/components/modals/system/AddRoleModal';
import AddEmployeeModal from '../../../shared/components/modals/system/AddEmployeeModal';
import ChangePasswordModal from '../../../shared/components/modals/system/ChangePasswordModal';
import EditEmployeePermissionsModal from '../../../shared/components/modals/system/EditEmployeePermissionsModal';
import EditRoleModal from '../../../shared/components/modals/system/EditRoleModal';
import { useState } from 'react';

const SystemManagement = () => {
  const [isAddRoleModalOpen, setIsAddRoleModalOpen] = useState(false);
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [isEditPermissionsModalOpen, setIsEditPermissionsModalOpen] = useState(false);
  const [isEditRoleModalOpen, setIsEditRoleModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<{ id: number; name: string } | null>(null);
  const [selectedRole, setSelectedRole] = useState<{ id: number; name: string } | null>(null);

  const handleChangePassword = (employee: { id: number; name: string }) => {
    setSelectedEmployee(employee);
    setIsChangePasswordModalOpen(true);
  };

  const handleEditPermissions = (employee: { id: number; name: string }) => {
    setSelectedEmployee(employee);
    setIsEditPermissionsModalOpen(true);
  };

  const handleEditRole = (role: { id: number; name: string }) => {
    setSelectedRole(role);
    setIsEditRoleModalOpen(true);
  };

  const employees = [
    {
      id: 1,
      name: 'محمد أحمد',
      role: 'مدير النظام',
      email: 'mohammed@qatra.com',
      status: 'active',
      lastLogin: '2024-01-23 14:30'
    },
    {
      id: 2,
      name: 'سارة علي',
      role: 'مشرف المتاجر',
      email: 'sara@qatra.com',
      status: 'active',
      lastLogin: '2024-01-23 12:15'
    }
  ];

  const roles = [
    {
      id: 1,
      name: 'مدير النظام',
      users: 2,
      permissions: ['إدارة المستخدمين', 'إدارة المتاجر', 'إدارة النظام']
    },
    {
      id: 2,
      name: 'مشرف المتاجر',
      users: 3,
      permissions: ['عرض المتاجر', 'إدارة الطلبات']
    }
  ];

  return (
    <Stack spacing={6}>
      <Heading size="lg">إدارة النظام</Heading>

      <Tabs>
        <TabList>
          <Tab>الموظفين</Tab>
          <Tab>الصلاحيات</Tab>
          <Tab>سجل النشاطات</Tab>
        </TabList>

        <TabPanels>
          {/* قسم الموظفين */}
          <TabPanel>
            <Stack spacing={4}>
              <Flex justify="space-between" align="center">
                <HStack spacing={4}>
                  <InputGroup w="300px">
                    <InputLeftElement pointerEvents="none">
                      <FiSearch />
                    </InputLeftElement>
                    <Input placeholder="البحث عن موظف..." />
                  </InputGroup>
                  <Select placeholder="الدور الوظيفي" w="200px">
                    <option>مدير النظام</option>
                    <option>مشرف المتاجر</option>
                    <option>محاسب</option>
                  </Select>
                </HStack>
                <Button 
                  leftIcon={<FiUserPlus />} 
                  colorScheme="blue"
                  onClick={() => setIsAddEmployeeModalOpen(true)}
                >
                  إضافة موظف
                </Button>
              </Flex>

              <Card>
                <CardBody>
                  <Table>
                    <Thead>
                      <Tr>
                        <Th>الموظف</Th>
                        <Th>الدور الوظيفي</Th>
                        <Th>الحالة</Th>
                        <Th>آخر تسجيل دخول</Th>
                        <Th>الإجراءات</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {employees.map(employee => (
                        <Tr key={employee.id}>
                          <Td>
                            <HStack>
                              <Avatar size="sm" name={employee.name} />
                              <Box>
                                <Text fontWeight="medium">{employee.name}</Text>
                                <Text fontSize="sm" color="gray.600">
                                  {employee.email}
                                </Text>
                              </Box>
                            </HStack>
                          </Td>
                          <Td>
                            <Badge colorScheme="blue">{employee.role}</Badge>
                          </Td>
                          <Td>
                            <Badge colorScheme="green">نشط</Badge>
                          </Td>
                          <Td>{employee.lastLogin}</Td>
                          <Td>
                            <Menu>
                              <MenuButton
                                as={IconButton}
                                icon={<FiMoreVertical />}
                                variant="ghost"
                                size="sm"
                              />
                              <MenuList>
                                <MenuItem 
                                  icon={<FiKey />} 
                                  onClick={() => handleChangePassword({ id: employee.id, name: employee.name })}
                                >
                                  تغيير كلمة المرور
                                </MenuItem>
                                <MenuItem 
                                  icon={<FiShield />} 
                                  onClick={() => handleEditPermissions({ id: employee.id, name: employee.name })}
                                >
                                  تعديل الصلاحيات
                                </MenuItem>
                                <MenuItem color="red.500">تعطيل الحساب</MenuItem>
                              </MenuList>
                            </Menu>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </CardBody>
              </Card>
            </Stack>
          </TabPanel>

          {/* قسم الصلاحيات */}
          <TabPanel>
            <Stack spacing={4}>
              <Flex justify="flex-end">
                <Button 
                  colorScheme="blue"
                  onClick={() => setIsAddRoleModalOpen(true)}
                >
                  إضافة دور جديد
                </Button>
              </Flex>

              <Card>
                <CardBody>
                  <Stack spacing={6}>
                    {roles.map(role => (
                      <Box key={role.id}>
                        <Flex justify="space-between" align="center" mb={4}>
                          <HStack>
                            <Heading size="md">{role.name}</Heading>
                            <Badge>{role.users} مستخدمين</Badge>
                          </HStack>
                          <HStack>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => handleEditRole({ id: role.id, name: role.name })}
                            >
                              تعديل
                            </Button>
                            <Button size="sm" colorScheme="red" variant="ghost">
                              حذف
                            </Button>
                          </HStack>
                        </Flex>
                        <VStack align="stretch" spacing={3}>
                          {role.permissions.map((permission, index) => (
                            <FormControl key={index} display="flex" alignItems="center">
                              <FormLabel mb="0">{permission}</FormLabel>
                              <Switch defaultChecked />
                            </FormControl>
                          ))}
                        </VStack>
                        <Divider mt={4} />
                      </Box>
                    ))}
                  </Stack>
                </CardBody>
              </Card>
            </Stack>
          </TabPanel>

          {/* قسم سجل النشاطات */}
          <TabPanel>
            <Card>
              <CardBody>
                <VStack align="stretch" spacing={4}>
                  {[1, 2, 3].map((activity) => (
                    <Box key={activity} p={4} bg="gray.50" borderRadius="md">
                      <HStack justify="space-between">
                        <VStack align="start" spacing={1}>
                          <Text fontWeight="medium">تسجيل دخول جديد</Text>
                          <Text fontSize="sm" color="gray.600">
                            قام محمد أحمد بتسجيل الدخول إلى النظام
                          </Text>
                        </VStack>
                        <Text fontSize="sm" color="gray.500">
                          منذ 5 دقائق
                        </Text>
                      </HStack>
                    </Box>
                  ))}
                </VStack>
              </CardBody>
            </Card>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <AddEmployeeModal 
        isOpen={isAddEmployeeModalOpen}
        onClose={() => setIsAddEmployeeModalOpen(false)}
      />
      <AddRoleModal 
        isOpen={isAddRoleModalOpen}
        onClose={() => setIsAddRoleModalOpen(false)}
      />
      <ChangePasswordModal 
        isOpen={isChangePasswordModalOpen}
        onClose={() => setIsChangePasswordModalOpen(false)}
        employeeId={selectedEmployee?.id}
        employeeName={selectedEmployee?.name}
      />
      <EditEmployeePermissionsModal 
        isOpen={isEditPermissionsModalOpen}
        onClose={() => setIsEditPermissionsModalOpen(false)}
        employeeId={selectedEmployee?.id}
        employeeName={selectedEmployee?.name}
      />
      <EditRoleModal 
        isOpen={isEditRoleModalOpen}
        onClose={() => setIsEditRoleModalOpen(false)}
        roleId={selectedRole?.id}
        roleName={selectedRole?.name}
      />
    </Stack>
  );
};

export default SystemManagement;
