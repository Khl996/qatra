import {
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Icon,
  Flex,
  useColorModeValue
} from '@chakra-ui/react';
import { IconType } from 'react-icons';

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  icon?: IconType;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  subtitle?: string;
  colorScheme?: string;
}

const AnalyticsCard = ({
  title,
  value,
  icon,
  change,
  subtitle,
  colorScheme = 'blue'
}: AnalyticsCardProps) => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const iconBg = useColorModeValue(`${colorScheme}.100`, `${colorScheme}.800`);
  const iconColor = useColorModeValue(`${colorScheme}.500`, `${colorScheme}.200`);

  return (
    <Box
      p={6}
      bg={bgColor}
      borderRadius="lg"
      boxShadow="sm"
      position="relative"
      overflow="hidden"
    >
      <Flex justify="space-between" align="flex-start">
        <Stat>
          <StatLabel fontSize="sm" color="gray.500">
            {title}
          </StatLabel>
          <StatNumber fontSize="2xl" fontWeight="bold" mt={2}>
            {value}
          </StatNumber>
          {change && (
            <StatHelpText mb={0}>
              <StatArrow type={change.type} />
              {change.value}%
            </StatHelpText>
          )}
          {subtitle && (
            <StatHelpText mb={0} color="gray.500">
              {subtitle}
            </StatHelpText>
          )}
        </Stat>
        {icon && (
          <Box
            p={3}
            borderRadius="full"
            bg={iconBg}
          >
            <Icon as={icon} boxSize={6} color={iconColor} />
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default AnalyticsCard;
