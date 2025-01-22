import { Box, Card, Typography } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

interface StatCardProps {
  title: string;
  value: number | string;
  percentage?: number;
  icon?: React.ReactNode;
}

export function StatCard({ title, value, percentage, icon }: StatCardProps) {
  return (
    <Card sx={{ p: 2 }}>
      <Box display="flex" justifyContent="space-between">
        {icon && <Box>{icon}</Box>}
        <Typography variant="h6">{title}</Typography>
      </Box>
      <Typography variant="h4" sx={{ my: 2 }}>{value}</Typography>
      {percentage !== undefined && (
        <Typography color={percentage >= 0 ? 'success.main' : 'error.main'}>
          {percentage}%
        </Typography>
      )}
    </Card>
  );
}
