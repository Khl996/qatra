import { Box, Stat, StatLabel, StatNumber, StatHelpText, Icon } from '@chakra-ui/react';
import { IconType } from 'react-icons';

interface StatisticsCardProps {
  title: string;
  value: string | number;
  icon: IconType;  // تغيير من string إلى IconType
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({ title, value, icon }) => {
  return (
    <Box p={6} bg="white" borderRadius="lg" boxShadow="sm">
      <Stat>
        <Icon as={icon} boxSize={6} color="brand.blue" mb={2} />
        <StatLabel fontSize="sm" color="gray.500">{title}</StatLabel>
        <StatNumber fontSize="2xl" fontWeight="bold" color="brand.darkBlue">
          {value}
        </StatNumber>
      </Stat>
    </Box>
  );
};

export default StatisticsCard;
