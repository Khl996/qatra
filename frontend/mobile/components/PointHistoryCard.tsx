import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatDate } from '../utils/dateUtils';

interface PointHistoryCardProps {
  transaction: {
    id: string;
    points: number;
    type: 'earn' | 'spend';
    store: {
      name: string;
    };
    createdAt: string;
  };
}

const PointHistoryCard: React.FC<PointHistoryCardProps> = ({ transaction }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.storeName}>{transaction.store.name}</Text>
        <Text style={[
          styles.points,
          transaction.type === 'earn' ? styles.earnPoints : styles.spendPoints
        ]}>
          {transaction.type === 'earn' ? '+' : '-'}{transaction.points} نقطة
        </Text>
      </View>
      <Text style={styles.date}>{formatDate(transaction.createdAt)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  row: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  storeName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  points: {
    fontSize: 16,
    fontWeight: '500',
  },
  earnPoints: {
    color: '#4CAF50',
  },
  spendPoints: {
    color: '#F44336',
  },
  date: {
    color: '#666',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'right',
  }
});

export default PointHistoryCard;
