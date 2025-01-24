import { Box, Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';
import TopBar from './TopBar';
import SideNavigationMenu from './SideNavigationMenu';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Flex h="100vh">
      <SideNavigationMenu />
      <Box flex="1">
        <TopBar />
        <Box p={4} overflowY="auto">
          {children}
        </Box>
      </Box>
    </Flex>
  );
};

export default MainLayout;
