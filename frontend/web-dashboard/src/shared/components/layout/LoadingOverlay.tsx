import { Center, Spinner, Text, VStack } from '@chakra-ui/react';

interface LoadingOverlayProps {
  message?: string;
}

const LoadingOverlay = ({ message = 'جاري التحميل...' }: LoadingOverlayProps) => {
  return (
    <Center h="100vh" pos="fixed" top={0} left={0} right={0} bottom={0} bg="whiteAlpha.800" zIndex={9999}>
      <VStack spacing={4}>
        <Spinner size="xl" color="brand.blue" thickness="4px" />
        <Text fontSize="lg" color="brand.darkBlue">{message}</Text>
      </VStack>
    </Center>
  );
};

export default LoadingOverlay;
