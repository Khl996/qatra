import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useResetPasswordMutation } from '../../store/api/authApi';

export default function ForgotPasswordScreen({ navigation }) {
  const [phone, setPhone] = useState('');
  const [resetPassword] = useResetPasswordMutation();

  const handleResetPassword = async () => {
    try {
      await resetPassword({ phone }).unwrap();
      Alert.alert('نجاح', 'تم إرسال رمز التحقق إلى جوالك');
      navigation.navigate('VerifyCode', { phone });
    } catch (error) {
      Alert.alert('خطأ', 'حدث خطأ أثناء إرسال رمز التحقق');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>استعادة كلمة المرور</Text>
      <TextInput
        style={styles.input}
        placeholder="رقم الجوال"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>إرسال رمز التحقق</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
