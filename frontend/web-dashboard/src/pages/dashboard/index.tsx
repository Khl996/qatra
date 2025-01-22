import React from 'react';
import { Box, Container, Heading } from '@chakra-ui/react';
import { DashboardLayout } from '../../components/layouts/DashboardLayout';

export default function Dashboard() {
  return (
    <DashboardLayout>
      <Container maxW="container.xl" py={8}>
        <Heading mb={6}>لوحة التحكم</Heading>
        {/* محتوى لوحة التحكم */}
      </Container>
    </DashboardLayout>
  );
}
