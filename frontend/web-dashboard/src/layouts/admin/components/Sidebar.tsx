import {
  Box,
  VStack,
  Icon,
  Text,
  Flex,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  FiHome,
  FiUsers,
  FiShoppingBag,
  FiSettings,
  FiDollarSign,
  FiBarChart2,
  FiGrid,
} from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';

const menuItems = [
  { icon: FiHome, name: 'الرئيسية', path: '/admin/dashboard' },
  { icon: FiShoppingBag, name: 'المتاجر', path: '/admin/stores' },
  { icon: FiUsers, name: 'المستخدمين', path: '/admin/users' },
  { icon: FiBarChart2, name: 'التقارير', path: '/admin/reports' },
  { icon: FiDollarSign, name: 'المالية', path: '/admin/finance' },
  { icon: FiGrid, name: 'النظام', path: '/admin/system' },
  { icon: FiSettings, name: 'الإعدادات', path: '/admin/settings' },
];

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <Box
      bg={bgColor}
      w="56" // تغيير من 64 إلى 56
      position="fixed"
      top="0"
      right="0" // تغيير من left إلى right
      h="100vh"
      pt="20"
      zIndex={1000}
      borderLeftWidth="1px" // تغيير من borderRight إلى borderLeft
      borderLeftColor={useColorModeValue('gray.200', 'gray.700')} // تغيير من borderRight إلى borderLeft
      transition="transform .3s ease"
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
