import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../pages/WelcomeScreen';
import SignUpScreen from '../pages/SignUpScreen';
import LoginScreen from '../pages/LoginScreen';
import HomeScreen from '../pages/HomeScreen';
import ExploreScreen from '../pages/ExploreScreen';
import ProfileScreen from '../pages/ProfileScreen';
import StoreScreen from '../pages/StoreScreen';
// ...existing code...

const Stack = createStackNavigator();

const AppNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'تسجيل جديد' }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'تسجيل الدخول' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'الصفحة الرئيسية' }} />
        <Stack.Screen name="Explore" component={ExploreScreen} options={{ title: 'استكشاف المتاجر' }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'الحساب الشخصي' }} />
        <Stack.Screen name="Store" component={StoreScreen} options={{ title: 'تفاصيل المتجر' }} />
        {/* ...existing code... */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;

