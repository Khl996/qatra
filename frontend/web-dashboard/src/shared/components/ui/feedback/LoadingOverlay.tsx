import {
  Box,
  Spinner,
  Text,
  VStack,
  useColorModeValue
} from '@chakra-ui/react';

interface LoadingOverlayProps {
  message?: string;
  isFullPage?: boolean;
}

const LoadingOverlay = ({
  message = 'جاري التحميل...',
  isFullPage = true
}: LoadingOverlayProps) => {
  const bgColor = useColorModeValue('whiteAlpha.900', 'blackAlpha.800');

  return (
    <Box
      position={isFullPage ? 'fixed' : 'absolute'}
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg={bgColor}
      zIndex={9999}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack spacing={4}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
        {message && (
          <Text fontSize="lg" fontWeight="medium">
            {message}
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export default LoadingOverlay;
