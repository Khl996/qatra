import React from 'react';
import { View, ScrollView, StyleSheet, Platform, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../components/common/Header';
import { PointsCard } from '../../components/cards/PointsCard';
import { PointsHistoryItem } from '../../components/cards/PointsHistoryItem';

// بيانات تجريبية - سيتم استبدالها بيانات حقيقية
const pointsHistory = [
  { id: '1', storeName: 'متجر البركة', points: 50, date: '2024/01/21', isEarned: true },
  { id: '2', storeName: 'سوق الخير', points: 30, date: '2024/01/20', isEarned: true },
  { id: '3', storeName: 'استبدال نقاط', points: 100, date: '2024/01/19', isEarned: false },
];

export default function PointsScreen() {
  return (
    <View style={styles.container}>
      <Header 
        username="محمد"
        userId="12345678"
        showNotification
      />
      
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
      >
        <PointsCard points={580} level="عضو ذهبي" />
        
        <View style={styles.historySection}>
          <Text style={styles.historyTitle}>سجل النقاط</Text>
          {pointsHistory.map(item => (
            <PointsHistoryItem
              key={item.id}
              storeName={item.storeName}
              points={item.points}
              date={item.date}
              isEarned={item.isEarned}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: Platform.OS === 'ios' ? 120 : 100,
  },
  historySection: {
    marginTop: 16,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
});
