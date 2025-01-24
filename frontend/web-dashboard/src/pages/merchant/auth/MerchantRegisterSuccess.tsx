import {
  Container,
  VStack,
  Heading,
  Text,
  Button,
  Icon,
} from '@chakra-ui/react';
import { FiCheck } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const MerchantRegisterSuccess = () => {
  const navigate = useNavigate();

  return (
    <Container maxW="container.sm" py={20}>
      <VStack spacing={8}>
        <Icon as={FiCheck} boxSize={16} color="green.500" />
        <Heading size="xl">تم إرسال طلبك بنجاح</Heading>
        <Text textAlign="center">
          شكراً لك على التسجيل في نظام قطرة. سيتم مراجعة طلبك والرد عليك خلال 24 ساعة.
        </Text>
        <Button
          colorScheme="blue"
          onClick={() => navigate('/merchant/login')}
        >
          العودة لتسجيل الدخول
        </Button>
      </VStack>
    </Container>
  );
};

export default MerchantRegisterSuccess;
