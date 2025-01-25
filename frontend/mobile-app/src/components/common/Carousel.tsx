import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  ScrollView, 
  Image, 
  Dimensions, 
  StyleSheet,
  TouchableOpacity 
} from 'react-native';

interface CarouselProps {
  images: string[];
  autoPlay?: boolean;
  interval?: number;
}

const { width } = Dimensions.get('window');

export const Carousel: React.FC<CarouselProps> = ({ 
  images, 
  autoPlay = true,
  interval = 3000 
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (autoPlay) {
      const timer = setInterval(() => {
        if (activeIndex === images.length - 1) {
          scrollViewRef.current?.scrollTo({ x: 0, animated: true });
          setActiveIndex(0);
        } else {
          scrollViewRef.current?.scrollTo({ 
            x: width * (activeIndex + 1), 
            animated: true 
          });
          setActiveIndex(activeIndex + 1);
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [activeIndex, images.length, autoPlay, interval]);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(
            event.nativeEvent.contentOffset.x / width
          );
          setActiveIndex(newIndex);
        }}
      >
        {images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            style={styles.image}
            resizeMode="cover"
          />
        ))}
      </ScrollView>
      
      <View style={styles.pagination}>
        {images.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.paginationDot,
              index === activeIndex && styles.activeDot
            ]}
            onPress={() => {
              scrollViewRef.current?.scrollTo({ 
                x: width * index, 
                animated: true 
              });
              setActiveIndex(index);
            }}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 180,
    width: '100%',
  },
  image: {
    width,
    height: 180,
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#fff',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});
