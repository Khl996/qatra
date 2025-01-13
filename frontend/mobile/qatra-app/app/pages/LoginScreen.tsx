import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [emailOrPhone, setEmailOrPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    if (!emailOrPhone || !password) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    try {
      const response = await axios.post('http://172.20.10.4:4000/api/users/login', {
        emailOrPhone,
        password,
      });
      Alert.alert('Success', 'Login successful!');
      navigation.navigate('Home');
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email or Phone"
        value={emailOrPhone}
        onChangeText={setEmailOrPhone}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text
        style={styles.link}
        onPress={() => navigation.navigate('SignUp')}
      >
        Don't have an account? Sign Up
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 20,
    color: '#007BFF',
    textAlign: 'center',
  },
});

export default LoginScreen;