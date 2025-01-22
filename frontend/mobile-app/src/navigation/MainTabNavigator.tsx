import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, Platform, Image } from 'react-native';
import { MainTabParamList } from './types';
import HomeScreen from '../screens/home/HomeScreen';
import PointsScreen from '../screens/points/PointsScreen';
import OffersScreen from '../screens/offers/OffersScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          height: Platform.OS === 'ios' ? 90 : 70,
          paddingBottom: Platform.OS === 'ios' ? 25 : 10,
          paddingTop: 10,
          borderTopWidth: 0,
          elevation: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#95A5A6',
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarLabel: 'الرئيسية',
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.activeIcon : null}>
              <Image 
                source={require('../../assets/icons/home_icon.png')}
                style={[
                  styles.icon,
                  { tintColor: focused ? '#007AFF' : '#95A5A6' }
                ]}
                resizeMode="contain"
              />
            </View>
          ),
        }}
      />

      <Tab.Screen 
        name="Points" 
        component={PointsScreen}
        options={{
          tabBarLabel: 'النقاط',
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.activeIcon : null}>
              <Image 
                source={require('../../assets/icons/star_icon.png')}
                style={[
                  styles.icon,
                  { tintColor: focused ? '#007AFF' : '#95A5A6' }
                ]}
                resizeMode="contain"
              />
            </View>
          ),
        }}
      />

      <Tab.Screen 
        name="Offers" 
        component={OffersScreen}
        options={{
          tabBarLabel: 'العروض',
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.activeIcon : null}>
              <Image 
                source={require('../../assets/icons/tags_icon.png')}
                style={[
                  styles.icon,
                  { tintColor: focused ? '#007AFF' : '#95A5A6' }
                ]}
                resizeMode="contain"
              />
            </View>
          ),
        }}
      />

      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'حسابي',
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.activeIcon : null}>
              <Image 
                source={require('../../assets/icons/user_icon.png')}
                style={[
                  styles.icon,
                  { tintColor: focused ? '#007AFF' : '#95A5A6' }
                ]}
                resizeMode="contain"
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  activeIcon: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    padding: 8,
    borderRadius: 50,
  },
  icon: {
    width: 24,
    height: 24,
  }
});
