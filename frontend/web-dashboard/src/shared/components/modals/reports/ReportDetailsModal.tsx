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
  Divider,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Box,
} from '@chakra-ui/react';
import { LineChart } from '../../ui/charts';

interface ReportDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: any;
}

export const ReportDetailsModal = ({ isOpen, onClose, report }: ReportDetailsModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>تفاصيل التقرير</ModalHeader>
        <ModalBody>
          <VStack spacing={6} align="stretch">
            <SimpleGrid columns={3} spacing={4}>
              <Stat>
                <StatLabel>إجمالي المبيعات</StatLabel>
                <StatNumber>{report?.totalSales} ر.س</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>عدد الطلبات</StatLabel>
                <StatNumber>{report?.ordersCount}</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>متوسط قيمة الطلب</StatLabel>
                <StatNumber>{report?.averageOrderValue} ر.س</StatNumber>
              </Stat>
            </SimpleGrid>
            
            <Divider />
            
            <Box h="300px">
              <LineChart data={report?.chartData} />
            </Box>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <HStack spacing={3}>
            <Button colorScheme="blue" onClick={() => window.print()}>
              طباعة التقرير
            </Button>
            <Button variant="outline" onClick={onClose}>
              إغلاق
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
