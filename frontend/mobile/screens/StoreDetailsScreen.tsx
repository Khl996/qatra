import React from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useGetStoreQuery } from '../store/api/storeApi';
import Card from '../components/Card';

type RouteParams = {
  StoreDetails: {
    storeId: string;
  };
};

const StoreDetailsScreen = () => {
  const route = useRoute<RouteProp<RouteParams, 'StoreDetails'>>();
  const { data: store, isLoading } = useGetStoreQuery(route.params.storeId);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#007AFF" />;
  }

  return (
    <ScrollView style={styles.container}>
      <Card>
        <Text style={styles.name}>{store?.name}</Text>
        <Text style={styles.category}>{store?.category}</Text>
        <Text style={styles.description}>{store?.description}</Text>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'right',
  },
  category: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
    textAlign: 'right',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'right',
  },
});

export default StoreDetailsScreen;
