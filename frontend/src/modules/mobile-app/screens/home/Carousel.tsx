import { useState, useEffect } from 'react';
import { Card } from '@/shared/components';

const slides = [
  "خصم 50% على جميع المنتجات",
  "نقاط مضاعفة عند التسوق من متجر البركة"
];

export const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Card className="h-[180px] relative overflow-hidden">
      <div className="h-full flex items-center justify-center text-xl font-bold text-blue-600">
        {slides[currentSlide]}
      </div>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full ${
              currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </Card>
  );
};
