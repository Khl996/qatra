import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function OfferCard({ offer }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => navigation.navigate('OfferDetails', { offerId: offer.id })}
    >
      <Text style={styles.discount}>{offer.discount}% خصم</Text>
      <Text style={styles.title}>{offer.title}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {offer.description}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    padding: 16,
    marginEnd: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 3
  },
  discount: {
    color: '#007AFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right'
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 8,
    textAlign: 'right'
  },
  description: {
    color: '#666',
    fontSize: 14,
    textAlign: 'right'
  }
});
