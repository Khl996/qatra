export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  points: number;
  role: 'user' | 'store' | 'admin';
}

export interface Store {
  id: string;
  name: string;
  logo: string;
  rating: number;
  distance?: number; // إضافة خاصية المسافة
  activeOffers?: number;
  location: {
    lat: number;
    lng: number;
  };
  description: string;
}

export interface Product {
  id: string;
  storeId: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface Offer {
  id: string;
  storeId: string;
  title: string;
  description: string;
  pointsRequired: number;
  validUntil: Date;
  image?: string; // إضافة حقل الصورة كخاصية اختيارية
}
