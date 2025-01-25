import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  VStack,
  HStack,
  Text,
  Badge,
  Avatar,
  Divider,
} from '@chakra-ui/react';

interface JoinRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: any;
  onAccept: (id: number) => void;
  onReject: (id: number) => void;
}

export const JoinRequestModal = ({ isOpen, onClose, request, onAccept, onReject }: JoinRequestModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>تفاصيل طلب الانضمام</ModalHeader>
        <ModalBody>
          <VStack align="stretch" spacing={4}>
            <HStack>
              <Avatar name={request?.storeName} size="lg" />
              <VStack align="start" spacing={1}>
                <Text fontWeight="bold">{request?.storeName}</Text>
                <Badge>{request?.type}</Badge>
              </VStack>
            </HStack>
            <Divider />
            {/* تفاصيل المتجر */}
            {/* ...المزيد من المعلومات... */}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <HStack spacing={3}>
            <Button colorScheme="green" onClick={() => onAccept(request?.id)}>
              قبول الطلب
            </Button>
            <Button colorScheme="red" variant="outline" onClick={() => onReject(request?.id)}>
              رفض الطلب
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
