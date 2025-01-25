import { SimpleGrid, Card, CardBody, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Icon } from '@chakra-ui/react';
import { FiShoppingBag, FiActivity, FiDollarSign, FiAlertCircle } from 'react-icons/fi';

export const StoreStatsGrid = () => {
  const stats = [
    {
      label: 'المتاجر النشطة',
      value: '134',
      change: 12,
      icon: FiShoppingBag,
    },
    {
      label: 'متوسط التقييم',
      value: '4.5',
      change: 0.3,
      icon: FiActivity,
    },
    {
      label: 'إجمالي العمولات',
      value: '45,650 ر.س',
      change: 15,
      icon: FiDollarSign,
    },
    {
      label: 'طلبات الانضمام',
      value: '4',
      icon: FiAlertCircle,
      urgent: true,
    }
  ];

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardBody>
            <Stat>
              <StatLabel display="flex" alignItems="center">
                <Icon as={stat.icon} mr={2} color={stat.urgent ? 'red.500' : 'inherit'} />
                {stat.label}
              </StatLabel>
              <StatNumber>{stat.value}</StatNumber>
              {stat.change && (
                <StatHelpText>
                  <StatArrow type={stat.change > 0 ? 'increase' : 'decrease'} />
                  {Math.abs(stat.change)}%
                </StatHelpText>
              )}
            </Stat>
          </CardBody>
        </Card>
      ))}
    </SimpleGrid>
  );
};
