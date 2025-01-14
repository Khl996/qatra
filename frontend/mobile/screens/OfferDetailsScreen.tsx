import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Offer } from '../../shared/types';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../shared/types/navigation';

type Props = StackScreenProps<RootStackParamList, 'OfferDetails'>;

const OfferDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { offer, userPoints, onRedeem } = route.params;

  const handleRedeem = () => {
    Alert.alert(
      'تأكيد الاستبدال',
      `هل أنت متأكد من استبدال ${offer.pointsRequired} نقطة للحصول على هذا العرض؟`,
      [
        {
          text: 'إلغاء',
          style: 'cancel',
        },
        {
          text: 'تأكيد',
          onPress: () => {
            onRedeem();
            navigation.goBack();
          },
        },
      ],
    );
  };

  return (
    <ScrollView style={styles.container}>
      {offer.image && (
        <Image
          source={{ uri: offer.image }}
          style={styles.image}
          resizeMode="cover"
        />
      )}

      <View style={styles.content}>
        <Text style={styles.title}>{offer.title}</Text>
        <Text style={styles.description}>{offer.description}</Text>

        <View style={styles.pointsContainer}>
          <Text style={styles.pointsRequired}>
            النقاط المطلوبة: {offer.pointsRequired}
          </Text>
          <Text style={styles.userPoints}>
            نقاطك الحالية: {userPoints}
          </Text>
        </View>

        <Text style={styles.validUntil}>
          العرض صالح حتى: {new Date(offer.validUntil).toLocaleDateString('ar-SA')}
        </Text>

        <TouchableOpacity
          style={[
            styles.redeemButton,
            userPoints < offer.pointsRequired && styles.disabledButton
          ]}
          onPress={handleRedeem}
          disabled={userPoints < offer.pointsRequired}
        >
          <Text style={styles.redeemButtonText}>
            {userPoints < offer.pointsRequired ? 'نقاط غير كافية' : 'استبدال النقاط'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'right',
    lineHeight: 24,
    marginBottom: 16,
  },
  pointsContainer: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  pointsRequired: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    textAlign: 'right',
  },
  userPoints: {
    fontSize: 16,
    color: '#666',
    textAlign: 'right',
    marginTop: 4,
  },
  validUntil: {
    fontSize: 14,
    color: '#999',
    textAlign: 'right',
    marginBottom: 24,
  },
  redeemButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  redeemButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OfferDetailsScreen;
