import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    VStack,
    HStack,
    Heading,
    Text,
    Button,
    SimpleGrid,
    Image,
    Badge,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    Textarea,
    useDisclosure,
    Divider,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
} from '@chakra-ui/react';
import { FiCheck, FiX, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import api from '../../../services/api';

const StoreDetails = () => {
    const { storeId } = useParams();
    const [store, setStore] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [rejectionReason, setRejectionReason] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        fetchStoreDetails();
    }, [storeId]);

    const fetchStoreDetails = async () => {
        try {
            const response = await api.get(`/api/admin/stores/${storeId}`);
            setStore(response.data.store);
        } catch (error) {
            toast({
                title: "خطأ في جلب بيانات المتجر",
                status: "error",
                duration: 3000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleApprove = async () => {
        try {
            await api.put(`/api/admin/stores/${storeId}/approve`);
            toast({
                title: "تم قبول المتجر بنجاح",
                status: "success",
                duration: 3000,
            });
            fetchStoreDetails();
        } catch (error) {
            toast({
                title: "خطأ في قبول المتجر",
                status: "error",
                duration: 3000,
            });
        }
    };

    const handleReject = async () => {
        try {
            await api.put(`/api/admin/stores/${storeId}/reject`, {
                reason: rejectionReason
            });
            toast({
                title: "تم رفض المتجر",
                status: "success",
                duration: 3000,
            });
            onClose();
            fetchStoreDetails();
        } catch (error) {
            toast({
                title: "خطأ في رفض المتجر",
                status: "error",
                duration: 3000,
            });
        }
    };

    if (isLoading) return null;

    return (
        <Box p={4}>
            <VStack spacing={6} align="stretch">
                {/* رأس الصفحة */}
                <HStack justify="space-between">
                    <Heading size="lg">{store.name}</Heading>
                    <Badge
                        colorScheme={
                            store.status === 'approved' ? 'green' :
                            store.status === 'pending' ? 'yellow' : 'red'
                        }
                        fontSize="md"
                        p={2}
                    >
                        {store.status === 'approved' ? 'مفعل' :
                         store.status === 'pending' ? 'قيد الانتظار' : 'مرفوض'}
                    </Badge>
                </HStack>

                {/* معلومات المتجر */}
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                    <VStack align="stretch" spacing={4}>
                        <Box>
                            <Text fontWeight="bold" mb={2}>معلومات المتجر:</Text>
                            <HStack><FiMail /><Text>{store.email}</Text></HStack>
                            <HStack><FiPhone /><Text>{store.phone}</Text></HStack>
                            <HStack><FiMapPin /><Text>{store.address}</Text></HStack>
                        </Box>
                        
                        <Box>
                            <Text fontWeight="bold" mb={2}>الوصف:</Text>
                            <Text>{store.description}</Text>
                        </Box>

                        {store.attachments?.length > 0 && (
                            <Box>
                                <Text fontWeight="bold" mb={2}>المرفقات:</Text>
                                <HStack spacing={4}>
                                    {store.attachments.map((attachment: string, index: number) => (
                                        <Button
                                            key={index}
                                            size="sm"
                                            onClick={() => window.open(attachment, '_blank')}
                                        >
                                            ملف {index + 1}
                                        </Button>
                                    ))}
                                </HStack>
                            </Box>
                        )}
                    </VStack>

                    <Box>
                        {store.logo && (
                            <Image
                                src={store.logo}
                                alt={store.name}
                                maxH="200px"
                                objectFit="contain"
                            />
                        )}
                    </Box>
                </SimpleGrid>

                <Divider />

                {/* الإحصائيات */}
                {store.status === 'approved' && (
                    <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
                        <Stat>
                            <StatLabel>إجمالي المبيعات</StatLabel>
                            <StatNumber>{store.Points?.[0]?.totalSales || 0} ر.س</StatNumber>
                        </Stat>
                        <Stat>
                            <StatLabel>عدد العمليات</StatLabel>
                            <StatNumber>{store.Points?.[0]?.transactionCount || 0}</StatNumber>
                        </Stat>
                    </SimpleGrid>
                )}

                {/* أزرار الإجراءات */}
                {store.status === 'pending' && (
                    <HStack spacing={4}>
                        <Button
                            colorScheme="green"
                            leftIcon={<FiCheck />}
                            onClick={handleApprove}
                        >
                            قبول
                        </Button>
                        <Button
                            colorScheme="red"
                            leftIcon={<FiX />}
                            onClick={onOpen}
                        >
                            رفض
                        </Button>
                    </HStack>
                )}
            </VStack>

            {/* نافذة الرفض */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>رفض المتجر</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Textarea
                            placeholder="اكتب سبب الرفض..."
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={handleReject}>
                            تأكيد الرفض
                        </Button>
                        <Button variant="ghost" onClick={onClose}>
                            إلغاء
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default StoreDetails;
