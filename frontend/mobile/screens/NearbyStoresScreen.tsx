import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Text
} from 'react-native';
import * as Location from 'expo-location';
import Card from '../../shared/components/Card';
import api from '../../shared/api/config';
import { Store } from '../../shared/types';
import type { StackScreenProps } from '@react-navigation/stack';
import type { RootStackParamList } from '../../shared/types/navigation';

type Props = StackScreenProps<RootStackParamList, 'NearbyStores'>;

const NearbyStoresScreen: React.FC<Props> = ({ navigation }) => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    fetchNearbyStores();
  }, []);

  const fetchNearbyStores = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocationError('نحتاج إلى صلاحية الموقع لعرض المتاجر القريبة');
        setLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const response = await api.get<Store[]>('/stores/nearby', {
        params: {
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        },
      });

      setStores(response.data);
    } catch (error) {
      setLocationError('حدث خطأ في تحديد موقعك');
      console.error('Error fetching nearby stores:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStore = ({ item }: { item: Store }) => (
    <Card
      title={item.name}
      subtitle={`التقييم: ${item.rating}/5`}
      image={item.logo}
      onPress={() => navigation.navigate('StoreDetails', { storeId: item.id })}
    >
      <Text style={styles.distance}>
        يبعد {item.distance?.toFixed(1)} كم
      </Text>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (locationError) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{locationError}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={stores}
        renderItem={renderStore}
        keyExtractor={(item) => item.id}
        refreshing={loading}
        onRefresh={fetchNearbyStores}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#ff3b30',
    textAlign: 'center',
  },
  distance: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
    marginTop: 4,
  },
});

export default NearbyStoresScreen;
