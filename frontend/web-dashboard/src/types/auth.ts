export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    phone: string;
    points?: number;
    address?: string;
    category?: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
}

export interface LoginCredentials {
    email?: string;
    identifier?: string;
    password: string;
}

export interface StoreProfile {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    category: string;
}
