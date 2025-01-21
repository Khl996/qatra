import React from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  IconButton,
  VStack,
  Text,
  Box,
  Badge,
  HStack,
  Button,
} from '@chakra-ui/react';
import { FiBell } from 'react-icons/fi';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'عرض جديد',
    message: 'تم إضافة عرض جديد من متجر السعادة',
    time: 'منذ 5 دقائق',
    read: false,
  },
  {
    id: '2',
    title: 'تحديث حالة متجر',
    message: 'تم تفعيل حساب متجر البركة',
    time: 'منذ ساعة',
    read: true,
  },
];

export const NotificationCenter: React.FC = () => {
  const unreadCount = mockNotifications.filter(n => !n.read).length;

  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <Box position="relative">
          <IconButton
            aria-label="الإشعارات"
            icon={<FiBell />}
            variant="ghost"
            fontSize="20px"
          />
          {unreadCount > 0 && (
            <Badge
              position="absolute"
              top="-2px"
              right="-2px"
              colorScheme="red"
              borderRadius="full"
              minW="18px"
              textAlign="center"
            >
              {unreadCount}
            </Badge>
          )}
        </Box>
      </PopoverTrigger>
      <PopoverContent width="350px">
        <PopoverHeader fontWeight="bold">الإشعارات</PopoverHeader>
        <PopoverBody p={0}>
          <VStack align="stretch" spacing={0} maxH="400px" overflowY="auto">
            {mockNotifications.map((notification) => (
              <Box
                key={notification.id}
                p={4}
                borderBottomWidth={1}
                borderColor="gray.100"
                bg={notification.read ? 'white' : 'blue.50'}
                _hover={{ bg: 'gray.50' }}
                cursor="pointer"
              >
                <HStack justify="space-between" mb={1}>
                  <Text fontWeight="bold" fontSize="sm">
                    {notification.title}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {notification.time}
                  </Text>
                </HStack>
                <Text fontSize="sm" color="gray.600">
                  {notification.message}
                </Text>
              </Box>
            ))}
          </VStack>
          <Box p={4} borderTopWidth={1} borderColor="gray.100">
            <Button size="sm" width="100%" variant="ghost">
              عرض كل الإشعارات
            </Button>
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
