import { useEffect } from 'react';
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  VStack,
  Icon,
  Text,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';
import { FiHome, FiUsers, FiBarChart2, FiSettings } from 'react-icons/fi';

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: Array<{
    icon: IconType;
    name: string;
    path: string;
  }>;
}

interface MenuItem {
  icon: IconType;
  name: string;
  path: string;
}

const menuItems: MenuItem[] = [
  { icon: FiHome, name: 'لوحة التحكم', path: '/merchant/dashboard' },
  { icon: FiUsers, name: 'العملاء', path: '/merchant/customers' },
  { icon: FiBarChart2, name: 'التقارير', path: '/merchant/reports' },
  { icon: FiSettings, name: 'الإعدادات', path: '/merchant/settings' },
];

const MotionBox = motion(Box);

const Sidebar = ({ isOpen, onClose, menuItems }: SidebarProps) => {
  const location = useLocation();
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent bg={bg} borderLeft="1px" borderColor={borderColor}>
        <DrawerBody p={0}>
          <VStack spacing={0} align="stretch">
            {menuItems.map((item, index) => (
              <MotionBox
                key={item.path}
                as={RouterLink}
                to={item.path}
                p={4}
                display="flex"
                alignItems="center"
                bg={location.pathname.includes(item.path) ? 'blue.50' : 'transparent'}
                color={location.pathname.includes(item.path) ? 'blue.500' : 'gray.600'}
                _hover={{ bg: 'blue.50', color: 'blue.500' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition="all 0.2s"
              >
                <Icon as={item.icon} mr={3} />
                <Text>{item.name}</Text>
              </MotionBox>
            ))}
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default Sidebar;
