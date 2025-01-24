import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      darkBlue: '#003f5c',
      blue: '#007aff',
      lightBlue: '#9fd3f2',
      white: '#ffffff',
    },
  },
  fonts: {
    body: 'Cairo, sans-serif',
    heading: 'Cairo, sans-serif',
  },
  direction: 'rtl',
});

export default theme;
