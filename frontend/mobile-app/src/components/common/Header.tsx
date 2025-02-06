import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  Platform,
  StatusBar
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../config/api.config';  // إضافة import

interface HeaderProps {
  name: string;
  uniqueCode: string;
  showNotification: boolean;
  onNotificationPress: () => void;
  onProfilePress: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  name,
  uniqueCode,
  showNotification,
  onNotificationPress,
  onProfilePress
}) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (showNotification) {
      loadNotifications();
    }
  }, [showNotification]);

  const loadNotifications = async () => {
    if (!showNotification) return;
    
    try {
      setIsLoading(true);
      setError(null);
      const response = await api.get('/notifications');
      setNotifications(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <StatusBar 
        backgroundColor="transparent" 
        translucent 
        barStyle="dark-content"
      />
      <View style={[
        styles.container,
        { 
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : insets.top,
        }
      ]}>
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={onProfilePress}
            activeOpacity={0.8}
          >
            <View style={styles.avatarContainer}>
              <Image 
                source={user?.avatar ? { uri: user.avatar } : require('../../../assets/icons/avatar_icon.png')}
                style={styles.avatar}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>

          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeText}>
              مرحباً{' '}
              <Text style={styles.usernameText}>
                {name}
              </Text>
            </Text>
            <Text style={styles.userIdText}>
              #{uniqueCode}
            </Text>
          </View>

          {showNotification && (
            <TouchableOpacity 
              style={styles.notificationButton}
              onPress={onNotificationPress}
              activeOpacity={0.8}
            >
              <View style={styles.notificationIconContainer}>
                <Image 
                  source={require('../../../assets/icons/bell_icon.png')}
                  style={styles.notificationIcon}
                  resizeMode="contain"
                />
                {notifications.length > 0 && (
                  <View style={styles.notificationBadge}>
                    <Text style={styles.badgeText}>{notifications.length}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 122, 255, 0.4)',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileButton: {
    marginRight: 12,
  },
  avatarContainer: {
    width: 45, // نرجع حجم الإطار إلى أكبر قليلاً
    height: 45,
    borderRadius: 22.5,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: '80%', // تصغير الصورة داخل الإطار
    height: '80%',
    borderRadius: 20,
  },
  welcomeSection: {
    flex: 1,
    alignItems: 'flex-start',
  },
  welcomeText: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '400',
  },
  usernameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  userIdText: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 2,
  },
  notificationButton: {
    marginLeft: 12,
  },
  notificationIconContainer: {
    width: 36, // تصغير من 40 إلى 36
    height: 36, // تصغير من 40 إلى 36
    borderRadius: 18,
    backgroundColor: 'transparent', // جعل الخلفية شفافة
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationIcon: {
    width: 22, // تصغير من 24 إلى 22
    height: 22, // تصغير من 24 إلى 22
    tintColor: '#2c3e50', // لون الأيقونة لتظهر بوضوح
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#e74c3c',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
