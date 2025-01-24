import {
  Box,
  Flex,
  Icon,
  IconButton,
  useColorModeValue,
  Text,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  VStack,
  Badge,
  Divider,
} from '@chakra-ui/react';
import {
  FiMenu,
  FiHome,
  FiUsers,
  FiShoppingBag,
  FiSettings,
  FiLogOut,
  FiBell,
  FiDollarSign,
  FiBarChart2,
  FiGrid,
} from 'react-icons/fi';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const TopBar = () => {
  const navigate = useNavigate();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Flex
      px={8}
      height="20"
      position="fixed"
      w="full"
      zIndex={10}
      bg={bgColor}
      borderBottomWidth="1px"
      borderBottomColor={borderColor}
      alignItems="center"
      justifyContent="space-between"
    >
      <Text fontSize="2xl" fontWeight="bold" color="blue.500">
        قطرة | لوحة المسؤولين
      </Text>

      <HStack spacing={4}>
        <Menu>
          <MenuButton>
            <IconButton
              aria-label="الإشعارات"
              icon={
                <Box position="relative">
                  <FiBell size={20} />
                  <Badge
                    position="absolute"
                    top="-2px"
                    right="-2px"
                    colorScheme="red"
                    borderRadius="full"
                    minW="1.5rem"
                  >
                    5
                  </Badge>
                </Box>
              }
              variant="ghost"
            />
          </MenuButton>
          <MenuList>
            <MenuItem>طلب متجر جديد بانتظار المراجعة</MenuItem>
            <MenuItem>تقرير مبيعات جديد</MenuItem>
            <MenuItem>تحديث النظام متاح</MenuItem>
          </MenuList>
        </Menu>

        <Menu>
          <MenuButton>
            <Avatar size="sm" name="Admin User" />
          </MenuButton>
          <MenuList>
            <MenuItem icon={<FiSettings />}>الإعدادات</MenuItem>
            <Divider />
            <MenuItem 
              icon={<FiLogOut />} 
              onClick={() => navigate('/admin/login')}
            >
              تسجيل الخروج
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
};

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bgColor = useColorModeValue('white', 'gray.800');

  const menuItems = [
    { icon: FiHome, name: 'الرئيسية', path: '/admin/dashboard' },
    { icon: FiShoppingBag, name: 'المتاجر', path: '/admin/stores' },
    { icon: FiUsers, name: 'المستخدمين', path: '/admin/users' },
    { icon: FiBarChart2, name: 'التقارير', path: '/admin/reports' },
    { icon: FiDollarSign, name: 'المالية', path: '/admin/finance' },
    { icon: FiGrid, name: 'النظام', path: '/admin/system' },
    { icon: FiSettings, name: 'الإعدادات', path: '/admin/settings' },
  ];

  return (
    <Box
      bg={bgColor}
      w="64"
      position="fixed"
      h="full"
      pt="20"
      borderRightWidth="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <VStack spacing={2} align="stretch" p={4}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Flex
              key={item.path}
              p={3}
              cursor="pointer"
              borderRadius="lg"
              bg={isActive ? 'blue.500' : 'transparent'}
              color={isActive ? 'white' : 'inherit'}
              _hover={{
                bg: isActive ? 'blue.600' : 'blue.50',
                color: isActive ? 'white' : 'blue.500',
              }}
              onClick={() => navigate(item.path)}
              alignItems="center"
            >
              <Icon as={item.icon} mr={3} />
              <Text>{item.name}</Text>
              {item.path === '/admin/stores' && (
                <Badge ml="auto" colorScheme="red">
                  2
                </Badge>
              )}
            </Flex>
          );
        })}
      </VStack>
    </Box>
  );
};

const AdminLayout = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  return (
    <Box minH="100vh" bg={bgColor}>
      <TopBar />
      <Sidebar />
      <Box ml="64" pt="20" p={8}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
