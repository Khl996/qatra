import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: 'خطأ',
        description: 'الرجاء إدخال البريد الإلكتروني',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      // TODO: تنفيذ إرسال رابط إعادة تعيين كلمة المرور
      await new Promise(resolve => setTimeout(resolve, 1000)); // محاكاة الطلب
      setIsEmailSent(true);
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'حدث خطأ أثناء إرسال رابط إعادة تعيين كلمة المرور',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW="container.sm" py={20}>
      <VStack spacing={8} as="form" onSubmit={handleSubmit}>
        <Heading size="xl">استعادة كلمة المرور</Heading>
        
        {isEmailSent ? (
          <Alert
            status="success"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            borderRadius="lg"
            p={6}
          >
            <AlertIcon boxSize="40px" mr={0} mb={4} />
            <Text fontSize="lg" mb={2}>
              تم إرسال رابط إعادة تعيين كلمة المرور
            </Text>
            <Text>
              الرجاء التحقق من بريدك الإلكتروني واتباع التعليمات لإعادة تعيين كلمة المرور.
            </Text>
          </Alert>
        ) : (
          <>
            <Text>
              أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور
            </Text>
            <FormControl>
              <FormLabel>البريد الإلكتروني</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="أدخل بريدك الإلكتروني"
              />
            </FormControl>
            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              width="full"
              isLoading={isLoading}
            >
              إرسال رابط إعادة التعيين
            </Button>
          </>
        )}

        <Link to="/merchant/login">
          <Text color="blue.500">العودة لتسجيل الدخول</Text>
        </Link>
      </VStack>
    </Container>
  );
};

export default ForgotPasswordPage;
