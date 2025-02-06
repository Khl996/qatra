import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView,
  Text,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormInput } from '../../components/common/FormInput';
import { AuthButton } from '../../components/common/AuthButton';
import { useAuth } from '../../context/AuthContext';
import { validatePhone, validateEmail, validateName } from '../../services/authService';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';

type RegisterScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

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
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const navigation = useNavigation<RegisterScreenNavigationProp>();
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
      await register({
        ...formData,
        password
      });
      navigation.navigate('Login');
    } catch (err: any) {
      Alert.alert('خطأ', err.message);
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

            <FormInput
              label="كلمة المرور"
              value={password}
              onChangeText={setPassword}
              placeholder="******"
              secureTextEntry
            />

            <AuthButton
              title="إنشاء حساب"
              onPress={handleRegister}
              loading={isLoading}
              style={styles.registerButton}
            />

            <AuthButton
              title="لدي حساب بالفعل"
              onPress={() => navigation.navigate('Login')}
              style={styles.loginButton}
              textStyle={styles.loginButtonText}
            />
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
  loginButton: {
    backgroundColor: 'transparent',
    marginTop: 10
  },
  loginButtonText: {
    color: '#007AFF'
  }
});
