import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../components/common/Header';
import { SearchBar } from '../../components/common/SearchBar';
import { Carousel } from '../../components/common/Carousel';
import { StoreCard } from '../../components/cards/StoreCard';
import { api } from '../../config/api.config';
import { useAuth } from '../../context/AuthContext';

// مثال للصور الإعلانية - سيتم استبدالها بصور حقيقية
const carouselImages = [
  'https://example.com/ad1.jpg',
  'https://example.com/ad2.jpg',
  'https://example.com/ad3.jpg',
];

export default function HomeScreen() {
  const [featuredStores, setFeaturedStores] = useState([]);
  const [nearbyStores, setNearbyStores] = useState([]);
  const [data, setData] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/points');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchStores = async () => {
      try {
        const featuredResponse = await api.get('/stores/featured');
        setFeaturedStores(featuredResponse.data);

        const nearbyResponse = await api.get('/stores/nearby');
        setNearbyStores(nearbyResponse.data);
      } catch (error) {
        console.error('Error fetching stores:', error);
      }
    };

    fetchData();
    fetchStores();
  }, []);

  const handleSearch = (text: string) => {
    console.log('Searching:', text);
  };

  const handleStorePress = (storeId: string) => {
    console.log('Store pressed:', storeId);
  };

  return (
    <View style={styles.container}>
      <Header 
        name={user?.name || ''}
        uniqueCode={user?.uniqueCode || ''}
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
        <View style={styles.apiDataContainer}>
          <Text>Data from API:</Text>
          <Text>{JSON.stringify(data, null, 2)}</Text>
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
  apiDataContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 16,
  },
});
