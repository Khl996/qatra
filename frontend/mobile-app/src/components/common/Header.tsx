import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  Platform,
  Dimensions
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HeaderProps {
  username?: string;
  userId?: string;
  showNotification?: boolean;
  onNotificationPress?: () => void;
  onProfilePress?: () => void;
}

const { width } = Dimensions.get('window');

export const Header: React.FC<HeaderProps> = ({ 
  username = 'زائر', 
  userId = '00000000',
  showNotification = true,
  onNotificationPress,
  onProfilePress
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[
      styles.container,
      { paddingTop: insets.top + 10 }
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
              // تحديث مسار الصورة
              source={require('../../../../assets/icons/avatar_icon.png')}
              style={styles.avatar}
              resizeMode="cover"
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
                source={require('../../assets/icons/bell_icon.png')}
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
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 122, 255, 0.4)',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
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
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
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
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  notificationIcon: {
    width: 24,
    height: 24,
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
