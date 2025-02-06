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
import { useAppDispatch, useAppSelector } from '../../../hooks/useAppDispatch';
import { register } from '../../../store/slices/authSlice';

interface RegisterFormData {
  name: string;
  description: string;
  phone: string;
  email: string;
  category: string;
  password: string;
  location?: {
    type: 'Point';
    coordinates: [number, number];
  };
  address?: string;
  workingHours?: Record<string, string>;
  logo?: File;
  attachments?: File[];  // إضافة المرفقات
}

const MerchantRegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading } = useAppSelector(state => state.auth);
  const [errors, setErrors] = useState<Partial<RegisterFormData>>({});
  const toast = useToast();
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    description: '',
    phone: '',
    email: '',
    category: '',
    password: '',
    address: '',
    attachments: []  // تهيئة المصفوفة
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
        type: 'Point',
        coordinates: [lng, lat]
      },
      address
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // التحقق من صحة البيانات الأساسية فقط
    const newErrors: Partial<RegisterFormData> = {};
    if (!formData.name) newErrors.name = 'اسم المتجر مطلوب';
    if (!formData.email) newErrors.email = 'البريد الإلكتروني مطلوب';
    if (!formData.phone) newErrors.phone = 'رقم الهاتف مطلوب';
    if (!formData.password) newErrors.password = 'كلمة المرور مطلوبة';
    if (!formData.category) newErrors.category = 'نوع المتجر مطلوب';

    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
    }

    setSubmitting(true);

    // تحويل البيانات إلى FormData
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('description', formData.description || '');
    if (formData.logo) {
        formDataToSend.append('logo', formData.logo);
    }

    // إضافة المرفقات
    if (formData.attachments && formData.attachments.length > 0) {
        formData.attachments.forEach((file, index) => {
            formDataToSend.append(`attachments[${index}]`, file);
        });
    }

    try {
        await dispatch(register(formDataToSend)).unwrap();
        toast({
            title: 'تم إرسال الطلب بنجاح',
            status: 'success',
            duration: 3000,
        });
        navigate('/merchant/register-success');
    } catch (error: any) {
        toast({
            title: 'خطأ في التسجيل',
            description: error.message || 'حدث خطأ أثناء تسجيل المتجر',
            status: 'error',
            duration: 3000,
        });
    } finally {
        setSubmitting(false);
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
          <FormControl isInvalid={!!errors.name}>
            <FormLabel>اسم المتجر</FormLabel>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <FormErrorMessage>{errors.name}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.password}>
            <FormLabel>كلمة المرور</FormLabel>
            <Input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <FormErrorMessage>{errors.password}</FormErrorMessage>
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

          <FormControl isInvalid={!!errors.category}>
            <FormLabel>نوع المتجر</FormLabel>
            <Select
              placeholder="اختر نوع المتجر"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              {storeTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </Select>
            <FormErrorMessage>{errors.category}</FormErrorMessage>
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
              value={formData.address}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                address: e.target.value
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
          isLoading={submitting}
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
