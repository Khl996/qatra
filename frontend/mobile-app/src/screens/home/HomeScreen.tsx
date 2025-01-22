import React from 'react';
import { View, ScrollView, StyleSheet, Text, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../components/common/Header';
import { SearchBar } from '../../components/common/SearchBar';
import { Carousel } from '../../components/common/Carousel';
import { StoreCard } from '../../components/cards/StoreCard';

// مثال للصور الإعلانية - سيتم استبدالها بصور حقيقية
const carouselImages = [
  'https://example.com/ad1.jpg',
  'https://example.com/ad2.jpg',
  'https://example.com/ad3.jpg',
];

// مثال للمتاجر - سيتم استبدالها ببيانات حقيقية
const featuredStores = [
  { id: '1', name: 'متجر البركة', rating: 4.5, imageUrl: 'https://example.com/store1.jpg' },
  { id: '2', name: 'سوق الخير', rating: 4.8, imageUrl: 'https://example.com/store2.jpg' },
  { id: '3', name: 'متجر السعادة', rating: 4.2, imageUrl: 'https://example.com/store3.jpg' },
];

const nearbyStores = [
  { id: '4', name: 'متجر القمة', rating: 4.6, distance: '0.5 كم', imageUrl: 'https://example.com/store4.jpg' },
  { id: '5', name: 'سوق الأمانة', rating: 4.3, distance: '0.8 كم', imageUrl: 'https://example.com/store5.jpg' },
  { id: '6', name: 'متجر النور', rating: 4.7, distance: '1.2 كم', imageUrl: 'https://example.com/store6.jpg' },
];

export default function HomeScreen() {
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
        onNotificationPress={() => console.log('Notification pressed')}
        onProfilePress={() => console.log('Profile pressed')}
      />
      
      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <SearchBar onSearch={handleSearch} />
        
        <View style={styles.carouselContainer}>
          <Carousel images={carouselImages} />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>المتاجر المميزة</Text>
            <Text style={styles.sectionLink}>عرض الكل</Text>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScrollContent}
          >
            {featuredStores.map(store => (
              <StoreCard
                key={store.id}
                {...store}
                onPress={() => handleStorePress(store.id)}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>المتاجر القريبة</Text>
            <Text style={styles.sectionLink}>عرض الكل</Text>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScrollContent}
          >
            {nearbyStores.map(store => (
              <StoreCard
                key={store.id}
                {...store}
                onPress={() => handleStorePress(store.id)}
              />
            ))}
          </ScrollView>
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
    paddingTop: Platform.OS === 'ios' ? 120 : 100, // لإضافة مساحة للهيدر
  },
  carouselContainer: {
    marginVertical: 16,
  },
  section: {
    marginBottom: 24,
    overflow: 'visible', // للتأكد من عدم قص المحتوى
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
  },
  sectionLink: {
    fontSize: 14,
    color: '#3498db',
  },
  horizontalScrollContent: {
    paddingHorizontal: 16, // إضافة padding على جانبي القائمة
    paddingRight: 4, // تقليل padding اليمين لتعويض marginRight في StoreCard
  },
});
