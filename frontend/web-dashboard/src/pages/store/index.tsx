import React from 'react';
import { Box, Container, SimpleGrid, Card, CardBody, Text, Heading } from '@chakra-ui/react';
import { DashboardLayout } from '../../components/layouts/DashboardLayout';

export default function StoreDashboard() {
  return (
    <DashboardLayout>
      <Container maxW="container.xl" py={8}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
          <Card>
            <CardBody>
              <Text color="gray.500">النقاط الممنوحة</Text>
              <Heading size="lg">2,345</Heading>
              <Text color="green.500" fontSize="sm">+12.5% من الشهر الماضي</Text>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Text color="gray.500">النقاط المستبدلة</Text>
              <Heading size="lg">1,234</Heading>
              <Text color="blue.500" fontSize="sm">-2.3% من الشهر الماضي</Text>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Text color="gray.500">العملاء النشطين</Text>
              <Heading size="lg">456</Heading>
              <Text color="green.500" fontSize="sm">+8.7% من الشهر الماضي</Text>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Text color="gray.500">العروض النشطة</Text>
              <Heading size="lg">12</Heading>
              <Text color="gray.500" fontSize="sm">عرض نشط</Text>
            </CardBody>
          </Card>
        </SimpleGrid>
      </Container>
    </DashboardLayout>
  );
}
