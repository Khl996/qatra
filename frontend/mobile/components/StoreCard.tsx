import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function StoreCard({ store }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('StoreDetails', { storeId: store.id })}
    >
      <Image source={{ uri: store.logo }} style={styles.logo} />
      <View style={styles.info}>
        <Text style={styles.name}>{store.name}</Text>
        <Text style={styles.category}>{store.category}</Text>
        <Text style={styles.points}>النقاط المتوفرة: {store.points}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row-reverse',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  info: {
    flex: 1,
    marginRight: 12,
    alignItems: 'flex-end'
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  category: {
    color: '#666',
    marginVertical: 4
  },
  points: {
    color: '#007AFF',
    fontWeight: '500'
  }
});
