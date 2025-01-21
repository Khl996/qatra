import React from 'react';
import {
  VStack,
  HStack,
  Box,
  Text,
  Progress,
  Divider,
  SimpleGrid,
  Card,
  CardBody,
  Badge,
} from '@chakra-ui/react';

interface PointsRewardsTabProps {
  points: number;
  nextReward: number;
}

export const PointsRewardsTab: React.FC<PointsRewardsTabProps> = ({
  points,
  nextReward
}) => {
  const rewardsHistory = [
    { id: '1', title: 'خصم 50 ريال', points: 100, date: '2024/01/15', status: 'used' },
    { id: '2', title: 'قهوة مجانية', points: 50, date: '2024/01/10', status: 'available' },
  ];

  const progress = (points / nextReward) * 100;

  return (
    <VStack spacing={6}>
      <Card>
        <CardBody>
          <VStack spacing={4}>
            <Text fontSize="lg" fontWeight="bold">تقدم النقاط</Text>
            <Text>تحتاج إلى {nextReward - points} نقطة للحصول على المكافأة التالية</Text>
            <Progress value={progress} size="lg" colorScheme="blue" borderRadius="full" />
            <HStack justify="space-between">
              <Text>{points} نقطة</Text>
              <Text>{nextReward} نقطة</Text>
            </HStack>
          </VStack>
        </CardBody>
      </Card>

      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={4}>المكافآت المتاحة</Text>
        <SimpleGrid columns={2} spacing={4}>
          {rewardsHistory.map(reward => (
            <Card key={reward.id}>
              <CardBody>
                <VStack>
                  <Text fontWeight="bold">{reward.title}</Text>
                  <Text color="blue.500">{reward.points} نقطة</Text>
                  <Text fontSize="sm" color="gray.500">{reward.date}</Text>
                  <Badge 
                    colorScheme={reward.status === 'available' ? 'green' : 'gray'}
                  >
                    {reward.status === 'available' ? 'متاح' : 'مستخدم'}
                  </Badge>
                </VStack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    </VStack>
  );
};
