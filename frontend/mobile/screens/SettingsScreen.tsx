import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  Alert,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../../shared/components/Button';

interface Settings {
  notifications: boolean;
  location: boolean;
  darkMode: boolean;
}

const SettingsScreen: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    notifications: true,
    location: true,
    darkMode: false,
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedSettings = await AsyncStorage.getItem('settings');
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const updateSetting = async (key: keyof Settings, value: boolean) => {
    try {
      const newSettings = { ...settings, [key]: value };
      await AsyncStorage.setItem('settings', JSON.stringify(newSettings));
      setSettings(newSettings);
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>الإشعارات والخصوصية</Text>
        
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>تفعيل الإشعارات</Text>
          <Switch
            value={settings.notifications}
            onValueChange={(value) => updateSetting('notifications', value)}
          />
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>خدمات الموقع</Text>
          <Switch
            value={settings.location}
            onValueChange={(value) => updateSetting('location', value)}
          />
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>الوضع الليلي</Text>
          <Switch
            value={settings.darkMode}
            onValueChange={(value) => updateSetting('darkMode', value)}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>معلومات التطبيق</Text>
        <Text style={styles.version}>الإصدار 1.0.0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'right',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
  version: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
  },
});

export default SettingsScreen;
