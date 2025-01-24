import {
  Box,
  Container,
  VStack,
  Image,
  Heading,
  Text,
  Button,
  useToast,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  FormErrorMessage,
  Center,
  Icon,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiUpload } from 'react-icons/fi';
import { useDropzone } from 'react-dropzone';

interface RegisterFormData {
  storeName: string;
  ownerName: string;
  email: string;
  phone: string;
  storeType: string;
  description: string;
  logo?: File;
  attachments?: File[];
  location: {
    lat: number;
    lng: number;
    address: string;
  };
}

const MerchantRegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<RegisterFormData>>({});
  const navigate = useNavigate();
  const toast = useToast();

  const [formData, setFormData] = useState<RegisterFormData>({
    storeName: '',
    ownerName: '',
    email: '',
    phone: '',
    storeType: '',
    description: '',
    logo: undefined,
    attachments: [],
    location: {
      lat: 0,
      lng: 0,
      address: '',
    },
  });

  const storeTypes = [
    { value: 'restaurant', label: 'مطعم' },
    { value: 'cafe', label: 'مقهى' },
    { value: 'retail', label: 'متجر تجزئة' },
    { value: 'service', label: 'خدمات' },
  ];

  const handleFileDrop = (acceptedFiles: File[], fieldName: 'logo' | 'attachments') => {
    if (acceptedFiles.length > 0) {
      if (fieldName === 'attachments') {
        setFormData(prev => ({
          ...prev,
          attachments: [...(prev.attachments || []), ...acceptedFiles]
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [fieldName]: acceptedFiles[0]
        }));
      }
    }
  };

  const logoDropzone = useDropzone({
    onDrop: (files) => handleFileDrop(files, 'logo'),
    accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
    maxFiles: 1,
    maxSize: 5242880, // 5MB
  });

  const attachmentsDropzone = useDropzone({
    onDrop: (files) => handleFileDrop(files, 'attachments'),
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
    maxFiles: 5,
    maxSize: 10485760, // 10MB
  });

  const handleLocationSelect = (address: string, lat: number, lng: number) => {
    setFormData(prev => ({
      ...prev,
      location: {
        address,
        lat,
        lng
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // التحقق من صحة البيانات
    const newErrors: Partial<RegisterFormData> = {};
    if (!formData.storeName) newErrors.storeName = 'اسم المتجر مطلوب';
    if (!formData.ownerName) newErrors.ownerName = 'اسم المالك مطلوب';
    if (!formData.email) newErrors.email = 'البريد الإلكتروني مطلوب';
    if (!formData.phone) newErrors.phone = 'رقم الهاتف مطلوب';
    if (!formData.storeType) newErrors.storeType = 'نوع المتجر مطلوب';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      // TODO: تنفيذ عملية التسجيل
      console.log('Register data:', formData);
      toast({
        title: 'تم إرسال الطلب بنجاح',
        description: 'سيتم مراجعة طلبك والرد عليك قريباً',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate('/merchant/register-success');
    } catch (error) {
      toast({
        title: 'خطأ في التسجيل',
        description: 'حدث خطأ أثناء تسجيل المتجر، يرجى المحاولة مرة أخرى',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8} as="form" onSubmit={handleSubmit}>
        <Image
          src="/merchant-logo.png"
          alt="Qatra Merchant"
          boxSize="120px"
          fallbackSrc="https://via.placeholder.com/120"
        />
        <Heading size="xl">تسجيل متجر جديد</Heading>
        <Text>أدخل بيانات متجرك للانضمام إلى نظام قطرة</Text>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="full">
          <FormControl isInvalid={!!errors.storeName}>
            <FormLabel>اسم المتجر</FormLabel>
            <Input
              value={formData.storeName}
              onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
            />
            <FormErrorMessage>{errors.storeName}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.ownerName}>
            <FormLabel>اسم المالك</FormLabel>
            <Input
              value={formData.ownerName}
              onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
            />
            <FormErrorMessage>{errors.ownerName}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.email}>
            <FormLabel>البريد الإلكتروني</FormLabel>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.phone}>
            <FormLabel>رقم الهاتف</FormLabel>
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <FormErrorMessage>{errors.phone}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.storeType}>
            <FormLabel>نوع المتجر</FormLabel>
            <Select
              placeholder="اختر نوع المتجر"
              value={formData.storeType}
              onChange={(e) => setFormData({ ...formData, storeType: e.target.value })}
            >
              {storeTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </Select>
            <FormErrorMessage>{errors.storeType}</FormErrorMessage>
          </FormControl>

          <FormControl>
            <FormLabel>وصف المتجر</FormLabel>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="اكتب وصفاً مختصراً عن متجرك"
            />
          </FormControl>

          {/* Logo Upload */}
          <FormControl>
            <FormLabel>شعار المتجر</FormLabel>
            <Box
              {...logoDropzone.getRootProps()}
              p={4}
              borderWidth={2}
              borderRadius="md"
              borderStyle="dashed"
              borderColor={logoDropzone.isDragActive ? "blue.500" : "gray.200"}
              cursor="pointer"
              _hover={{ borderColor: "blue.500" }}
            >
              <input {...logoDropzone.getInputProps()} />
              <Center flexDirection="column">
                <Icon as={FiUpload} boxSize={6} color="gray.400" mb={2} />
                <Text fontSize="sm">
                  {formData.logo ? formData.logo.name : 'اسحب وأفلت الشعار هنا أو انقر للاختيار'}
                </Text>
                <Text fontSize="xs" color="gray.500" mt={1}>
                  (JPG, PNG - بحد أقصى 5MB)
                </Text>
              </Center>
            </Box>
          </FormControl>

          {/* Attachments Upload - moved next to logo upload */}
          <FormControl>
            <FormLabel>المرفقات</FormLabel>
            <Box
              {...attachmentsDropzone.getRootProps()}
              p={4}
              borderWidth={2}
              borderRadius="md"
              borderStyle="dashed"
              borderColor={attachmentsDropzone.isDragActive ? "blue.500" : "gray.200"}
              cursor="pointer"
              _hover={{ borderColor: "blue.500" }}
            >
              <input {...attachmentsDropzone.getInputProps()} />
              <Center flexDirection="column">
                <Icon as={FiUpload} boxSize={6} color="gray.400" mb={2} />
                <Text fontSize="sm">
                  {formData.attachments?.length ? 
                    `تم اختيار ${formData.attachments.length} ملفات` : 
                    'اسحب وأفلت المرفقات هنا أو انقر للاختيار'}
                </Text>
                <Text fontSize="xs" color="gray.500" mt={1}>
                  (PDF, JPG, PNG - بحد أقصى 10MB لكل ملف)
                </Text>
              </Center>
            </Box>
            {formData.attachments && formData.attachments.length > 0 && (
              <VStack mt={2} align="stretch">
                {formData.attachments.map((file, index) => (
                  <Text key={index} fontSize="sm">
                    {file.name}
                    <Button
                      size="xs"
                      ml={2}
                      colorScheme="red"
                      onClick={() => {
                        const newAttachments = formData.attachments?.filter((_, i) => i !== index);
                        setFormData(prev => ({ ...prev, attachments: newAttachments }));
                      }}
                    >
                      حذف
                    </Button>
                  </Text>
                ))}
              </VStack>
            )}
          </FormControl>

          {/* Location Input - spans full width */}
          <FormControl gridColumn="span 2">
            <FormLabel>عنوان المتجر</FormLabel>
            <Input 
              placeholder="ابحث عن موقع متجرك"
              value={formData.location.address}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                location: {
                  ...prev.location,
                  address: e.target.value
                }
              }))}
            />
            <Text fontSize="xs" color="gray.500" mt={1}>
              قم بتحديد موقع متجرك على الخريطة
            </Text>
            <Box mt={2} h="200px" borderRadius="md" overflow="hidden">
              {/* هنا سيتم إضافة خريطة جوجل لاحقاً */}
              <Box bg="gray.100" w="100%" h="100%" display="flex" alignItems="center" justifyContent="center">
                <Text color="gray.500">الخريطة قيد التطوير</Text>
              </Box>
            </Box>
          </FormControl>
        </SimpleGrid>

        <Button
          type="submit"
          colorScheme="blue"
          size="lg"
          width="full"
          isLoading={isLoading}
        >
          تسجيل المتجر
        </Button>

        <Text>
          لديك حساب بالفعل؟{' '}
          <Link to="/merchant/login" style={{ color: 'blue' }}>
            تسجيل الدخول
          </Link>
        </Text>
      </VStack>
    </Container>
  );
};

export default MerchantRegisterPage;
