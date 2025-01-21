import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { OtpInput } from '../../components/common/OtpInput';
import { AuthButton } from '../../components/common/AuthButton';

export default function OtpVerificationScreen() {
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleVerification = (otp: string) => {
    setLoading(true);
    // سيتم إضافة منطق التحقق لاحقاً
    console.log('Verifying OTP:', otp);
    setTimeout(() => setLoading(false), 1500);
  };

  const handleResendCode = () => {
    if (canResend) {
      setTimeLeft(60);
      setCanResend(false);
      // سيتم إضافة منطق إعادة الإرسال لاحقاً
      console.log('Resending code...');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>التحقق من رقم الجوال</Text>
          <Text style={styles.subtitle}>
            تم إرسال رمز التحقق إلى رقم الجوال
          </Text>
          <Text style={styles.phoneNumber}>+966 5XX XXX XXX</Text>
        </View>

        <View style={styles.otpContainer}>
          <OtpInput 
            length={4} 
            onComplete={handleVerification}
          />
        </View>

        <View style={styles.resendContainer}>
          {timeLeft > 0 ? (
            <Text style={styles.timer}>
              إعادة الإرسال بعد {timeLeft} ثانية
            </Text>
          ) : (
            <TouchableOpacity onPress={handleResendCode}>
              <Text style={styles.resendText}>إعادة إرسال الرمز</Text>
            </TouchableOpacity>
          )}
        </View>

        <AuthButton
          title="تحقق"
          onPress={() => setLoading(true)}
          loading={loading}
          style={styles.verifyButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
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
    marginBottom: 8,
  },
  phoneNumber: {
    fontSize: 18,
    color: '#2c3e50',
    fontWeight: '600',
  },
  otpContainer: {
    marginVertical: 32,
  },
  resendContainer: {
    marginTop: 24,
  },
  timer: {
    color: '#7f8c8d',
    fontSize: 14,
  },
  resendText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  verifyButton: {
    marginTop: 32,
    width: '100%',
  },
});
