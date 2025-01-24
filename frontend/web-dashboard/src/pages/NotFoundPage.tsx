import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Button,
  Image,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxW="container.md" py={20}>
      <VStack spacing={8} textAlign="center">
        <Image
          src="/404-illustration.png"
          alt="404"
          maxW="300px"
          fallbackSrc="https://via.placeholder.com/300x200?text=404"
        />
        <Heading size="2xl">404</Heading>
        <Heading size="lg">الصفحة غير موجودة</Heading>
        <Text color="gray.600">
          عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
        </Text>
        <Button
          colorScheme="blue"
          size="lg"
          onClick={() => navigate(-1)}
        >
          العودة للصفحة السابقة
        </Button>
      </VStack>
    </Container>
  );
};

export default NotFoundPage;
