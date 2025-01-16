import * as React from 'react';
import { View, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import { colors } from '../theme';

interface LoadingProps {
  size?: 'small' | 'large';
  color?: string;
  fullScreen?: boolean;
}

const Loading = ({ 
  size = 'large', 
  color = colors.primary, 
  fullScreen = false 
}: LoadingProps): JSX.Element => {
  if (Platform.OS === 'web') {
    return React.createElement(
      'div',
      { 
        className: `flex justify-center items-center min-h-screen`
      },
      React.createElement(
        'div',
        { 
          className: 'animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'
        }
      )
    );
  }

  return React.createElement(
    View,
    { 
      style: [styles.container, fullScreen && styles.fullScreen] 
    },
    React.createElement(ActivityIndicator, {
      size: size,
      color: color
    })
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreen: {
    flex: 1,
    backgroundColor: '#fff',
  },
} as const);

export default Loading;
