import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from './store';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './navigation/AppNavigator';
import Toast from 'react-native-toast-message';
import { NetworkProvider } from './context/NetworkContext';

export default function App() {
  return (
    <Provider store={store}>
      <NetworkProvider>
        <SafeAreaProvider>
          <StatusBar style="auto" />
          <AppNavigator />
          <Toast />
        </SafeAreaProvider>
      </NetworkProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
