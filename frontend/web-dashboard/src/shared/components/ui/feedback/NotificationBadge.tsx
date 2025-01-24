import {
  Box,
  Circle,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  VStack,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { FiBell } from 'react-icons/fi';

interface Notification {
  id: string;
  message: string;
  type?: 'info' | 'warning' | 'error';
  timestamp: Date;
}

interface NotificationBadgeProps {
  notifications: Notification[];
  onNotificationClick?: (notification: Notification) => void;
  maxDisplay?: number;
}

const NotificationBadge = ({
  notifications,
  onNotificationClick,
  maxDisplay = 5
}: NotificationBadgeProps) => {
  const unreadCount = notifications.length;
  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <Box position="relative">
          <IconButton
            aria-label="الإشعارات"
            icon={<FiBell size={20} />}
            variant="ghost"
          />
          {unreadCount > 0 && (
            <Circle
              size="18px"
              bg="red.500"
              color="white"
              position="absolute"
              top="-5px"
              right="-5px"
              fontSize="xs"
            >
              {unreadCount}
            </Circle>
          )}
        </Box>
      </PopoverTrigger>
      <PopoverContent width="300px" bg={bgColor}>
        <PopoverBody p={0}>
          <VStack align="stretch" spacing={0}>
            {notifications.length === 0 ? (
              <Box p={4}>
                <Text color="gray.500">لا توجد إشعارات</Text>
              </Box>
            ) : (
              notifications.slice(0, maxDisplay).map((notification) => (
                <Box
                  key={notification.id}
                  p={3}
                  _hover={{ bg: 'gray.50' }}
                  cursor="pointer"
                  onClick={() => onNotificationClick?.(notification)}
                  borderBottomWidth="1px"
                >
                  <Text fontSize="sm">{notification.message}</Text>
                  <Text fontSize="xs" color="gray.500" mt={1}>
                    {new Date(notification.timestamp).toLocaleString('ar-SA')}
                  </Text>
                </Box>
              ))
            )}
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationBadge;
