import React, { useState } from 'react';
import { Image, ImageProps, StyleSheet } from 'react-native';

interface ImageWithFallbackProps extends ImageProps {
  fallbackSource: any;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  source,
  fallbackSource,
  style,
  ...props
}) => {
  const [error, setError] = useState(false);

  return (
    <Image
      source={error ? fallbackSource : source}
      onError={() => setError(true)}
      style={style}
      {...props}
    />
  );
};
