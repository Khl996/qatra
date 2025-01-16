import React from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import Card from '../components/Card'; // تصحيح المسار
import { useGetOffersQuery } from '../store/api/offersApi'; // تصحيح المسار

const OffersScreen = () => {
  const { data: offers, isLoading } = useGetOffersQuery();

  if (isLoading) {
    return <ActivityIndicator size="large" color="#007AFF" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={offers}
        renderItem={({ item }) => (
          <Card>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.discount}>{item.discount}% خصم</Text>
            <Text style={styles.description}>{item.description}</Text>
          </Card>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'right',
  },
  discount: {
    fontSize: 16,
    color: '#007AFF',
    marginBottom: 8,
    textAlign: 'right',
  },
  description: {
    color: '#666',
    textAlign: 'right',
  },
});

export default OffersScreen;
