import { Box, VStack, Icon, Text, HStack } from '@chakra-ui/react';
import { FiHome, FiUsers, FiShoppingBag, FiSettings } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

const SideNavigationMenu = () => {
  const location = useLocation();

  const menuItems = [
    { icon: FiHome, label: 'الرئيسية', path: '/dashboard' },
    { icon: FiUsers, label: 'المستخدمين', path: '/users' },
    { icon: FiShoppingBag, label: 'المتاجر', path: '/stores' },
    { icon: FiSettings, label: 'الإعدادات', path: '/settings' },
  ];

  return (
    <Box w="240px" bg="brand.darkBlue" color="white" p={4}>
      <VStack spacing={4} align="stretch">
        {menuItems.map((item) => (
          <Link to={item.path} key={item.path}>
            <Box
              p={2}
              rounded="md"
              bg={location.pathname === item.path ? 'brand.blue' : 'transparent'}
              _hover={{ bg: 'brand.blue' }}
            >
              <HStack spacing={3}>
                <Icon as={item.icon} />
                <Text>{item.label}</Text>
              </HStack>
            </Box>
          </Link>
        ))}
      </VStack>
    </Box>
  );
};

export default SideNavigationMenu;
