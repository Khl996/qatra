import * as React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import type { ReactNode } from 'react';

interface CardProps {
  title: string;
  subtitle?: string;
  image?: string;
  children?: ReactNode;
  onPress?: () => void;
}

const Card = ({ title, subtitle, image, children, onPress }: CardProps): JSX.Element => {
  const Container = onPress ? TouchableOpacity : View;

  const children_elements = [
    image && React.createElement(
      Image,
      {
        key: 'image',
        source: { uri: image },
        style: styles.image,
        resizeMode: 'cover'
      }
    ),
    React.createElement(
      View,
      {
        key: 'content',
        style: styles.content
      },
      [
        React.createElement(
          Text,
          {
            key: 'title',
            style: styles.title
          },
          title
        ),
        subtitle && React.createElement(
          Text,
          {
            key: 'subtitle',
            style: styles.subtitle
          },
          subtitle
        ),
        children
      ].filter(Boolean)
    )
  ].filter(Boolean);

  return React.createElement(
    Container,
    {
      style: styles.card,
      onPress: onPress
    },
    children_elements
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  image: {
    height: 150,
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
  },
} as const);

export default Card;
