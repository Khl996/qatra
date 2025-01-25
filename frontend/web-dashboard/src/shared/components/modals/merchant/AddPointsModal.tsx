import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, FormControl, FormLabel, Input, Text, VStack, useToast } from '@chakra-ui/react';
import { useState } from 'react';

interface AddPointsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { customerId: string; amount: number }) => Promise<void>;
}

export const AddPointsModal = ({ isOpen, onClose, onSubmit }: AddPointsModalProps) => {
  const [customerId, setCustomerId] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const calculatePoints = (amount: number) => Math.floor(amount / 10);

  const handleSubmit = async () => {
    if (!customerId || !amount) {
      toast({
        title: "خطأ في الإدخال",
        description: "الرجاء إدخال جميع البيانات المطلوبة",
        status: "error",
        duration: 3000,
      });
      return;
    }

    setIsLoading(true);
    try {
      await onSubmit({ customerId, amount: parseFloat(amount) });
      toast({
        title: "تمت العملية بنجاح",
        status: "success",
        duration: 3000,
      });
      onClose();
    } catch (error) {
      toast({
        title: "حدث خطأ",
        description: "لم يتم إضافة النقاط",
        status: "error",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>إضافة نقاط</ModalHeader>
        <ModalBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>رقم العميل</FormLabel>
              <Input value={customerId} onChange={(e) => setCustomerId(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>مبلغ الفاتورة</FormLabel>
              <Input 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
              />
            </FormControl>
            {amount && (
              <Text color="blue.500">
                سيتم إضافة {calculatePoints(parseFloat(amount))} نقطة
              </Text>
            )}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit} isLoading={isLoading}>
            إضافة
          </Button>
          <Button variant="ghost" onClick={onClose}>إلغاء</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
