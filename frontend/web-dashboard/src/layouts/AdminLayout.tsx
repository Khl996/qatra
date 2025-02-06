// استيرادات React Router
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// استيرادات Chakra UI
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
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useBreakpointValue,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  Portal,
  List,
  ListItem,
  useToast,
  Button,
} from '@chakra-ui/react';

// استيرادات الأيقونات
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
  FiUser,
} from 'react-icons/fi';

// استيرادات الصفحات
import AdminDashboard from '../pages/admin/dashboard/AdminDashboard';
import StoresManagement from '../pages/admin/stores/StoresManagement';
import UsersManagement from '../pages/admin/users/UsersManagement';
import SystemReports from '../pages/admin/reports/SystemReports';
import api from '../services/api'; // تصحيح المسار
import FinanceManagement from '../pages/admin/finance/FinanceManagement';
import SystemSettings from '../pages/admin/settings/SystemSettings';
import SystemManagement from '../pages/admin/system/SystemManagement';
import StoreDetails from '../pages/admin/stores/StoreDetails';

// تحديث الثيم
const theme = {
  sidebar: {
    width: "220px", // تصغير عرض السايدبار أكثر
    collapsedWidth: "80px",
  },
  topbar: {
    height: "64px",
    bgColor: "blue.400" // لون جديد للشريط العلوي
  },
  layout: {
    contentPadding: "16px" // تصغير padding الحاوية
  }
};

// إضافة واجهة لتتبع حالات القائمة
interface SidebarState {
  isOpen: boolean;
  isHovered: boolean;
}

interface TopBarProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

// إضافة واجهات TypeScript
interface Notification {
  id: number;
  title: string;
  desc: string;
  time: string;
  type: 'store' | 'report' | 'system';
}

const TopBar = ({ onToggleSidebar, isSidebarOpen }: TopBarProps) => {
  const navigate = useNavigate();
  const toast = useToast();
  const borderColor = useColorModeValue('blue.300', 'blue.600');
  const [notifications, setNotifications] = useState<Notification[]>([]); // إضافة النوع

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await api.get('/api/admin/notifications');
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    fetchNotifications();
  }, []);

  const handleNotificationClick = (type: string, id: number) => {
    switch (type) {
      case 'store':
        navigate('/admin/stores?filter=pending');
        break;
      case 'report':
        navigate('/admin/reports');
        break;
      case 'system':
        navigate('/admin/system');
        break;
    }
  };

  const handleLogout = () => {
    // TODO: تنفيذ تسجيل الخروج
    toast({
      title: "تم تسجيل الخروج بنجاح",
      status: "success",
      duration: 3000,
    });
    navigate('/admin/login');
  };

  return (
    <Flex
      px={8}
      height={theme.topbar.height}
      position="fixed"
      top={0}           // إضافة هذا
      left={0}          // إضافة هذا
      right={0}         // إضافة هذا
      w="full"
      zIndex={30} // زيادة z-index
      bg={theme.topbar.bgColor}
      borderBottomWidth="1px"
      borderBottomColor={borderColor}
      alignItems="center"
      justifyContent="space-between"
      color="white" // تغيير لون النص للأبيض
    >
      <HStack spacing={4}>
        <IconButton
          aria-label="Toggle Sidebar"
          icon={<FiMenu />}
          onClick={onToggleSidebar}
          variant="ghost"
          color="white"
          _hover={{ bg: 'whiteAlpha.200' }}
        />
        <Text fontSize="2xl" fontWeight="bold" color="white">
          قطرة | لوحة المسؤولين
        </Text>
      </HStack>

      <HStack spacing={4}>
        <Popover placement="bottom-end">
          <PopoverTrigger>
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
                    {notifications.length}
                  </Badge>
                </Box>
              }
              variant="ghost"
              color="white"
              _hover={{ bg: 'whiteAlpha.200' }}
            />
          </PopoverTrigger>
          <Portal>
            <PopoverContent width="320px">
              <PopoverHeader fontWeight="bold">الإشعارات</PopoverHeader>
              <PopoverBody p={0}>
                <List>
                  {notifications.map((notification: Notification) => (
                    <ListItem
                      key={notification.id}
                      p={3}
                      _hover={{ bg: 'gray.50' }}
                      cursor="pointer"
                      onClick={() => handleNotificationClick(notification.type, notification.id)}
                    >
                      <VStack align="start" spacing={1}>
                        <Text fontWeight="medium">{notification.title}</Text>
                        <Text fontSize="sm" color="gray.600">{notification.desc}</Text>
                        <Text fontSize="xs" color="gray.400">{notification.time}</Text>
                      </VStack>
                    </ListItem>
                  ))}
                </List>
              </PopoverBody>
              <PopoverFooter textAlign="center">
                <Button size="sm" variant="link" colorScheme="blue">
                  عرض كل الإشعارات
                </Button>
              </PopoverFooter>
            </PopoverContent>
          </Portal>
        </Popover>

        <Menu>
          <MenuButton>
            <Avatar size="sm" name="Admin User" />
          </MenuButton>
          <MenuList>
            <MenuItem icon={<FiSettings />} onClick={() => navigate('/admin/settings')}>
              الإعدادات
            </MenuItem>
            <MenuItem icon={<FiUser />} onClick={() => navigate('/admin/profile')}>
              الملف الشخصي
            </MenuItem>
            <Divider />
            <MenuItem 
              icon={<FiLogOut />} 
              color="red.500"
              onClick={handleLogout}
            >
              تسجيل الخروج
            </MenuItem>  {/* Fixed: Added closing tag */}
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
};

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const navigate = useNavigate();
  const location = useLocation();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const [pendingStores, setPendingStores] = useState(0);
  
  useEffect(() => {
    const fetchPendingStores = async () => {
      try {
        const response = await api.get('/api/admin/dashboard/stats');
        setPendingStores(response.data.pendingStoresCount);
      } catch (error) {
        console.error('Error fetching pending stores:', error);
      }
    };

    fetchPendingStores();
  }, []);

  const menuItems = [
    { icon: FiHome, name: 'الرئيسية', path: '/admin/dashboard' },
    { icon: FiShoppingBag, name: 'المتاجر', path: '/admin/stores' },
    { icon: FiUsers, name: 'المستخدمين', path: '/admin/users' },
    { icon: FiBarChart2, name: 'التقارير', path: '/admin/reports' },
    { icon: FiDollarSign, name: 'المالية', path: '/admin/finance' },
    { icon: FiGrid, name: 'النظام', path: '/admin/system' },
    { icon: FiSettings, name: 'الإعدادات', path: '/admin/settings' },
  ];

  const SidebarContent = () => (
    <VStack spacing={2} align="stretch" w="full"> {/* تم تغيير spacing من 0.5 إلى 2 */}
      {menuItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Flex
            key={item.path}
            p={2.5} // تم تغيير padding من 1.5 إلى 2.5
            cursor="pointer"
            borderRadius="md"
            position="relative"
            bg={isActive ? 'blue.400' : 'transparent'}
            color={isActive ? 'white' : 'gray.700'} // تغيير لون النص للأسود
            _hover={{
              bg: 'blue.50',
              color: 'blue.600',
            }}
            sx={{
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: 'md',
                bg: 'blue.50',
                opacity: 0,
                transition: 'opacity 0.2s',
                zIndex: -1,
              },
              '&:hover::before': {
                opacity: 0.9,
              }
            }}
            onClick={() => {
              navigate(item.path);
              if (isMobile) onClose();
            }}
            alignItems="center"
          >
            <Icon 
              as={item.icon} 
              boxSize={5} 
              color={isActive ? 'white' : 'inherit'}
              mr={3} // تم تغيير mr من 2 إلى 3
            />
            <Text fontSize="sm">
              {item.name}
            </Text>
            {item.path === '/admin/stores' && pendingStores > 0 && (
              <Badge ml="auto" colorScheme="red" fontSize="xs">
                {pendingStores}
              </Badge>
            )}
          </Flex>
        );
      })}
    </VStack>
  );

  // Move shared styles to a constant
  const sidebarStyles = {
    bg: bgColor,
    borderLeftWidth: "1px", // تغيير من borderRight إلى borderLeft
    borderLeftColor: borderColor,
  };

  // للموبايل نستخدم Drawer
  if (isMobile) {
    return (
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent {...sidebarStyles}>
          <DrawerHeader borderBottomWidth="1px">قطرة | لوحة التحكم</DrawerHeader>
          <DrawerBody>
            <SidebarContent />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    );
  }

  // للديسكتوب نستخدم قائمة ثابتة
  return (
    <Box
      position="fixed"
      right={0} // تغيير من left إلى right
      top={0} // تغيير هنا
      paddingTop={theme.topbar.height} // إضافة هنا
      h="100vh"
      w={theme.sidebar.width}
      transition="all 0.2s"
      transform={isOpen ? 'translateX(0)' : `translateX(${theme.sidebar.width})`} // تعديل اتجاه التحريك
      zIndex={20}
      {...sidebarStyles}
    >
      <SidebarContent />
    </Box>
  );
};

// تعديل مكون التنقل
const BreadcrumbNavigation = () => {
  const location = useLocation();
  const [paths, setPaths] = useState<string[]>([]);
  
  useEffect(() => {
    setPaths(location.pathname.split('/').filter(Boolean));
  }, [location]);
  
  return <>{paths.join(' / ')}</>;
};

const AdminLayout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, lg: false });

  return (
    <Box h="100vh" overflow="hidden">
      <TopBar onToggleSidebar={isOpen ? onClose : onOpen} isSidebarOpen={isOpen} />
      <Sidebar isOpen={isOpen} onClose={onClose} />
      
      <Box
        position="relative"
        mr={{ base: 0, lg: isOpen ? theme.sidebar.width : 0 }}
        transition="all 0.3s ease"
        pt={theme.topbar.height}
        h={`calc(100vh - ${theme.topbar.height})`}
        overflow="auto"
        px={theme.layout.contentPadding}
      >
        <Routes>
          <Route path="/" element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="stores" element={<StoresManagement />} />
          <Route path="stores/:storeId" element={<StoreDetails />} />
          <Route path="users" element={<UsersManagement />} />
          <Route path="reports" element={<SystemReports />} />
          <Route path="finance" element={<FinanceManagement />} />
          <Route path="settings" element={<SystemSettings />} />
          <Route path="system" element={<SystemManagement />} />
          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default AdminLayout;
