import * as React from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage = ({ message, onRetry }: ErrorMessageProps): JSX.Element => {
  if (Platform.OS === 'web') {
    return React.createElement(
      'div',
      {
        className: 'p-4 bg-red-50 border border-red-200 rounded-md'
      },
      [
        React.createElement(
          'p',
          {
            key: 'message',
            className: 'text-red-700 text-right'
          },
          message
        ),
        onRetry && React.createElement(
          'button',
          {
            key: 'retry',
            onClick: onRetry,
            className: 'mt-2 text-red-600 hover:text-red-800'
          },
          'إعادة المحاولة'
        )
      ].filter(Boolean)
    );
  }

  return React.createElement(
    View,
    { style: styles.container },
    [
      React.createElement(
        Text,
        {
          key: 'message',
          style: styles.message
        },
        message
      ),
      onRetry && React.createElement(
        TouchableOpacity,
        {
          key: 'retry',
          onPress: onRetry,
          style: styles.retryButton
        },
        React.createElement(
          Text,
          {
            style: styles.retryText
          },
          'إعادة المحاولة'
        )
      )
    ].filter(Boolean)
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#ffebee',
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  message: {
    color: '#d32f2f',
    textAlign: 'right',
    fontSize: 14,
  },
  retryButton: {
    marginTop: 8,
  },
  retryText: {
    color: '#d32f2f',
    textAlign: 'right',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
} as const);

export default ErrorMessage;
