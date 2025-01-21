import React from 'react';
import { Box, Stat, StatLabel, StatNumber, StatHelpText, StatArrow } from '@chakra-ui/react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  helpText?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  helpText
}) => {
  return (
    <Box p={6} bg="white" borderRadius="lg" boxShadow="sm">
      <Stat>
        <StatLabel fontSize="sm" color="gray.500">{title}</StatLabel>
        <StatNumber fontSize="2xl" fontWeight="bold">{value}</StatNumber>
        {change && (
          <StatHelpText>
            <StatArrow type={change > 0 ? 'increase' : 'decrease'} />
            {Math.abs(change)}%
          </StatHelpText>
        )}
        {helpText && (
          <StatHelpText fontSize="xs" color="gray.500">
            {helpText}
          </StatHelpText>
        )}
      </Stat>
    </Box>
  );
};
