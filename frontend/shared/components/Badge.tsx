import * as React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import type { ReactNode } from 'react';
import { colors } from '../theme';

interface BadgeProps {
  text: string;
  type?: 'primary' | 'success' | 'warning' | 'danger';
  size?: 'small' | 'medium' | 'large';
  children?: ReactNode;
}

const Badge = ({ text, type = 'primary', size = 'medium', children }: BadgeProps): React.ReactElement => {
  if (Platform.OS === 'web') {
    const baseClasses = "rounded-full font-medium text-center";
    const typeClasses = {
      primary: "bg-blue-100 text-blue-800",
      success: "bg-green-100 text-green-800",
      warning: "bg-yellow-100 text-yellow-800",
      danger: "bg-red-100 text-red-800"
    };
    const sizeClasses = {
      small: "px-2 py-0.5 text-xs",
      medium: "px-3 py-1 text-sm",
      large: "px-4 py-2 text-base"
    };

    return React.createElement(
      'span',
      { className: `${baseClasses} ${typeClasses[type]} ${sizeClasses[size]}` },
      text,
      children
    );
  }

  return React.createElement(
    View,
    { style: [styles.badge, styles[type], styles[size]] },
    React.createElement(
      Text,
      { style: [styles.text, styles[`${type}Text`], styles[`${size}Text`]] },
      text,
      children
    )
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  text: {
    textAlign: 'center',
  },
  primary: {
    backgroundColor: colors.primary + '20',
  },
  success: {
    backgroundColor: colors.success + '20',
  },
  warning: {
    backgroundColor: colors.warning + '20',
  },
  danger: {
    backgroundColor: colors.danger + '20',
  },
  primaryText: {
    color: colors.primary,
  },
  successText: {
    color: colors.success,
  },
  warningText: {
    color: colors.warning,
  },
  dangerText: {
    color: colors.danger,
  },
  small: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  medium: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  large: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  smallText: {
    fontSize: 12,
  },
  mediumText: {
    fontSize: 14,
  },
  largeText: {
    fontSize: 16,
  },
} as const);

export default Badge;
