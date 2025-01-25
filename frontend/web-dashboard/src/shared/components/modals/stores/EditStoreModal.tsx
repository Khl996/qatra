import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, FormControl, FormLabel, Input, Select, VStack, Textarea, useToast } from '@chakra-ui/react';
import { useState } from 'react';

interface EditStoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  store: any;
  onUpdate: (data: any) => Promise<void>;
}

export const EditStoreModal = ({ isOpen, onClose, store, onUpdate }: EditStoreModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(store || {});
  const toast = useToast();

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await onUpdate(formData);
      toast({
        title: 'تم التحديث بنجاح',
        status: 'success',
        duration: 3000,
      });
      onClose();
    } catch (error) {
      toast({
        title: 'حدث خطأ',
        description: 'لم يتم تحديث البيانات',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>تعديل بيانات المتجر</ModalHeader>
        <ModalBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>اسم المتجر</FormLabel>
              <Input 
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </FormControl>
            
            <FormControl>
              <FormLabel>نوع المتجر</FormLabel>
              <Select 
                value={formData.type || ''}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="restaurant">مطعم</option>
                <option value="cafe">مقهى</option>
                <option value="retail">متجر</option>
              </Select>
            </FormControl>

            {/* ... المزيد من الحقول ... */}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit} isLoading={isLoading}>
            حفظ التغييرات
          </Button>
          <Button variant="ghost" onClick={onClose}>إلغاء</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
