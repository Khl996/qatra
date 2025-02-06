
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export const LoadingOverlay = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#007AFF" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999
  }
});

export default LoadingOverlay;