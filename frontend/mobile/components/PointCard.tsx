import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

interface PointCardProps {
  point: {
    id: string;
    points: number;
    store: {
      name: string;
      logo: string;
    };
    createdAt: string;
  };
}

export default function PointCard({ point }: PointCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.storeName}>{point.store.name}</Text>
        <Text style={styles.points}>+{point.points} نقطة</Text>
      </View>
      <Text style={styles.date}>
        {format(new Date(point.createdAt), 'dd MMMM yyyy', { locale: ar })}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  header: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  storeName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  points: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  date: {
    color: '#666',
    textAlign: 'right',
    fontSize: 14,
  },
});
