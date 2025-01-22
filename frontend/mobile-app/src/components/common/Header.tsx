import React from 'react';
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

interface HeaderProps {
  username?: string;
  userId?: string;
  showNotification?: boolean;
  onNotificationPress?: () => void;
  onProfilePress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  username = 'زائر', 
  userId = '00000000',
  showNotification = true,
  onNotificationPress,
  onProfilePress
}) => {
  const insets = useSafeAreaInsets();

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
          {/* Profile Button */}
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={onProfilePress}
            activeOpacity={0.8}
          >
            <View style={styles.avatarContainer}>
              <Image 
                source={require('../../../assets/icons/avatar_icon.png')}
                style={styles.avatar}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>

          {/* Welcome Section */}
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeText}>
              مرحباً{' '}
              <Text style={styles.usernameText}>
                {username}
              </Text>
            </Text>
            <Text style={styles.userIdText}>
              #{userId}
            </Text>
          </View>

          {/* Notification Button */}
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
                {/* Notification Badge */}
                <View style={styles.notificationBadge}>
                  <Text style={styles.badgeText}>2</Text>
                </View>
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
