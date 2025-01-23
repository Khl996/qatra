import React from 'react';
import { Box, Container } from '@mui/material';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: 'admin' | 'merchant';
}

export default function DashboardLayout({ children, role }: DashboardLayoutProps) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar role={role} />
      <Sidebar role={role} />
      <Container component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        {children}
      </Container>
    </Box>
  );
}
