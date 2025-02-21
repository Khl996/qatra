import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, Alert } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import StoreCard from '../../components/stores/StoreCard';
import storesApi from '../../services/api/stores';
import useLocation from '../../hooks/useLocation';

// تعريف نوع Navigation
type RootStackParamList = {
  StoreDetails: { storeId: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Store {
  id: string;
  name: string;
  image: string;
  rating: number;
  distance: string;
  category: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

const StoresScreen = () => {
  const [featuredStores, setFeaturedStores] = useState<Store[]>([]);
  const [nearbyStores, setNearbyStores] = useState<Store[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { location } = useLocation();
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    fetchStores();
  }, [location]);

  const fetchStores = async () => {
    try {
      setIsLoading(true);
      console.log('Starting to fetch stores...');

      const featuredData = await storesApi.getFeaturedStores();
      console.log('Featured stores data:', featuredData);
      
      // تحويل البيانات لتناسب واجهة التطبيق
      const formattedStores = featuredData.stores.map(store => ({
        ...store,
        distance: store.location ? calculateDistance(
          location?.coords.latitude || 0,
          location?.coords.longitude || 0,
          store.location.latitude,
          store.location.longitude
        ) : 'غير متاح'
      }));

      setFeaturedStores(formattedStores);
      
      let nearbyData = { stores: [] };
      if (location?.coords) {
        nearbyData = await storesApi.getNearbyStores(
          location.coords.latitude,
          location.coords.longitude
        );
        console.log('Nearby stores data:', nearbyData);
      }
      
      setNearbyStores(nearbyData.stores || []);
      
      // التحقق من البيانات بعد تحديثها
      console.log('Updated featured stores:', featuredData.stores?.length || 0);
      console.log('Updated nearby stores:', nearbyData.stores?.length || 0);
      
    } catch (error) {
      console.error('Error in fetchStores:', error);
      Alert.alert(
        'خطأ',
        'حدث خطأ في جلب المتاجر',
        [{ text: 'حسناً', style: 'cancel' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  // دالة لحساب المسافة بين نقطتين
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    // يمكن إضافة حساب المسافة هنا
    // حالياً نعيد قيمة افتراضية
    return '2.5 كم';
  };

  const handleStorePress = (storeId: string) => {
    navigation.navigate('StoreDetails', { storeId });
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text variant="headlineSmall" style={styles.heading}>المتاجر المميزة</Text>
        {featuredStores.length > 0 ? (
          featuredStores.map(store => (
            <StoreCard
              key={store.id}
              {...store}
              onPress={handleStorePress}
            />
          ))
        ) : (
          <Text style={styles.emptyText}>لا توجد متاجر مميزة حالياً</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text variant="headlineSmall" style={styles.heading}>المتاجر القريبة منك</Text>
        {nearbyStores.length > 0 ? (
          nearbyStores.map(store => (
            <StoreCard
              key={store.id}
              {...store}
              onPress={handleStorePress}
            />
          ))
        ) : (
          <Text style={styles.emptyText}>لا توجد متاجر قريبة حالياً</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    padding: 16,
  },
  heading: {
    marginBottom: 16,
    fontWeight: 'bold',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 10,
    marginBottom: 20,
  },
});

export default StoresScreen;
