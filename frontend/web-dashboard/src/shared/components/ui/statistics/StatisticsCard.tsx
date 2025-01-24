import { Box, Stat, StatLabel, StatNumber, StatHelpText, Icon } from '@chakra-ui/react';
import { IconType } from 'react-icons';

interface StatisticsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: IconType;
  trend?: {
    value: number;
    isUpward: boolean;
  };
}

const StatisticsCard = ({ title, value, description, icon, trend }: StatisticsCardProps) => {
  return (
    <Box p={6} bg="white" borderRadius="lg" boxShadow="sm">
      <Stat>
        {icon && <Icon as={icon} boxSize={6} color="brand.blue" mb={2} />}
        <StatLabel fontSize="sm" color="gray.500">{title}</StatLabel>
        <StatNumber fontSize="2xl" fontWeight="bold" color="brand.darkBlue">
          {value}
        </StatNumber>
        {description && (
          <StatHelpText mb={0}>
            {description}
          </StatHelpText>
        )}
        {trend && (
          <StatHelpText mb={0} color={trend.isUpward ? "green.500" : "red.500"}>
            {trend.isUpward ? "↑" : "↓"} {trend.value}%
          </StatHelpText>
        )}
      </Stat>
    </Box>
  );
};

export default StatisticsCard;
