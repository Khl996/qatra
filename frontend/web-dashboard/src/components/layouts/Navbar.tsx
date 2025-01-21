import React from 'react';
import {
  Box,
  Flex,
  Text,
  IconButton,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue
} from '@chakra-ui/react';
import { FiBell } from 'react-icons/fi';

export default function Navbar() {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      bg={bg}
      px={8}
      py={4}
      borderBottom="1px"
      borderColor={borderColor}
    >
      <Flex justify="space-between" align="center">
        <Text fontSize="xl" fontWeight="bold">
          قطرة
        </Text>

        <Flex align="center" gap={4}>
          <IconButton
            aria-label="الإشعارات"
            icon={<FiBell />}
            variant="ghost"
            fontSize="20px"
          />
          
          <Menu>
            <MenuButton>
              <Avatar size="sm" name="مدير النظام" />
            </MenuButton>
            <MenuList>
              <MenuItem>الملف الشخصي</MenuItem>
              <MenuItem>الإعدادات</MenuItem>
              <MenuItem color="red.500">تسجيل الخروج</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
}
