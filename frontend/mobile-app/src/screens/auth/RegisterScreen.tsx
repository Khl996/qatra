import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormInput } from '../../components/common/FormInput';
import { AuthButton } from '../../components/common/AuthButton';
import { useAuth } from '../../context/AuthContext';
import { validatePhone, validateEmail, validateName } from '../../services/authService';

interface FormData {
  name: string;
  phone: string;
  email: string;
}

export default function RegisterScreen() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const { register, isLoading } = useAuth();

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    const nameError = validateName(formData.name);
    if (nameError) newErrors.name = nameError;

    const phoneError = validatePhone(formData.phone);
    if (phoneError) newErrors.phone = phoneError;

    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      await register(formData);
      // سيتم التنقل تلقائياً عند نجاح التسجيل
    } catch (err) {
      setErrors({ 
        email: 'حدث خطأ أثناء التسجيل' 
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>إنشاء حساب جديد</Text>
            <Text style={styles.subtitle}>
              انضم إلى برنامج قطرة واستمتع بالمكافآت
            </Text>
          </View>

          <View style={styles.form}>
            <FormInput
              label="الاسم الكامل"
              value={formData.name}
              onChangeText={(text) => setFormData({...formData, name: text})}
              error={errors.name}
            />

            <FormInput
              label="رقم الجوال"
              value={formData.phone}
              onChangeText={(text) => setFormData({...formData, phone: text})}
              keyboardType="phone-pad"
              error={errors.phone}
            />

            <FormInput
              label="البريد الإلكتروني"
              value={formData.email}
              onChangeText={(text) => setFormData({...formData, email: text})}
              keyboardType="email-address"
              error={errors.email}
            />

            <AuthButton
              title="إنشاء حساب"
              onPress={handleRegister}
              loading={loading}
              style={styles.registerButton}
            />

            <TouchableOpacity style={styles.loginLink}>
              <Text style={styles.loginText}>
                لديك حساب بالفعل؟{' '}
                <Text style={styles.loginLinkText}>
                  تسجيل الدخول
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  form: {
    width: '100%',
  },
  registerButton: {
    marginTop: 16,
  },
  loginLink: {
    alignItems: 'center',
    marginTop: 16,
  },
  loginText: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  loginLinkText: {
    color: '#007AFF',
    fontWeight: '600',
  },
});
