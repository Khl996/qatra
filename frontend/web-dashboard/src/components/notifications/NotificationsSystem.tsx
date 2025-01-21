import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  Box,
  Text,
  Badge,
  Button,
  Divider,
  useColorModeValue
} from '@chakra-ui/react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  time: string;
  read: boolean;
}

interface NotificationsSystemProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'طلب تسجيل متجر جديد',
    message: 'تم تقديم طلب تسجيل جديد من متجر السعادة',
    type: 'info',
    time: 'منذ 5 دقائق',
    read: false
  },
  {
    id: '2',
    title: 'تحذير: نقاط منتهية',
    message: 'هناك 1000 نقطة ستنتهي صلاحيتها خلال 7 أيام',
    type: 'warning',
    time: 'منذ ساعة',
    read: false
  }
];

export const NotificationsSystem: React.FC<NotificationsSystemProps> = ({
  isOpen,
  onClose
}) => {
  const bg = useColorModeValue('white', 'gray.800');

  return (
    <Drawer
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      size="md"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">الإشعارات</DrawerHeader>

        <DrawerBody p={0}>
          <VStack spacing={0} align="stretch">
            {mockNotifications.map((notification) => (
              <Box
                key={notification.id}
                p={4}
                borderBottomWidth="1px"
                bg={notification.read ? bg : 'blue.50'}
                _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}
              >
                <HStack justify="space-between" mb={2}>
                  <Badge colorScheme={
                    notification.type === 'info' ? 'blue' :
                    notification.type === 'success' ? 'green' :
                    notification.type === 'warning' ? 'yellow' : 'red'
                  }>
                    {notification.type === 'info' ? 'معلومات' :
                     notification.type === 'success' ? 'نجاح' :
                     notification.type === 'warning' ? 'تحذير' : 'خطأ'}
                  </Badge>
                  <Text fontSize="sm" color="gray.500">
                    {notification.time}
                  </Text>
                </HStack>
                <Text fontWeight="bold" mb={1}>
                  {notification.title}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  {notification.message}
                </Text>
              </Box>
            ))}
          </VStack>
          
          <Box p={4}>
            <Button width="100%" variant="outline">
              تحديد الكل كمقروء
            </Button>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
