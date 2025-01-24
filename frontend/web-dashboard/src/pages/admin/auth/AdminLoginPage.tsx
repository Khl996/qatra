import {
  Box,
  Container,
  VStack,
  Image,
  Heading,
  Text,
  useToast
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../../shared/components/auth/LoginForm';

const AdminLoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = async (credentials: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      // TODO: تنفيذ تسجيل دخول المسؤول
      console.log('Admin login:', credentials);
      navigate('/admin/dashboard');
    } catch (error) {
      toast({
        title: 'خطأ في تسجيل الدخول',
        description: 'يرجى التحقق من بيانات الدخول',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW="container.sm" py={10}>
      <VStack spacing={8}>
        <Image
          src="/admin-logo.png"
          alt="Qatra Admin"
          boxSize="120px"
          fallbackSrc="https://via.placeholder.com/120"
        />
        <Heading size="xl">لوحة تحكم المسؤولين</Heading>
        <Text>قم بتسجيل الدخول للوصول إلى لوحة التحكم</Text>
        <Box w="full" maxW="400px">
          <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
        </Box>
      </VStack>
    </Container>
  );
};

export default AdminLoginPage;
