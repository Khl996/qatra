import {
  Box,
  Container,
  VStack,
  Image,
  Heading,
  Text,
  useToast,
  Button,
  Link
} from '@chakra-ui/react';
import LoginForm from '../../../shared/components/auth/LoginForm';
import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

const MerchantLoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = async (credentials: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      // TODO: implement merchant login
      console.log('Merchant login:', credentials);
      navigate('/merchant/dashboard');
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
          src="/merchant-logo.png"
          alt="Qatra Merchant"
          boxSize="120px"
          fallbackSrc="https://via.placeholder.com/120"
        />
        <Heading size="xl">بوابة المتاجر</Heading>
        <Text>قم بتسجيل الدخول لإدارة متجرك</Text>
        <Box w="full" maxW="400px">
          <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
          <VStack mt={4} spacing={2}>
            <Link as={RouterLink} to="/merchant/register" color="blue.500">
              تسجيل متجر جديد
            </Link>
            <Link as={RouterLink} to="/merchant/forgot-password" color="gray.500" fontSize="sm">
              نسيت كلمة المرور؟
            </Link>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default MerchantLoginPage;
