import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const StoreScreen: React.FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
  const { storeId } = route.params;

  // بيانات وهمية عن المتجر
  const storeDetails = {
    id: storeId,
    name: 'متجر الأزياء',
    description: 'أفضل المتاجر لشراء الملابس والإكسسوارات.',
    points: 150,
  };

  const products = [
    { id: '1', name: 'قميص رسمي', price: '50 ريال' },
    { id: '2', name: 'حذاء رياضي', price: '120 ريال' },
    { id: '3', name: 'حقيبة يد', price: '200 ريال' },
  ];

  const renderProduct = ({ item }: { item: any }) => (
    <View style={styles.productCard}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{storeDetails.name}</Text>
      <Text style={styles.description}>{storeDetails.description}</Text>
      <Text style={styles.points}>النقاط المكتسبة: {storeDetails.points}</Text>
      <Text style={styles.subtitle}>المنتجات المتوفرة</Text>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        style={styles.productList}
      />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>رجوع</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  points: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productList: {
    marginTop: 10,
  },
  productCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: '#555',
  },
  backButton: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StoreScreen;
