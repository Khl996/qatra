import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
  Image,
  Heading,
  Text,
  Link,
  Container
} from '@chakra-ui/react';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { login } from '../../../store/slices/authSlice';
import { Link as RouterLink } from 'react-router-dom';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await dispatch(login({
        credentials: {
          email,
          password
        },
        role: 'admin'
      })).unwrap();

      navigate('/admin/dashboard');
    } catch (error: any) {
      toast({
        title: 'خطأ في تسجيل الدخول',
        description: error.message || 'حدث خطأ غير متوقع',
        status: 'error',
        duration: 3000,
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
        <Heading size="xl">بوابة المسؤولين</Heading>
        <Text>قم بتسجيل الدخول لإدارة النظام</Text>
        <Box w="full" maxW="400px">
          <VStack as="form" spacing={4} onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel>البريد الإلكتروني</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>كلمة المرور</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <Button
              type="submit"
              colorScheme="blue"
              width="full"
              isLoading={isLoading}
            >
              تسجيل الدخول
            </Button>
          </VStack>
        </Box>
        <VStack mt={4} spacing={2}>
          <Link as={RouterLink} to="/admin/register" color="blue.500">
            تسجيل مسؤول جديد
          </Link>
          <Link as={RouterLink} to="/admin/forgot-password" color="gray.500" fontSize="sm">
            نسيت كلمة المرور؟
          </Link>
        </VStack>
      </VStack>
    </Container>
  );
};

export default AdminLoginPage;
