import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface PageContainerProps {
  title: string;
  description?: string;
  children: ReactNode;
}

const PageContainer = ({ title, description, children }: PageContainerProps) => {
  return (
    <Box>
      <VStack align="stretch" spacing={4} mb={6}>
        <Heading size="lg">{title}</Heading>
        {description && (
          <Text color="gray.600">{description}</Text>
        )}
      </VStack>
      {children}
    </Box>
  );
};

export default PageContainer;
