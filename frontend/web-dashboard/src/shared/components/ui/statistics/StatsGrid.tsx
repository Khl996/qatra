import { SimpleGrid } from '@chakra-ui/react';

interface StatsGridProps {
  children: React.ReactNode;
  columns?: { base: number; md: number; lg: number };
  spacing?: number;
}

const StatsGrid = ({ children, columns = { base: 1, md: 2, lg: 4 }, spacing = 6 }: StatsGridProps) => {
  return (
    <SimpleGrid columns={columns} spacing={spacing}>
      {children}
    </SimpleGrid>
  );
};

export default StatsGrid;
