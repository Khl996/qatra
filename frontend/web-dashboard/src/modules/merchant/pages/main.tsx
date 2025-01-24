import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import merchantTheme from './theme';
import MerchantApp from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <ChakraProvider theme={merchantTheme}>
    <MerchantApp />
  </ChakraProvider>
);

export {};
