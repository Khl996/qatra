import { Card, CardBody, Stack, HStack, Avatar, Menu, MenuButton, MenuList, MenuItem, IconButton, Heading, Badge, Text, Flex, Icon } from '@chakra-ui/react';
import { FiMoreVertical, FiMapPin, FiEdit3, FiEye, FiSlash } from 'react-icons/fi';

interface StoreCardProps {
  store: any;
  onAction: (action: string) => void;
}

export const StoreCard = ({ store, onAction }: StoreCardProps) => {
  return (
    <Card>
      <CardBody>
        <Stack spacing={4}>
          <HStack justify="space-between">
            <HStack>
              <Avatar name={store.name} src={store.logo} />
              <Stack spacing={0}>
                <Heading size="sm">{store.name}</Heading>
                <Text fontSize="sm" color="gray.500">{store.type}</Text>
              </Stack>
            </HStack>
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<FiMoreVertical />}
                variant="ghost"
                size="sm"
              />
              <MenuList>
                <MenuItem icon={<FiEye />} onClick={() => onAction('view')}>
                  عرض التفاصيل
                </MenuItem>
                <MenuItem icon={<FiEdit3 />} onClick={() => onAction('edit')}>
                  تعديل البيانات
                </MenuItem>
                <MenuItem icon={<FiSlash />} color="red.500" onClick={() => onAction('suspend')}>
                  إيقاف المتجر
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>

          <Stack spacing={2}>
            <Flex align="center" color="gray.600">
              <Icon as={FiMapPin} mr={2} />
              <Text fontSize="sm">{store.location}</Text>
            </Flex>
            <Badge colorScheme={store.status === 'active' ? 'green' : 'yellow'} width="fit-content">
              {store.status === 'active' ? 'نشط' : 'قيد المراجعة'}
            </Badge>
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  );
};
