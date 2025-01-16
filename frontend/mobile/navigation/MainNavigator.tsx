import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import TabNavigator from './TabNavigator';
import AuthStack from './AuthStack';
import LoadingScreen from '../screens/LoadingScreen';

const Stack = createStackNavigator();

export default function MainNavigator() {
  const { isLoading, token } = useSelector(state => state.auth);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {token ? <TabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
}
