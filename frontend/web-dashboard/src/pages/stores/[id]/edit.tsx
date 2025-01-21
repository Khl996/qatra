import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Card,
  CardBody,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useToast,
} from '@chakra-ui/react';
import { DashboardLayout } from '../../../components/layouts/DashboardLayout';
import { StoreForm } from '../../../components/forms/StoreForm';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function EditStorePage() {
  const router = useRouter();
  const { id } = router.query;
  const [store, setStore] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    if (id) {
      // هنا سيتم جلب بيانات المتجر من API
      // مثال مؤقت
      setStore({
        name: 'متجر البركة',
        ownerName: 'أحمد محمد',
        phone: '0512345678',
        email: 'store@example.com',
        address: 'الرياض - حي النخيل',
        commercialRecord: '1234567890',
      });
      setIsLoading(false);
    }
  }, [id]);

  const handleSubmit = async (data: any) => {
    try {
      // هنا سيتم إرسال البيانات المحدثة إلى API
      console.log('Updated store data:', data);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'تم التحديث بنجاح',
        status: 'success',
        duration: 3000,
      });
      
      router.push('/stores');
    } catch (error) {
      toast({
        title: 'حدث خطأ',
        description: 'لم يتم تحديث بيانات المتجر',
        status: 'error',
        duration: 3000,
      });
    }
  };

  if (isLoading) {
    return <div>جاري التحميل...</div>;
  }

  return (
    <DashboardLayout>
      <Box p={8}>
        <Breadcrumb mb={6} separator="←">
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} href="/stores">المتاجر</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} href={`/stores/${id}`}>
              {store?.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>تعديل</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <Heading size="lg" mb={6}>تعديل بيانات المتجر</Heading>

        <Card>
          <CardBody>
            <StoreForm 
              initialData={store} 
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </CardBody>
        </Card>
      </Box>
    </DashboardLayout>
  );
}
