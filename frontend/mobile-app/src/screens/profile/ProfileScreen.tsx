import React from 'react';
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  Text, 
  Image, 
  TouchableOpacity, 
  Platform 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../components/common/Header';
import { SettingsButton } from '../../components/common/SettingsButton';

export default function ProfileScreen() {
  const handleEditProfile = () => {
    console.log('Edit profile');
  };

  const handleSupport = () => {
    console.log('Open support');
  };

  const handleLogout = () => {
    console.log('Logout');
  };

  return (
    <View style={styles.container}>
      <Header 
        username="محمد"
        userId="12345678"
        showNotification={false}
      />
      
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image 
              source={require('../../assets/icons/avatar_icon.png')}
              style={styles.avatar}
            />
            <TouchableOpacity 
              style={styles.editAvatarButton}
              onPress={() => console.log('Edit avatar')}
            >
              <Image 
                source={require('../../assets/icons/edit_icon.png')}
                style={styles.editIcon}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>محمد أحمد</Text>
          <Text style={styles.email}>mohammed@example.com</Text>
        </View>

        <View style={styles.settingsSection}>
          <SettingsButton
            icon={require('../../assets/icons/user_icon.png')}
            title="تعديل الملف الشخصي"
            onPress={handleEditProfile}
          />
          <SettingsButton
            icon={require('../../assets/icons/support_icon.png')}
            title="الدعم الفني"
            onPress={handleSupport}
          />
          <SettingsButton
            icon={require('../../assets/icons/logout_icon.png')}
            title="تسجيل الخروج"
            onPress={handleLogout}
            hasArrow={false}
            danger
          />
        </View>

        <Text style={styles.version}>نسخة التطبيق 1.0.0</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: Platform.OS === 'ios' ? 120 : 100,
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editAvatarButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
  },
  editIcon: {
    width: 16,
    height: 16,
    tintColor: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  settingsSection: {
    marginTop: 24,
  },
  version: {
    textAlign: 'center',
    color: '#95a5a6',
    fontSize: 14,
    marginTop: 24,
    marginBottom: 16,
  },
});
