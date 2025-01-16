import React, { useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import SearchBar from '../components/SearchBar';
import StoreCard from '../components/StoreCard';
import { useGetStoresQuery } from '../store/api/storeApi';

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: stores, isLoading } = useGetStoresQuery();

  const filteredStores = stores?.filter(store => 
    store.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      
      {isLoading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <FlatList
          data={filteredStores}
          renderItem={({ item }) => <StoreCard store={item} />}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  list: {
    paddingBottom: 16,
  },
});

export default HomeScreen;
