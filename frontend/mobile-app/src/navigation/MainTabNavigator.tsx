import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, Platform, Image } from 'react-native';
import { MainTabParamList } from './types';
import HomeScreen from '../screens/home/HomeScreen';
import PointsScreen from '../screens/points/PointsScreen';
import OffersScreen from '../screens/offers/OffersScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import StoresScreen from '../screens/stores/StoresScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

// تعريف اللون الجديد كثابت
const BRAND_BLUE = '#0066FF'; // لون أزرق أكثر إشراقاً

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
          elevation: 0,
          position: 'relative',
        },
        tabBarItemStyle: {
          paddingBottom: 5,
        },
        tabBarBackground: () => (
          <View style={styles.tabBarBackground}>
            <View style={styles.tabBarTopCurve} />
            <View style={styles.tabBarCurveContainer}>
              <View style={styles.tabBarCurveLeft} />
              <View style={styles.tabBarCurveRight} />
            </View>
          </View>
        ),
        tabBarActiveTintColor: BRAND_BLUE,
        tabBarInactiveTintColor: '#95A5A6',
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarLabel: 'الرئيسية',
          tabBarIcon: ({ focused }) => (
            <Image 
              source={require('../../assets/icons/home_icon.png')}
              style={[
                styles.icon,
                { tintColor: focused ? BRAND_BLUE : '#95A5A6' }
              ]}
              resizeMode="contain"
            />
          ),
        }}
      />
      
      <Tab.Screen 
        name="Stores" 
        component={StoresScreen}
        options={{
          tabBarLabel: 'المتاجر',
          tabBarIcon: ({ focused }) => (
            <Image 
              source={require('../../assets/icons/store_icon.png')}
              style={[
                styles.icon,
                { tintColor: focused ? BRAND_BLUE : '#95A5A6' }
              ]}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tab.Screen 
        name="Points" 
        component={PointsScreen}
        options={{
          tabBarLabel: 'النقاط',
          tabBarIcon: ({ focused }) => (
            <View style={styles.pointsWrapper}>
              <View style={styles.pointsIconContainer}>
                <Image 
                  source={require('../../assets/icons/star_icon.png')}
                  style={[
                    styles.pointsIcon,
                    { tintColor: '#FFFFFF' }
                  ]}
                  resizeMode="contain"
                />
              </View>
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
            <Image 
              source={require('../../assets/icons/tags_icon.png')}
              style={[
                styles.icon,
                { tintColor: focused ? BRAND_BLUE : '#95A5A6' }
              ]}
              resizeMode="contain"
            />
          ),
        }}
      />
      
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'حسابي',
          tabBarIcon: ({ focused }) => (
            <Image 
              source={require('../../assets/icons/user_icon.png')}
              style={[
                styles.icon,
                { tintColor: focused ? BRAND_BLUE : '#95A5A6' }
              ]}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
  pointsWrapper: {
    width: 60,
    height: 60,
    marginBottom: 22, // تم تقليل القيمة من 35 إلى 25
    backgroundColor: 'transparent',
    zIndex: 2,
  },
  pointsIconContainer: {
    backgroundColor: BRAND_BLUE,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: BRAND_BLUE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4, // زيادة الشفافية
    shadowRadius: 12, // زيادة نطاق الظل
    elevation: 8,
    position: 'absolute',
    top: -8, // تم تغيير القيمة من -15 إلى -5
    transform: [{ scale: 1.02 }], // إضافة تأثير تكبير خفيف
  },
  pointsIcon: {
    width: 28,
    height: 28,
  },
  tabBarBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05, // تخفيف الظل
    shadowRadius: 8,
    elevation: 8,
    overflow: 'hidden',
  },
  tabBarTopCurve: {
    position: 'absolute',
    top: -15, // تعديل الارتفاع
    left: '50%',
    width: 80, // زيادة العرض
    height: 40, // زيادة الارتفاع
    transform: [{ translateX: -40 }],
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  tabBarCurveContainer: {
    position: 'absolute',
    top: -10,
    left: '50%',
    width: 120,
    height: 60,
    transform: [{ translateX: -60 }],
    flexDirection: 'row',
  },
  tabBarCurveLeft: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 30,
  },
  tabBarCurveRight: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
  },
  tabBarCurve: {
    position: 'absolute',
    top: -25, // تعديل موضع المنحنى
    left: '50%',
    width: 80, // زيادة حجم المنحنى
    height: 80,
    transform: [{ translateX: -40 }],
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
});
