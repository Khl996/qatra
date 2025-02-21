import {
  Box,
  Flex,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';

interface TopBarProps {
  onToggleSidebar: () => void;
}

const TopBar = ({ onToggleSidebar }: TopBarProps) => {
  return (
    <Box
      pos="fixed"
      top={0}
      left={0}
      right={0}
      height="64px"
      bg="blue.500"
      zIndex={1000}
    >
      <Flex
        h="100%"
        px={4}
        alignItems="center"
        justifyContent="space-between"
      >
        <IconButton
          aria-label="Toggle Sidebar"
          icon={<FiMenu />}
          onClick={onToggleSidebar}
          variant="ghost"
          color="white"
          _hover={{ bg: 'blue.600' }}
          _active={{ bg: 'blue.700' }}
          size="lg"
        />
        
        {/* يمكنك إضافة المزيد من العناصر هنا مثل الشعار والإشعارات */}
      </Flex>
    </Box>
  );
};

export default TopBar;
