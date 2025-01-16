import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function HelpScreen() {
  const helpItems = [
    {
      title: 'كيف يمكنني كسب النقاط؟',
      content: 'يمكنك كسب النقاط عن طريق الشراء من المتاجر المشاركة في البرنامج.',
      icon: 'star-outline'
    },
    {
      title: 'كيف أستخدم نقاطي؟',
      content: 'يمكنك استخدام نقاطك للحصول على خصومات في المتاجر المشاركة.',
      icon: 'gift-outline'
    }
  ];

  return (
    <ScrollView style={styles.container}>
      {helpItems.map((item, index) => (
        <View key={index} style={styles.card}>
          <Icon name={item.icon} size={24} color="#007AFF" />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.content}>{item.content}</Text>
        </View>
      ))}
      
      <TouchableOpacity 
        style={styles.supportButton}
        onPress={() => Linking.openURL('https://qatra-app.com/support')}
      >
        <Text style={styles.supportButtonText}>تواصل مع الدعم</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  card: {
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  content: {
    color: '#666',
    lineHeight: 20,
    textAlign: 'right',
  },
  supportButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
  },
  supportButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  }
});
