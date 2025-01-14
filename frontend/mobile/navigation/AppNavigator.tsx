import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import type { RootStackParamList } from '../../shared/types/navigation';

import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import OffersScreen from '../screens/OffersScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HelpScreen from '../screens/HelpScreen';
import OfferDetailsScreen from '../screens/OfferDetailsScreen';
import StoreDetailsScreen from '../screens/StoreDetailsScreen';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

type TabParamList = {
  Home: undefined;
  Offers: undefined;
  Profile: undefined;
};

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: 'beside-icon',
        tabBarLabelStyle: {
          fontSize: 14,
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen as React.ComponentType<any>}
        options={{ 
          title: 'الرئيسية',
          tabBarIcon: ({ color }) => <Icon name="home" color={color} size={24} />
        }}
      />
      <Tab.Screen 
        name="Offers" 
        component={OffersScreen as React.ComponentType<any>}
        options={{ 
          title: 'العروض',
          tabBarIcon: ({ color }) => <Icon name="gift" color={color} size={24} />
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen as React.ComponentType<any>}
        options={{ 
          title: 'حسابي',
          tabBarIcon: ({ color }) => <Icon name="user" color={color} size={24} />
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen 
          name="Login" 
          component={LoginScreen as React.ComponentType<any>} 
        />
        <Stack.Screen 
          name="SignUp" 
          component={SignUpScreen as React.ComponentType<any>} 
        />
        <Stack.Screen 
          name="Main" 
          component={MainTabs}
        />
        <Stack.Screen 
          name="OfferDetails" 
          component={OfferDetailsScreen as React.ComponentType<any>}
          options={{ headerShown: true, title: 'تفاصيل العرض' }}
        />
        <Stack.Screen 
          name="StoreDetails" 
          component={StoreDetailsScreen as React.ComponentType<any>}
          options={{ headerShown: true, title: 'تفاصيل المتجر' }}
        />
        <Stack.Screen 
          name="Settings" 
          component={SettingsScreen as React.ComponentType<any>}
          options={{ headerShown: true, title: 'الإعدادات' }}
        />
        <Stack.Screen 
          name="Help" 
          component={HelpScreen as React.ComponentType<any>}
          options={{ headerShown: true, title: 'المساعدة' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
