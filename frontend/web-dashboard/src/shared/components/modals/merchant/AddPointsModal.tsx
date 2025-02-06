import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack
} from '@chakra-ui/react';
import { useState } from 'react';
import type { PointTransaction } from '../../../../types';

interface AddPointsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Omit<PointTransaction, 'id' | 'date'>) => Promise<void>;
}

export const AddPointsModal = ({ isOpen, onClose, onSubmit }: AddPointsModalProps) => {
    const [formData, setFormData] = useState({
        customerId: '',
        amount: '',
        points: ''
    });

    const handleSubmit = async () => {
        await onSubmit({
            customerId: formData.customerId,
            amount: Number(formData.amount),
            points: Number(formData.points),
            type: 'add'
        });
        setFormData({ customerId: '', amount: '', points: '' });
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
                            <Input 
                                value={formData.customerId}
                                onChange={e => setFormData(prev => ({
                                    ...prev,
                                    customerId: e.target.value
                                }))}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>المبلغ</FormLabel>
                            <Input 
                                type="number"
                                value={formData.amount}
                                onChange={e => setFormData(prev => ({
                                    ...prev,
                                    amount: e.target.value
                                }))}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>النقاط</FormLabel>
                            <Input 
                                type="number"
                                value={formData.points}
                                onChange={e => setFormData(prev => ({
                                    ...prev,
                                    points: e.target.value
                                }))}
                            />
                        </FormControl>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                        إضافة
                    </Button>
                    <Button variant="ghost" onClick={onClose}>
                        إلغاء
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
