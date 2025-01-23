import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
      <Typography variant="h4" gutterBottom>
        غير مصرح بالوصول
      </Typography>
      <Typography color="text.secondary" gutterBottom>
        عذراً، لا تملك الصلاحية للوصول إلى هذه الصفحة
      </Typography>
      <Button variant="contained" onClick={() => navigate(-1)} sx={{ mt: 2 }}>
        العودة للخلف
      </Button>
    </Box>
  );
};

export default UnauthorizedPage;
