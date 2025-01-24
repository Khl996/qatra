import { Flex, Heading, IconButton, useColorMode } from '@chakra-ui/react';
import { FiSun, FiMoon } from 'react-icons/fi';

const TopBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      px={4}
      h="60px"
      align="center"
      justify="space-between"
      borderBottomWidth="1px"
    >
      <Heading size="md">قطرة</Heading>
      <IconButton
        aria-label="Toggle color mode"
        icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
        onClick={toggleColorMode}
      />
    </Flex>
  );
};

export default TopBar;
