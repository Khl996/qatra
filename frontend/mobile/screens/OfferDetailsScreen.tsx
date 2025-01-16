import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

type OfferDetailsParams = {
  OfferDetails: {
    id: string;
    title: string;
    description: string;
    discount: number;
    storeId: string;
  };
};

const OfferDetailsScreen = () => {
  const route = useRoute<RouteProp<OfferDetailsParams, 'OfferDetails'>>();
  const { title, description, discount } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.discount}>{discount}% خصم</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'right',
  },
  discount: {
    fontSize: 20,
    color: '#007AFF',
    marginBottom: 15,
    textAlign: 'right',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'right',
  },
});

export default OfferDetailsScreen;
