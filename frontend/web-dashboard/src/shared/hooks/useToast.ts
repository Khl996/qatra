import { useToast as useChakraToast } from '@chakra-ui/react';

export const useToast = () => {
  const toast = useChakraToast();

  const showToast = (
    title: string,
    status: 'success' | 'error' | 'warning' | 'info' = 'info'
  ) => {
    toast({
      title,
      status,
      duration: 3000,
      isClosable: true,
      position: 'top'
    });
  };

  return { showToast };
};

export {};
