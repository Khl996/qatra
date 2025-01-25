import React from 'react';
import { View, ScrollView, StyleSheet, Platform } from 'react-native';
import { Header } from '../../components/common/Header';
import { SearchBar } from '../../components/common/SearchBar';
import { StoreCard } from '../../components/cards/StoreCard';

const allStores = [
  { id: '1', name: 'متجر البركة', rating: 4.5, distance: '0.5 كم', imageUrl: 'https://example.com/store1.jpg' },
  { id: '2', name: 'سوق الخير', rating: 4.8, distance: '0.8 كم', imageUrl: 'https://example.com/store2.jpg' },
  { id: '3', name: 'متجر السعادة', rating: 4.2, distance: '1.2 كم', imageUrl: 'https://example.com/store3.jpg' },
  // يمكن إضافة المزيد من المتاجر هنا
];

export default function StoresScreen() {
  const handleSearch = (text: string) => {
    console.log('Searching:', text);
  };

  const handleStorePress = (storeId: string) => {
    console.log('Store pressed:', storeId);
  };

  return (
    <View style={styles.container}>
      <Header 
        username="محمد"
        userId="12345678"
        showNotification
      />
      
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
      >
        <SearchBar onSearch={handleSearch} />
        
        <View style={styles.storesGrid}>
          {allStores.map(store => (
            <View key={store.id} style={styles.storeCardWrapper}>
              <StoreCard
                {...store}
                onPress={() => handleStorePress(store.id)}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: Platform.OS === 'ios' ? 120 : 100,
    paddingHorizontal: 16,
  },
  storesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  storeCardWrapper: {
    width: '48%',
    marginBottom: 16,
  }
});
