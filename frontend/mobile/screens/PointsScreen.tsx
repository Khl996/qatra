import React from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useGetUserPointsQuery } from '../store/api/pointsApi';
import PointCard from '../components/PointCard';

export default function PointsScreen() {
  const { data: points, isLoading } = useGetUserPointsQuery();
  const totalPoints = points?.reduce((acc, curr) => acc + curr.points, 0) || 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>نقاطي</Text>
        <Text style={styles.total}>مجموع النقاط: {totalPoints}</Text>
      </View>
      
      {isLoading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <FlatList
          data={points}
          renderItem={({ item }) => <PointCard point={item} />}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  total: {
    fontSize: 18,
    color: '#007AFF',
    textAlign: 'right',
    marginTop: 8,
  },
});
