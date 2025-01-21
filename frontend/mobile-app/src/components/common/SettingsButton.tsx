import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';

interface SettingsButtonProps {
  icon: any;
  title: string;
  onPress: () => void;
  hasArrow?: boolean;
  danger?: boolean;
}

export const SettingsButton: React.FC<SettingsButtonProps> = ({
  icon,
  title,
  onPress,
  hasArrow = true,
  danger = false
}) => {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.leftContent}>
        <Image source={icon} style={styles.icon} />
        <Text style={[
          styles.title,
          danger && styles.dangerText
        ]}>
          {title}
        </Text>
      </View>
      {hasArrow && (
        <Image 
          source={require('../../assets/icons/arrow_left.png')}
          style={styles.arrowIcon}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    color: '#2c3e50',
  },
  dangerText: {
    color: '#e74c3c',
  },
  arrowIcon: {
    width: 16,
    height: 16,
    tintColor: '#95a5a6',
  },
});
