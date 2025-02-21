import { useEffect, useState } from 'react';
import {
  Box,
  SimpleGrid,
  Skeleton,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Icon,
  useToast,
  Flex
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiUsers, FiStar, FiDollarSign, FiShoppingBag } from 'react-icons/fi';
import merchantApi from '../../../services/api/merchant';

const MotionBox = motion(Box);

interface DashboardStats {
  customers: number;
  points: number;
  transactions: number;
  revenue: number;
}

const defaultStats: DashboardStats = {
  customers: 0,
  points: 0,
  transactions: 0,
  revenue: 0,
};

const statsList = [
  { 
    key: 'customers', 
    label: 'العملاء', 
    icon: FiUsers,
    format: (value: number) => value.toString(),
    color: 'blue' 
  },
  { 
    key: 'points', 
    label: 'النقاط', 
    icon: FiStar,
    format: (value: number) => value.toLocaleString(),
    color: 'orange' 
  },
  { 
    key: 'transactions', 
    label: 'المعاملات', 
    icon: FiShoppingBag,
    format: (value: number) => value.toString(),
    color: 'green' 
  },
  { 
    key: 'revenue', 
    label: 'الإيرادات', 
    icon: FiDollarSign,
    format: (value: number) => `${value.toLocaleString()} ريال`,
    color: 'purple' 
  },
];

const MerchantDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>(defaultStats);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setIsLoading(true);
      const data = await merchantApi.getDashboardStats();
      setStats({ ...defaultStats, ...data });
    } catch (error) {
      toast({
        title: 'خطأ في جلب البيانات',
        description: 'تم تحميل البيانات الافتراضية',
        status: 'warning',
        duration: 3000,
      });
      setStats(defaultStats);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box p={5}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={5}>
        {isLoading ? (
          [...Array(4)].map((_, i) => (
            <Skeleton key={i} height="120px" />
          ))
        ) : (
          statsList.map(({ key, label, icon, format, color }) => (
            <MotionBox
              key={key}
              p={5}
              bg="white"
              borderRadius="lg"
              boxShadow="sm"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Stat>
                <Flex justify="space-between" align="center">
                  <Box>
                    <StatLabel fontSize="sm" color="gray.500">{label}</StatLabel>
                    <StatNumber fontSize="2xl" fontWeight="bold">
                      {format(stats[key as keyof DashboardStats])}
                    </StatNumber>
                  </Box>
                  <Icon 
                    as={icon} 
                    w={8} 
                    h={8} 
                    color={`${color}.500`}
                  />
                </Flex>
                <StatHelpText mb={0}>
                  {/* يمكن إضافة نسبة التغير هنا */}
                </StatHelpText>
              </Stat>
            </MotionBox>
          ))
        )}
      </SimpleGrid>
    </Box>
  );
};

export default MerchantDashboard;
