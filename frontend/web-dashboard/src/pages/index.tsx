import { Box, Container, Heading, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <>
      <Head>
        <title>قطرة | لوحة التحكم</title>
        <meta name="description" content="نظام إدارة برنامج الولاء قطرة" />
      </Head>

      <Container maxW="container.xl" py={8}>
        <Heading mb={6} textAlign="right">لوحة التحكم</Heading>
        
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          <Box 
            p={6} 
            bg={bgColor} 
            borderRadius="lg" 
            border="1px" 
            borderColor={borderColor}
            textAlign="right"
          >
            <Text fontSize="lg" fontWeight="bold" mb={2}>إجمالي المتاجر</Text>
            <Text fontSize="3xl">120</Text>
          </Box>

          <Box 
            p={6} 
            bg={bgColor} 
            borderRadius="lg" 
            border="1px" 
            borderColor={borderColor}
            textAlign="right"
          >
            <Text fontSize="lg" fontWeight="bold" mb={2}>إجمالي المستخدمين</Text>
            <Text fontSize="3xl">1,234</Text>
          </Box>

          <Box 
            p={6} 
            bg={bgColor} 
            borderRadius="lg" 
            border="1px" 
            borderColor={borderColor}
            textAlign="right"
          >
            <Text fontSize="lg" fontWeight="bold" mb={2}>النقاط النشطة</Text>
            <Text fontSize="3xl">45,678</Text>
          </Box>
        </SimpleGrid>
      </Container>
    </>
  );
};

export default Home;
