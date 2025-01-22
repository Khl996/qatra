import React from 'react';
import { Box, Container, SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText, StatArrow } from '@chakra-ui/react';
import { DashboardLayout } from '../../components/layouts/DashboardLayout';

export default function AdminDashboard() {
  return (
    <DashboardLayout>
      <Container maxW="container.xl" py={8}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
          <Stat>
            <StatLabel>إجمالي المتاجر</StatLabel>
            <StatNumber>345</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              23.36%
            </StatHelpText>
          </Stat>

          <Stat>
            <StatLabel>المتاجر النشطة</StatLabel>
            <StatNumber>245</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              12.5%
            </StatHelpText>
          </Stat>

          <Stat>
            <StatLabel>إجمالي المستخدمين</StatLabel>
            <StatNumber>5,670</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              8.2%
            </StatHelpText>
          </Stat>

          <Stat>
            <StatLabel>إجمالي النقاط</StatLabel>
            <StatNumber>1.2M</StatNumber>
            <StatHelpText>
              <StatArrow type="decrease" />
              9.05%
            </StatHelpText>
          </Stat>
        </SimpleGrid>
      </Container>
    </DashboardLayout>
  );
}
