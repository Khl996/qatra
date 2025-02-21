import { Routes, Route, Navigate } from 'react-router-dom';
import {
  Box,
  Flex,
  VStack,
  Icon,
  Text,
  useDisclosure,
  useBreakpointValue,
} from '@chakra-ui/react';
import {
  FiHome,
  FiUsers,
  FiDollarSign,
  FiSettings,
  FiBarChart2
} from 'react-icons/fi';

// استيراد المكونات
import MerchantDashboard from '../pages/merchant/dashboard/MerchantDashboard';
import MerchantCustomers from '../pages/merchant/customers/MerchantCustomers';
import MerchantTransactions from '../pages/merchant/transactions/MerchantTransactions';
import MerchantReports from '../pages/merchant/reports/MerchantReports';
import MerchantSettings from '../pages/merchant/settings/MerchantSettings';
import TopBar from '../components/merchant/TopBar';
import Sidebar from '../components/merchant/Sidebar';

const menuItems = [
  { icon: FiHome, name: 'الرئيسية', path: '/merchant/dashboard' },
  { icon: FiUsers, name: 'العملاء', path: '/merchant/customers' },
  { icon: FiDollarSign, name: 'المعاملات', path: '/merchant/transactions' },
  { icon: FiBarChart2, name: 'التقارير', path: '/merchant/reports' },
  { icon: FiSettings, name: 'الإعدادات', path: '/merchant/settings' },
];

const theme = {
  sidebar: { width: "240px" },
  topbar: { height: "64px" }
};

const MerchantLayout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, lg: false });

  return (
    <Box h="100vh" overflow="hidden">
      <TopBar onToggleSidebar={isOpen ? onClose : onOpen} />
      <Sidebar 
        isOpen={isOpen} 
        onClose={onClose}
        menuItems={menuItems}
      />

      <Box
        ml={{ base: 0, lg: isMobile ? 0 : theme.sidebar.width }}
        transition=".3s ease"
        pt={theme.topbar.height}
      >
        <Routes>
          <Route path="/" element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<MerchantDashboard />} />
          <Route path="customers" element={<MerchantCustomers />} />
          <Route path="transactions" element={<MerchantTransactions />} />
          <Route path="reports" element={<MerchantReports />} />
          <Route path="settings" element={<MerchantSettings />} />
          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default MerchantLayout;
