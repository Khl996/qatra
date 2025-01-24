import {
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
  Box,
  Badge,
  Divider,
} from '@chakra-ui/react';
import { FiBell, FiSettings, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export const TopBar = () => {
  const navigate = useNavigate();

  return (
    <Flex
      px={8}
      height="20"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex={1100}
      bg="blue.400"
      color="white"
      borderBottomWidth="1px"
      borderBottomColor="blue.500"
      alignItems="center"
      justifyContent="space-between"
    >
      <Text fontSize="2xl" fontWeight="bold">
        قطرة | لوحة المسؤولين
      </Text>

      <HStack spacing={4}>
        <Menu>
          <MenuButton>
            <Avatar size="sm" name="Admin User" />
          </MenuButton>
          <MenuList>
            <MenuItem color="gray.700" icon={<FiSettings />}>الإعدادات</MenuItem>
            <Divider />
            <MenuItem color="gray.700" icon={<FiLogOut />} onClick={() => navigate('/admin/login')}>
              تسجيل الخروج
            </MenuItem>
          </MenuList>
        </Menu>

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
              _hover={{ bg: 'blue.500' }}
              color="white"
            />
          </MenuButton>
          <MenuList color="gray.700">
            <MenuItem>طلب متجر جديد بانتظار المراجعة</MenuItem>
            <MenuItem>تقرير مبيعات جديد</MenuItem>
            <MenuItem>تحديث النظام متاح</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
};
