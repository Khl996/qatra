import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PointsHistoryItemProps {
  storeName: string;
  points: number;
  date: string;
  isEarned?: boolean;
}

export const PointsHistoryItem: React.FC<PointsHistoryItemProps> = ({
  storeName,
  points,
  date,
  isEarned = true
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Text style={styles.storeName}>{storeName}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Text style={[styles.points, isEarned ? styles.earned : styles.spent]}>
        {isEarned ? '+' : '-'}{points}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  leftSection: {
    flex: 1,
  },
  storeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  points: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  earned: {
    color: '#27ae60',
  },
  spent: {
    color: '#e74c3c',
  },
});
