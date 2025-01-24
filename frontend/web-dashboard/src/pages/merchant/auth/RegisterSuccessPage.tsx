import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Button,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiCheckCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const RegisterSuccessPage = () => {
  const navigate = useNavigate();
  const bgColor = useColorModeValue('green.50', 'green.900');
  const iconColor = useColorModeValue('green.500', 'green.200');

  return (
    <Container maxW="container.sm" py={20}>
      <VStack
        spacing={8}
        p={8}
        bg={bgColor}
        borderRadius="xl"
        boxShadow="sm"
        textAlign="center"
      >
        <Icon
          as={FiCheckCircle}
          boxSize={16}
          color={iconColor}
        />
        <VStack spacing={4}>
          <Heading size="lg">تم إرسال طلبك بنجاح</Heading>
          <Text fontSize="md" color="gray.600">
            سيتم مراجعة طلب انضمام متجرك إلى منصة قطرة خلال 24 ساعة.
            سنقوم بإرسال إشعار على بريدك الإلكتروني عند اكتمال المراجعة.
          </Text>
          <Text fontSize="sm" color="gray.500">
            يمكنك متابعة حالة طلبك من خلال تسجيل الدخول باستخدام بريدك الإلكتروني.
          </Text>
        </VStack>

        <Button
          colorScheme="blue"
          size="lg"
          onClick={() => navigate('/merchant/login')}
        >
          العودة لتسجيل الدخول
        </Button>
      </VStack>
    </Container>
  );
};

export default RegisterSuccessPage;
