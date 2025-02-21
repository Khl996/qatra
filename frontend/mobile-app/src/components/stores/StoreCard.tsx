import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface StoreCardProps {
  id: string;
  name: string;
  image: string;
  rating: number;
  distance: string;
  category: string;
  onPress: (id: string) => void;
}

const StoreCard = ({ id, name, image, rating, distance, category, onPress }: StoreCardProps) => {
  return (
    <TouchableOpacity onPress={() => onPress(id)}>
      <Card style={styles.card}>
        <Card.Cover source={{ uri: image }} />
        <Card.Content>
          <Text variant="titleMedium">{name}</Text>
          <Text variant="bodyMedium" style={styles.category}>{category}</Text>
          <View style={styles.row}>
            <View style={styles.row}>
              <MaterialCommunityIcons name="star" size={16} color="#FFC107" />
              <Text style={styles.ratingText}>{rating}</Text>
            </View>
            <View style={styles.row}>
              <MaterialCommunityIcons name="map-marker" size={16} color="#757575" />
              <Text style={styles.distanceText}>{distance}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    elevation: 2,
  },
  category: {
    color: '#757575',
    marginVertical: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
  },
  distanceText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#757575',
  },
});

export default StoreCard;
