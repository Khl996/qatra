import { useCallback, useMemo, useState, useEffect } from 'react';

// تحسين الأداء للقوائم الطويلة
export const useVirtualization = (items: any[], itemHeight: number) => {
  const virtualItems = useMemo(() => {
    // حساب العناصر المرئية فقط
    return items.map((item, index) => ({
      ...item,
      offsetTop: index * itemHeight,
    }));
  }, [items, itemHeight]);

  return virtualItems;
};

// تحسين التحميل المتأخر للصور
export const useLazyImage = (src: string) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
  }, [src]);
  
  return isLoaded;
};
