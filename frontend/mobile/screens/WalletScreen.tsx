import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import api from '../../shared/api/config';

interface Transaction {
  id: string;
  points: number;
  type: 'earn' | 'redeem';
  storeName: string;
  date: string;
}

const WalletScreen: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWalletData();
  }, []);

  const fetchWalletData = async () => {
    try {
      const [pointsRes, transactionsRes] = await Promise.all([
        api.get('/user/points'),
        api.get('/user/transactions')
      ]);
      
      setTotalPoints(pointsRes.data.points);
      setTransactions(transactionsRes.data);
    } catch (error) {
      console.error('Error fetching wallet data:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionHeader}>
        <Text style={styles.storeName}>{item.storeName}</Text>
        <Text style={[
          styles.points,
          item.type === 'earn' ? styles.earnPoints : styles.redeemPoints
        ]}>
          {item.type === 'earn' ? '+' : '-'}{item.points}
        </Text>
      </View>
      <Text style={styles.date}>
        {new Date(item.date).toLocaleDateString('ar-SA')}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.balanceCard}>
        <Text style={styles.balanceTitle}>رصيد النقاط</Text>
        <Text style={styles.balanceAmount}>{totalPoints}</Text>
      </View>

      <View style={styles.transactionsContainer}>
        <Text style={styles.sectionTitle}>سجل النقاط</Text>
        <FlatList
          data={transactions}
          renderItem={renderTransaction}
          keyExtractor={(item) => item.id}
          refreshing={loading}
          onRefresh={fetchWalletData}
        />
      </View>
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
  balanceCard: {
    backgroundColor: '#007AFF',
    padding: 20,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  balanceTitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
  },
  balanceAmount: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
  },
  transactionsContainer: {
    flex: 1,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 16,
    textAlign: 'right',
  },
  transactionItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  storeName: {
    fontSize: 16,
    fontWeight: '500',
  },
  points: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  earnPoints: {
    color: '#4CAF50',
  },
  redeemPoints: {
    color: '#F44336',
  },
  date: {
    color: '#666',
    fontSize: 14,
    textAlign: 'right',
  },
});

export default WalletScreen;
