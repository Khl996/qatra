import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { useVerifyCodeMutation } from '../../store/api/authApi';

export default function VerifyCodeScreen({ route, navigation }) {
  const { phone } = route.params;
  const [verifyCode] = useVerifyCodeMutation();

  const handleVerify = async (code) => {
    try {
      await verifyCode({ phone, code }).unwrap();
      navigation.replace('ResetPassword', { phone, code });
    } catch (error) {
      Alert.alert('خطأ', 'الرمز غير صحيح');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>أدخل رمز التحقق</Text>
      <Text style={styles.subtitle}>تم إرسال الرمز إلى {phone}</Text>
      <OTPInputView
        style={styles.otpView}
        pinCount={6}
        autoFocusOnLoad
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled={handleVerify}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: '#666',
    marginBottom: 30,
  },
  otpView: {
    width: '80%',
    height: 100,
  },
  underlineStyleBase: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: '#007AFF',
    fontSize: 20,
  },
  underlineStyleHighLighted: {
    borderColor: '#000',
  },
});
