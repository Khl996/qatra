import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthButton } from '../../components/common/AuthButton';
import { useAuth } from '../../context/AuthContext';
import { validatePhone } from '../../services/authService';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import { api } from '../../config/api.config';

type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

export default function LoginScreen() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = async () => {
    try {
      if (!identifier || !password) {
        Alert.alert('تنبيه', 'الرجاء إدخال جميع البيانات المطلوبة');
        return;
      }

      // تنسيق رقم الجوال
      const formattedPhone = identifier.startsWith('0') ? identifier : `0${identifier}`;
      
      await login({ 
        identifier: formattedPhone, 
        password 
      });
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'فشل تسجيل الدخول';
      Alert.alert('خطأ', errorMessage);
      console.error('Login error details:', error?.response?.data);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <View style={styles.header}>
          <Image
            source={require('../../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>أهلاً بك في قطرة</Text>
          <Text style={styles.subtitle}>
            برنامج الولاء الأول للمتاجر والعملاء
          </Text>
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="رقم الجوال"
            value={identifier}
            onChangeText={setIdentifier}
            keyboardType="phone-pad"
            textAlign="right"
          />
          <TextInput
            style={styles.input}
            placeholder="كلمة المرور"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            textAlign="right"
          />

          <AuthButton
            title="تسجيل الدخول"
            onPress={handleLogin}
            loading={isLoading}
            disabled={!identifier || !password}
          />

          <TouchableOpacity 
            style={styles.registerLink} 
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.registerText}>
              ليس لديك حساب؟{' '}
              <Text style={styles.registerLinkText}>
                سجل الآن
              </Text>
            </Text>
          </TouchableOpacity>
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
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 24,
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
  input: {
    backgroundColor: '#f5f6fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  registerLink: {
    alignItems: 'center',
    marginTop: 16,
  },
  registerText: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  registerLinkText: {
    color: '#007AFF',
    fontWeight: '600',
  },
});
