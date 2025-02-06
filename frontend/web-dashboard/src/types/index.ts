export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    points?: number;
    address?: string;
    category?: string;
}

export interface Store {
  id: number;
  name: string;
  // ...other properties
}

// Auth related types
export interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
}

export interface LoginCredentials {
    identifier: string; // email or phone or unique number
    password: string;
}

export interface PointTransaction {
    id?: string;
    customerId: string;
    amount: number;
    points: number;
    type: 'add' | 'subtract';
    date: Date;
}

export interface OfferData {
    id?: string;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    discountType: 'percentage' | 'fixed';
    discountValue: number;
    status: 'active' | 'inactive';
    condition?: string;
    reward?: string;
    isActive?: boolean;
    expiryDate?: Date;
}

export interface NotificationData {
    id?: string;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    duration?: number;
}

export interface StoreProfile {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    category: string;
}

export * from './auth';
export * from './points';
export * from './offers';
export * from './ui';
export * from './store';