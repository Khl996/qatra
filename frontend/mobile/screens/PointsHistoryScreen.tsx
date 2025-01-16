import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { useGetPointsHistoryQuery } from '../store/api/pointsApi';
import PointHistoryCard from '../components/PointHistoryCard';
import CustomButton from '../components/CustomButton';

export default function PointsHistoryScreen() {
  const { data: history, isLoading } = useGetPointsHistoryQuery();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>سجل النقاط</Text>
        <Text style={styles.subtitle}>
          إجمالي النقاط: {history?.totalPoints || 0}
        </Text>
      </View>

      <FlatList
        data={history?.transactions || []}
        renderItem={({ item }) => <PointHistoryCard transaction={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>لا يوجد سجل للنقاط</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    backgroundColor: '#007AFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'right',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginTop: 8,
    textAlign: 'right',
  },
  list: {
    padding: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  }
});
