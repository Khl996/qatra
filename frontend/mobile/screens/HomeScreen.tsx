import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import Card from '../../shared/components/Card';
import api from '../../shared/api/config';
import type { Store } from '../../shared/types';
import type { StackScreenProps } from '@react-navigation/stack';
import type { RootStackParamList } from '../../shared/types/navigation';

type Props = StackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [stores, setStores] = useState<Store[]>([]);

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const response = await api.get<Store[]>('/stores/nearby');
      setStores(response.data);
    } catch (error) {
      console.error('Error fetching stores:', error);
    }
  };

  const renderStore = ({ item }: { item: Store }) => (
    <Card
      title={item.name}
      subtitle={`التقييم: ${item.rating}/5`}
      image={item.logo}
      onPress={() => navigation.navigate('StoreDetails', { storeId: item.id })}
    >
      <Text style={styles.distance}>يبعد {item.distance?.toFixed(1)} كم</Text>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={stores}
        renderItem={renderStore}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  distance: {  // إضافة style للمسافة
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
    marginTop: 4,
  }
});

export default HomeScreen;
