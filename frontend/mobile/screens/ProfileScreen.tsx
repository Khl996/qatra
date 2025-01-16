import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const menuItems = [
    {
      title: 'تعديل الملف الشخصي',
      icon: 'person-outline',
      onPress: () => navigation.navigate('EditProfile')
    },
    {
      title: 'سجل النقاط',
      icon: 'star-outline',
      onPress: () => navigation.navigate('PointsHistory')
    },
    {
      title: 'المساعدة',
      icon: 'help-circle-outline',
      onPress: () => navigation.navigate('Help')
    },
    {
      title: 'تسجيل الخروج',
      icon: 'log-out-outline',
      onPress: () => dispatch(logout())
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.phone}>{user?.phone}</Text>
      </View>
      
      {menuItems.map((item, index) => (
        <TouchableOpacity 
          key={index}
          style={styles.menuItem}
          onPress={item.onPress}
        >
          <Icon name={item.icon} size={24} color="#007AFF" />
          <Text style={styles.menuText}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    padding: 20,
    backgroundColor: '#007AFF',
    alignItems: 'center'
  },
  name: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold'
  },
  phone: {
    fontSize: 16,
    color: '#fff',
    marginTop: 8
  },
  menuItem: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  menuText: {
    fontSize: 16,
    marginRight: 12,
    textAlign: 'right'
  }
});
