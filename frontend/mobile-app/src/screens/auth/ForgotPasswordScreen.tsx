import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormInput } from '../../components/common/FormInput';
import { AuthButton } from '../../components/common/AuthButton';

export default function ForgotPasswordScreen() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!phone) {
      setError('الرجاء إدخال رقم الجوال');
      return;
    }
    setLoading(true);
    // سيتم إضافة منطق إعادة تعيين كلمة المرور لاحقاً
    setTimeout(() => {
      setLoading(false);
      // التنقل إلى شاشة التحقق من الرمز
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>نسيت كلمة المرور؟</Text>
            <Text style={styles.subtitle}>
              أدخل رقم جوالك وسنرسل لك رمز التحقق
            </Text>
          </View>

          <FormInput
            label="رقم الجوال"
            value={phone}
            onChangeText={(text) => {
              setPhone(text);
              setError('');
            }}
            keyboardType="phone-pad"
            error={error}
          />

          <AuthButton
            title="إرسال رمز التحقق"
            onPress={handleSubmit}
            loading={loading}
            style={styles.submitButton}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginVertical: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  submitButton: {
    marginTop: 24,
  },
});
