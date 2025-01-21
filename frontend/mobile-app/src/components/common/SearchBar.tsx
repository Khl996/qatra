import React from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';

interface SearchBarProps {
  onSearch: (text: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/icons/search_icon.png')}
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.input}
        placeholder="ابحث عن متجر أو منتج..."
        placeholderTextColor="#666"
        onChangeText={onSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    margin: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
    padding: 8,
    textAlign: 'right',
  },
});
