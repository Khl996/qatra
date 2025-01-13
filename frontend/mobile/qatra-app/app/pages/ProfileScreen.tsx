import React from 'react';
import { View, Text, StyleSheet, Button, FlatList, Alert } from 'react-native';

const ProfileScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const userData = {
    name: 'محمد أحمد',
    uniqueId: '12345678',
    phone: '0501234567',
  };

  const pointsHistory = [
    { id: '1', description: 'شراء من متجر الأزياء', points: 50, date: '2025-01-01' },
    { id: '2', description: 'شراء من متجر التقنية', points: 30, date: '2025-01-02' },
    { id: '3', description: 'شراء من متجر الملابس', points: 20, date: '2025-01-03' },
  ];

  const renderHistoryItem = ({ item }: { item: any }) => (
    <View style={styles.historyItem}>
      <Text style={styles.historyDescription}>{item.description}</Text>
      <Text style={styles.historyPoints}>+{item.points} نقاط</Text>
      <Text style={styles.historyDate}>{item.date}</Text>
    </View>
  );

  const handleSupport = () => {
    Alert.alert('دعم فني', 'يرجى التواصل معنا عبر واتساب: 0501234567');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>الحساب الشخصي</Text>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>الاسم: {userData.name}</Text>
        <Text style={styles.userId}>الرقم الفريد: {userData.uniqueId}</Text>
        <Text style={styles.userPhone}>رقم الجوال: {userData.phone}</Text>
      </View>
      <Text style={styles.subtitle}>سجل النقاط</Text>
      <FlatList
        data={pointsHistory}
        renderItem={renderHistoryItem}
        keyExtractor={(item) => item.id}
        style={styles.historyList}
      />
      <Button title="دعم فني" onPress={handleSupport} color="#007BFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userInfo: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
  },
  userName: {
    fontSize: 18,
    marginBottom: 5,
  },
  userId: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  userPhone: {
    fontSize: 16,
    color: '#555',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  historyList: {
    marginBottom: 20,
  },
  historyItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  historyDescription: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  historyPoints: {
    fontSize: 14,
    color: '#007BFF',
    marginTop: 5,
  },
  historyDate: {
    fontSize: 12,
    color: '#555',
    marginTop: 5,
  },
});

export default ProfileScreen;
