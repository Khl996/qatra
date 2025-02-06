import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PointsCardProps {
  points: number;
  level?: string;
}

export const PointsCard: React.FC<PointsCardProps> = ({ 
  points, 
  level = 'عضو' 
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.pointsContainer}>
        <Text style={styles.pointsNumber}>{points}</Text>
        <Text style={styles.pointsText}>نقطة</Text>
      </View>
      <Text style={styles.level}>{level}</Text>
      <Text style={styles.hint}>كل 100 نقطة = 10 ريال</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    padding: 20,
    margin: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  pointsContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  pointsNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFF',
  },
  pointsText: {
    fontSize: 20,
    color: '#FFF',
    marginTop: 4,
  },
  level: {
    fontSize: 16,
    color: '#FFF',
    opacity: 0.9,
    marginBottom: 8,
  },
  hint: {
    fontSize: 14,
    color: '#FFF',
    opacity: 0.8,
  }
});

export default PointsCard;