import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const ExploreScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: '1', name: 'مطاعم' },
    { id: '2', name: 'مقاهي' },
    { id: '3', name: 'متاجر إلكترونيات' },
    { id: '4', name: 'متاجر ملابس' },
  ];

  const stores = [
    { id: '1', name: 'مطعم الوجبة الشهية', category: 'مطاعم' },
    { id: '2', name: 'مقهى الراحة', category: 'مقاهي' },
    { id: '3', name: 'متجر التقنية', category: 'متاجر إلكترونيات' },
    { id: '4', name: 'متجر الأزياء', category: 'متاجر ملابس' },
  ];

  const filteredStores = stores.filter(
    (store) =>
      store.name.includes(searchQuery) ||
      store.category.includes(searchQuery)
  );

  const renderCategory = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.categoryButton}
      onPress={() => setSearchQuery(item.name)}
    >
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderStore = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.storeCard}
      onPress={() => navigation.navigate('Store', { storeId: item.id })}
    >
      <Text style={styles.storeName}>{item.name}</Text>
      <Text style={styles.storeCategory}>{item.category}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>استكشاف المتاجر</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="ابحث عن متجر..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Text style={styles.subtitle}>التصنيفات</Text>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryList}
      />
      <Text style={styles.subtitle}>المتاجر</Text>
      <FlatList
        data={filteredStores}
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
  searchInput: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryList: {
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  categoryText: {
    fontSize: 16,
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
  storeCategory: {
    fontSize: 14,
    color: '#555',
  },
});

export default ExploreScreen;
