import React from 'react';
import {
  Box,
  VStack,
  Text,
  Icon,
  Link,
  Flex,
  useColorModeValue
} from '@chakra-ui/react';
import { FiHome, FiUsers, FiShoppingBag, FiSettings } from 'react-icons/fi';
import NextLink from 'next/link';

const menuItems = [
  { name: 'الرئيسية', icon: FiHome, path: '/' },
  { name: 'المتاجر', icon: FiShoppingBag, path: '/stores' },
  { name: 'المستخدمين', icon: FiUsers, path: '/users' },
  { name: 'الإعدادات', icon: FiSettings, path: '/settings' },
];

export default function Sidebar() {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      w="64"
      bg={bg}
      borderLeft="1px"
      borderColor={borderColor}
      py={6}
    >
      <VStack spacing={2} align="stretch">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            as={NextLink}
            href={item.path}
            _hover={{ textDecoration: 'none' }}
          >
            <Flex
              align="center"
              p={3}
              mx={4}
              borderRadius="lg"
              role="group"
              cursor="pointer"
              _hover={{ bg: 'blue.50' }}
            >
              <Icon
                as={item.icon}
                ml={4}
                boxSize={5}
              />
              <Text>{item.name}</Text>
            </Flex>
          </Link>
        ))}
      </VStack>
    </Box>
  );
}
