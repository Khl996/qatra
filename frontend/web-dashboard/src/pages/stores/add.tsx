import React from 'react';
import {
  Box,
  Heading,
  Card,
  CardBody,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react';
import { DashboardLayout } from '../../components/layouts/DashboardLayout';
import { StoreForm } from '../../components/forms/StoreForm';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function AddStorePage() {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    // سيتم إضافة منطق حفظ المتجر هنا
    console.log('Store data:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    router.push('/stores');
  };

  return (
    <DashboardLayout>
      <Box p={8}>
        <Breadcrumb mb={6} separator="←">
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} href="/stores">
              المتاجر
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>إضافة متجر جديد</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <Heading size="lg" mb={6}>إضافة متجر جديد</Heading>

        <Card>
          <CardBody>
            <StoreForm onSubmit={handleSubmit} />
          </CardBody>
        </Card>
      </Box>
    </DashboardLayout>
  );
}
