import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

const WelcomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>مرحبًا بك في قطرة</Text>
      <Text style={styles.subtitle}>ابدأ رحلتك مع أفضل المتاجر والعروض</Text>
      <View style={styles.buttons}>
        <Button title="تسجيل جديد" onPress={() => navigation.navigate('SignUp')} />
        <Button title="تسجيل الدخول" onPress={() => navigation.navigate('Login')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
});

export default WelcomeScreen;
