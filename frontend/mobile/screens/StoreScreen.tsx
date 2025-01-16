import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useGetStorePointsQuery } from '../store/api/pointsApi';
import QRCode from '../components/QRCode';
import OffersList from '../components/OffersList';

export default function StoreScreen({ route }) {
  const { storeId } = route.params;
  const { data: store } = useGetStorePointsQuery(storeId);

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: store?.logo }} style={styles.logo} />
      <View style={styles.content}>
        <Text style={styles.name}>{store?.name}</Text>
        <Text style={styles.category}>{store?.category}</Text>
        <Text style={styles.points}>نقاطك: {store?.points || 0}</Text>
        <QRCode value={store?.id} />
        <OffersList storeId={storeId} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logo: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  category: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
    textAlign: 'right',
  },
  points: {
    fontSize: 18,
    color: '#007AFF',
    marginVertical: 16,
    textAlign: 'right',
  }
});
