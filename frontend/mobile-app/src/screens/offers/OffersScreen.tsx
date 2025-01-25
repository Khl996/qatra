import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../components/common/Header';
import { SearchBar } from '../../components/common/SearchBar';
import { OfferCard } from '../../components/cards/OfferCard';

// بيانات تجريبية للعروض
const offers = [
  {
    id: '1',
    title: 'خصم 50% على القهوة',
    description: 'احصل على خصم 50% على جميع أنواع القهوة المختصة. العرض ساري حتى نهاية الشهر.',
    points: 200,
    imageUrl: 'https://example.com/offer1.jpg',
    expiryDate: '2024/02/01',
    storeName: 'كافيه السعادة'
  },
  {
    id: '2',
    title: 'اشتري 1 واحصل على 1 مجاناً',
    description: 'على جميع المشروبات الباردة. العرض متاح طوال أيام الأسبوع.',
    points: 150,
    imageUrl: 'https://example.com/offer2.jpg',
    expiryDate: '2024/02/15',
    storeName: 'مقهى الأصدقاء'
  }
];

const categories = ['الكل', 'مطاعم', 'كافيهات', 'متاجر', 'ترفيه'];

export default function OffersScreen() {
  const [activeCategory, setActiveCategory] = useState('الكل');

  const handleSearch = (text: string) => {
    console.log('Searching:', text);
  };

  const handleOfferPress = (offerId: string) => {
    console.log('Offer pressed:', offerId);
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

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                activeCategory === category && styles.activeCategoryButton
              ]}
              onPress={() => setActiveCategory(category)}
            >
              <Text style={[
                styles.categoryText,
                activeCategory === category && styles.activeCategoryText
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {offers.map((offer) => (
          <OfferCard
            key={offer.id}
            {...offer}
            onPress={() => handleOfferPress(offer.id)}
          />
        ))}
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
  categoriesContainer: {
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activeCategoryButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
  },
  activeCategoryText: {
    color: '#fff',
    fontWeight: '500',
  },
  scrollContent: {
    paddingTop: Platform.OS === 'ios' ? 120 : 100,
  },
});
