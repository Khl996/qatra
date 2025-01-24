import { Box, useColorModeValue } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { TopBar } from './components/TopBar';
import { Sidebar } from './components/Sidebar';

const AdminLayout = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  return (
    <Box pos="relative" minH="100vh" bg={bgColor}>
      {/* TopBar */}
      <TopBar />
      
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <Box
        mr={{ base: 0, md: '56' }} // تغيير من 64 إلى 56 لتناسب عرض السايدبار الجديد
        pt="20"
        position="relative"
        height="calc(100vh - 5rem)"
        overflow="auto"
        transition="margin-right .3s ease" // تغيير من margin-left إلى margin-right
      >
        <Box p={5}> {/* تقليل padding قليلاً */}
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
