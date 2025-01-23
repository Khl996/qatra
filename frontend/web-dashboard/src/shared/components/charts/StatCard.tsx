import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: number;
  percentage?: number;
  color?: 'success' | 'warning' | 'error';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, trend, percentage, color }) => {
  return (
    <Card sx={{ bgcolor: color ? `${color}.light` : 'background.paper' }}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h4">{value}</Typography>
        {percentage !== undefined && (
          <Typography 
            variant="subtitle1" 
            color={percentage >= 0 ? 'success.main' : 'error.main'}
          >
            {percentage}%
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
