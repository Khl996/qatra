import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Alert,
  ScrollView,
} from 'react-native';
import Button from '../../shared/components/Button';
import api from '../../shared/api/config';

const SignUpScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSignUp = async () => {
    if (formData.password !== formData.confirmPassword) {
      Alert.alert('خطأ', 'كلمات المرور غير متطابقة');
      return;
    }

    try {
      await api.post('/auth/register', formData);
      Alert.alert('نجاح', 'تم التسجيل بنجاح', [
        { text: 'حسناً', onPress: () => navigation.navigate('Login') }
      ]);
    } catch (error) {
      Alert.alert('خطأ', 'فشل التسجيل');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>إنشاء حساب جديد</Text>
        
        <TextInput
          style={styles.input}
          placeholder="الاسم الكامل"
          value={formData.name}
          onChangeText={(text) => setFormData({...formData, name: text})}
        />

        <TextInput
          style={styles.input}
          placeholder="رقم الجوال"
          value={formData.phone}
          onChangeText={(text) => setFormData({...formData, phone: text})}
          keyboardType="phone-pad"
        />

        <TextInput
          style={styles.input}
          placeholder="البريد الإلكتروني"
          value={formData.email}
          onChangeText={(text) => setFormData({...formData, email: text})}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="كلمة المرور"
          value={formData.password}
          onChangeText={(text) => setFormData({...formData, password: text})}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="تأكيد كلمة المرور"
          value={formData.confirmPassword}
          onChangeText={(text) => setFormData({...formData, confirmPassword: text})}
          secureTextEntry
        />

        <Button title="تسجيل" onPress={handleSignUp} />
        <Button 
          title="لدي حساب بالفعل" 
          variant="secondary" 
          onPress={() => navigation.navigate('Login')} 
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    textAlign: 'right',
  },
});

export default SignUpScreen;
