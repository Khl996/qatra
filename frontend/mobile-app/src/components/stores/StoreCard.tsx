import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface StoreCardProps {
  name: string;
  rating: number;
  distance?: string;
  imageUrl: string;
  onPress: () => void;
}

export const StoreCard: React.FC<StoreCardProps> = ({
  name,
  rating,
  distance,
  imageUrl,
  onPress
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        <View style={styles.ratingContainer}>
          <View style={styles.ratingWrapper}>
            <Image 
              source={require('../../../assets/icons/rating_star.png')}
              style={styles.starIcon}
              resizeMode="contain"
            />
            <Text style={styles.rating}>{rating.toFixed(1)}</Text>
          </View>
          {distance && <Text style={styles.distance}>{distance}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 160,
    marginRight: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 4,
  },
  imageContainer: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
    tintColor: '#f1c40f',
  },
  rating: {
    fontSize: 14,
    color: '#2c3e50',
    fontWeight: '500',
  },
  distance: {
    fontSize: 12,
    color: '#7f8c8d',
  },
});
