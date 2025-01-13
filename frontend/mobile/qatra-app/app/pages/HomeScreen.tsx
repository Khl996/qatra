import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const banners = [
    { id: '1', image: require('../../assets/banner1.jpg') },
    { id: '2', image: require('../../assets/banner2.jpg') },
    { id: '3', image: require('../../assets/banner3.jpg') },
  ];

  const stores = [
    { id: '1', name: 'متجر 1', description: 'أفضل متجر للمنتجات الغذائية' },
    { id: '2', name: 'متجر 2', description: 'عروض رائعة على الإلكترونيات' },
    { id: '3', name: 'متجر 3', description: 'خصومات كبيرة على الملابس' },
  ];

  const renderBanner = ({ item }: { item: any }) => (
    <Image source={item.image} style={styles.banner} />
  );

  const renderStore = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.storeCard} onPress={() => navigation.navigate('Store', { storeId: item.id })}>
      <Text style={styles.storeName}>{item.name}</Text>
      <Text style={styles.storeDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>الصفحة الرئيسية</Text>
      <FlatList
        data={banners}
        renderItem={renderBanner}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.bannerList}
      />
      <Text style={styles.subtitle}>المتاجر القريبة</Text>
      <FlatList
        data={stores}
        renderItem={renderStore}
        keyExtractor={(item) => item.id}
        style={styles.storeList}
      />
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
  bannerList: {
    marginBottom: 20,
  },
  banner: {
    width: 300,
    height: 150,
    borderRadius: 10,
    marginRight: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  storeList: {
    marginTop: 10,
  },
  storeCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  storeName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  storeDescription: {
    fontSize: 14,
    color: '#555',
  },
});

export default HomeScreen;
