import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: 'merchant' | 'admin';
}

export default function DashboardLayout({ children, role }: DashboardLayoutProps) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar role={role} />
      <Box sx={{ flexGrow: 1 }}>
        <Navbar role={role} />
        <Box component="main" sx={{ p: 3 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
