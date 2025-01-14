import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert
} from 'react-native';
import api from '../../shared/api/config';
import Card from '../../shared/components/Card';
import { Offer } from '../../shared/types';
import type { StackScreenProps } from '@react-navigation/stack';
import type { RootStackParamList } from '../../shared/types/navigation';

type Props = StackScreenProps<RootStackParamList, 'Offers'>;

const OffersScreen: React.FC<Props> = ({ navigation }) => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [userPoints, setUserPoints] = useState(0);

  useEffect(() => {
    fetchOffers();
    fetchUserPoints();
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await api.get('/offers/available');
      setOffers(response.data);
    } catch (error) {
      console.error('Error fetching offers:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserPoints = async () => {
    try {
      const response = await api.get('/user/points');
      setUserPoints(response.data.points);
    } catch (error) {
      console.error('Error fetching user points:', error);
    }
  };

  const handleRedeemOffer = async (offerId: string, pointsRequired: number) => {
    if (userPoints < pointsRequired) {
      Alert.alert('نقاط غير كافية', 'عذراً، لا تملك نقاط كافية لاستبدال هذا العرض');
      return;
    }

    try {
      await api.post(`/offers/${offerId}/redeem`);
      Alert.alert('تم بنجاح', 'تم استبدال النقاط بنجاح');
      fetchUserPoints();
      fetchOffers();
    } catch (error) {
      Alert.alert('خطأ', 'حدث خطأ أثناء استبدال النقاط');
    }
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pointsText}>نقاطك: {userPoints}</Text>
      </View>

      <FlatList
        data={offers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            subtitle={`النقاط المطلوبة: ${item.pointsRequired}`}
            onPress={() => navigation.navigate('OfferDetails', { 
              offer: item,
              userPoints: userPoints,
              onRedeem: () => handleRedeemOffer(item.id, item.pointsRequired)
            })}
          >
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.validUntil}>
              صالح حتى: {new Date(item.validUntil).toLocaleDateString('ar-SA')}
            </Text>
          </Card>
        )}
        refreshing={loading}
        onRefresh={fetchOffers}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  pointsText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#007AFF',
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
    marginTop: 8,
  },
  validUntil: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
    marginTop: 4,
  },
});

export default OffersScreen;
