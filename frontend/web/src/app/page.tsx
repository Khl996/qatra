'use client';

import React from 'react';
import { Container, Button, Typography, Box } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          نظام قطرة
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom align="center" color="textSecondary">
          نظام إدارة نقاط الولاء للمتاجر
        </Typography>
        <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
          <Button 
            variant="contained" 
            color="primary"
            size="large"
            onClick={() => router.push('/admin/login')}
          >
            دخول المسؤول
          </Button>
          <Button 
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => router.push('/store/login')}
          >
            دخول المتجر
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
