import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  direction: 'rtl',
  fonts: {
    heading: 'Cairo, sans-serif',
    body: 'Cairo, sans-serif',
  },
  colors: {
    brand: {
      darkBlue: '#003f5c',
      blue: '#007aff',
      lightBlue: '#9fd3f2',
    },
  },
});

export default theme;
