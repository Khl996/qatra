import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import PointsScreen from '../screens/PointsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { direction: 'rtl' },
        tabBarLabelPosition: 'beside-icon'
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          title: 'الرئيسية',
          tabBarIcon: ({color}) => <Icon name="home" size={24} color={color} />
        }}
      />
      <Tab.Screen 
        name="Points" 
        component={PointsScreen}
        options={{
          title: 'نقاطي',
          tabBarIcon: ({color}) => <Icon name="star" size={24} color={color} />
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          title: 'حسابي',
          tabBarIcon: ({color}) => <Icon name="person" size={24} color={color} />
        }}
      />
    </Tab.Navigator>
  );
}
