import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import PointsScreen from './screens/PointsScreen';
import ProfileScreen from './screens/ProfileScreen';
import OffersScreen from './screens/OffersScreen';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = require('./assets/icons/home_icon.png');
            } else if (route.name === 'Points') {
              iconName = require('./assets/icons/star_icon.png');
            } else if (route.name === 'Profile') {
              iconName = require('./assets/icons/user_icon.png');
            } else if (route.name === 'Offers') {
              iconName = require('./assets/icons/tags_icon.png');
            }
            return <Image source={iconName} style={{ width: size, height: size }} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Points" component={PointsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Offers" component={OffersScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
