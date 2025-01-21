import React, { ReactNode } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <Flex h="100vh" direction="row-reverse">
      <Sidebar />
      <Box flex="1" bg="gray.50">
        <Navbar />
        <Box p={8}>
          {children}
        </Box>
      </Box>
    </Flex>
  );
};
