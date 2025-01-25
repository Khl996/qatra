import { 
  Box, 
  Flex, 
  useColorModeValue,
  IconButton,
  Text,
  Avatar,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Drawer,
  DrawerContent,
  useDisclosure,
  Badge,
  Divider,
  Icon,
} from '@chakra-ui/react';
import { 
  FiMenu,  // إضافة هذا الاستيراد
  FiHome, 
  FiUsers, 
  FiStar, 
  FiTag, 
  FiBarChart2, 
  FiDollarSign, 
  FiFileText, 
  FiSettings,
  FiLogOut,
  FiBell,
  FiUser,
  FiCalendar,
} from 'react-icons/fi';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const theme = {
  sidebar: {
    width: "240px",
    collapsedWidth: "80px",
  },
  topbar: {
    height: "64px",
    bgColor: "green.400" // لون مختلف عن لوحة المسؤول
  },
  layout: {
    contentPadding: "24px"
  }
};

const TopBar = ({ onToggle }: { onToggle: () => void }) => {
  const navigate = useNavigate();
  
  return (
    <Flex
      pos="fixed"
      top={0}
      right={0}
      left={0}
      zIndex={2}
      px={6}
      height="16"
      alignItems="center"
      justifyContent="space-between"
      bg="blue.400"
      color="white"
    >
      {/* Right Side - Menu & Title */}
      <Flex align="center">
        <IconButton
          onClick={onToggle}
          variant="ghost"
          color="white"
          icon={<FiMenu size={24} />}
          _hover={{ bg: 'blue.500' }}
          aria-label="Toggle Sidebar"
          mr={4}
        />
        <Flex direction="column">
          <Text fontSize="lg" fontWeight="bold">
            لوحة تحكم 
          </Text>
          <Text fontSize="sm" opacity={0.9}>
            مطعم السعادة
          </Text>
        </Flex>
      </Flex>

      {/* Left Side - Notifications & Profile */}
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
                    3
                  </Badge>
                </Box>
              }
              variant="ghost"
              color="white"
              _hover={{ bg: 'blue.500' }}
            />
          </MenuButton>
          <MenuList color="gray.800">
            <MenuItem>إشعار جديد 1</MenuItem>
            <MenuItem>إشعار جديد 2</MenuItem>
            <MenuItem>إشعار جديد 3</MenuItem>
          </MenuList>
        </Menu>

        <Menu>
          <MenuButton>
            <Avatar size="sm" name="اسم المتجر" src="/store-logo.png" />
          </MenuButton>
          <MenuList color="gray.800">
            <MenuItem icon={<FiUser />}>الملف الشخصي</MenuItem>
            <MenuItem icon={<FiSettings />}>الإعدادات</MenuItem>
            <Divider />
            <MenuItem icon={<FiLogOut />} onClick={() => navigate('/merchant/login')}>
              تسجيل الخروج
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
};

export type { SidebarContentProps }; // تصدير الأنواع بشكل منفصل

interface SidebarContentProps {
  onClose?: () => void;
  [key: string]: any;
}

const SidebarContent = ({ onClose, isVisible, ...rest }: SidebarContentProps & { isVisible: boolean }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: FiHome, name: 'لوحة التحكم', path: '/merchant/dashboard' },
    { icon: FiStar, name: 'إدارة النقاط', path: '/merchant/points' },
    { icon: FiTag, name: 'العروض', path: '/merchant/offers' },
    { icon: FiBarChart2, name: 'الإحصائيات', path: '/merchant/statistics' },
    { icon: FiDollarSign, name: 'المبيعات', path: '/merchant/sales' },
    { icon: FiFileText, name: 'التقارير', path: '/merchant/reports' },
    { icon: FiSettings, name: 'الإعدادات', path: '/merchant/settings' },
  ];

  return (
    <Box
      position="fixed"
      top="16"
      right={isVisible ? 0 : "-260px"}
      w="260px"
      h="calc(100vh - 64px)"
      bg={useColorModeValue('white', 'gray.900')}
      borderLeft="1px"
      borderLeftColor={useColorModeValue('gray.200', 'gray.700')}
      transition="right 0.3s ease"
      zIndex="1"
      overflow="auto"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontWeight="bold">
          قطرة
        </Text>
      </Flex>
      {menuItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Flex
            key={item.name}
            m="2"
            p="4"
            borderRadius="lg"
            role="group"
            cursor="pointer"
            bg={isActive ? 'blue.400' : 'transparent'}
            color={isActive ? 'white' : 'inherit'}
            _hover={{
              bg: 'blue.400',
              color: 'white',
            }}
            onClick={() => {
              navigate(item.path);
              onClose?.();
            }}
          >
            <Icon as={item.icon} mr="4" />
            <Text>{item.name}</Text>
          </Flex>
        );
      })}
    </Box>
  );
};

const MerchantLayout: React.FC = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  
  const toggleSidebar = () => setSidebarVisible(!isSidebarVisible);

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <TopBar onToggle={toggleSidebar} />
      
      <SidebarContent 
        isVisible={isSidebarVisible} 
        onClose={() => setSidebarVisible(false)} 
      />

      <Box
        mt="16"
        mr={{ base: 0, md: isSidebarVisible ? '260px' : '0' }}
        transition="margin-right 0.3s ease"
        p={4}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MerchantLayout;
