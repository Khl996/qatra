import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { register } from '../../store/slices/authSlice';

export default function RegisterScreen({ navigation }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: ''
  });
  
  const dispatch = useDispatch();

  const handleRegister = async () => {
    try {
      await dispatch(register(formData)).unwrap();
      navigation.replace('Login');
    } catch (error) {
      Alert.alert('خطأ', 'حدث خطأ في التسجيل');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>إنشاء حساب جديد</Text>
      {Object.keys(formData).map((key) => (
        <TextInput
          key={key}
          style={styles.input}
          placeholder={key === 'name' ? 'الاسم' : 
                      key === 'phone' ? 'رقم الجوال' :
                      key === 'email' ? 'البريد الإلكتروني' : 'كلمة المرور'}
          value={formData[key]}
          onChangeText={(text) => setFormData(prev => ({ ...prev, [key]: text }))}
          secureTextEntry={key === 'password'}
          keyboardType={key === 'phone' ? 'phone-pad' : 
                       key === 'email' ? 'email-address' : 'default'}
        />
      ))}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>تسجيل</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    textAlign: 'right',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
