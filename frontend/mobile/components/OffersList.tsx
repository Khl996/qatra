import React from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useGetStoreOffersQuery } from '../store/api/offersApi';
import OfferCard from './OfferCard';

export default function OffersList({ storeId }) {
  const { data: offers, isLoading } = useGetStoreOffersQuery(storeId);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#007AFF" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>العروض المتاحة</Text>
      <FlatList
        data={offers}
        renderItem={({ item }) => <OfferCard offer={item} />}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'right',
  }
});
