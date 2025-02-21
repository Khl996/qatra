import { Box, Heading, SimpleGrid, Card, CardHeader, CardBody } from '@chakra-ui/react';

const MerchantReports = () => {
  return (
    <Box p={4}>
      <Heading mb={6} size="lg">التقارير</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <Card>
          <CardHeader>
            <Heading size="md">إحصائيات النقاط</Heading>
          </CardHeader>
          <CardBody>
            {/* TODO: إضافة إحصائيات النقاط */}
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Heading size="md">إحصائيات المبيعات</Heading>
          </CardHeader>
          <CardBody>
            {/* TODO: إضافة إحصائيات المبيعات */}
          </CardBody>
        </Card>
      </SimpleGrid>
    </Box>
  );
};

export default MerchantReports;
