import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import api from '../../shared/api/config';
import { Store, Product, Offer } from '../../shared/types';
import Card from '../../shared/components/Card';

const StoreDetailsScreen: React.FC = ({ route }: any) => {
  const { storeId } = route.params;
  const [store, setStore] = useState<Store | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    const fetchStoreDetails = async () => {
      try {
        const [storeRes, productsRes, offersRes] = await Promise.all([
          api.get(`/stores/${storeId}`),
          api.get(`/stores/${storeId}/products`),
          api.get(`/stores/${storeId}/offers`),
        ]);

        setStore(storeRes.data);
        setProducts(productsRes.data);
        setOffers(offersRes.data);
      } catch (error) {
        console.error('Error fetching store details:', error);
      }
    };

    fetchStoreDetails();
  }, [storeId]);

  if (!store) return null;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: store.logo }} style={styles.logo} />
      <View style={styles.header}>
        <Text style={styles.storeName}>{store.name}</Text>
        <Text style={styles.rating}>⭐ {store.rating}/5</Text>
      </View>

      <Text style={styles.sectionTitle}>العروض المتاحة</Text>
      {offers.map((offer) => (
        <Card
          key={offer.id}
          title={offer.title}
          subtitle={`النقاط المطلوبة: ${offer.pointsRequired}`}
        >
          <Text style={styles.description}>{offer.description}</Text>
        </Card>
      ))}

      <Text style={styles.sectionTitle}>المنتجات</Text>
      {products.map((product) => (
        <Card
          key={product.id}
          title={product.name}
          subtitle={`${product.price} ريال`}
          image={product.image}
        >
          <Text style={styles.description}>{product.description}</Text>
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logo: {
    width: '100%',
    height: 200,
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  storeName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  rating: {
    fontSize: 18,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
});

export default StoreDetailsScreen;
